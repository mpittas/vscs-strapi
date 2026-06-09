#!/usr/bin/env node
'use strict';

/**
 * Batch-compresses existing Strapi Media Library images to WebP.
 *
 * Usage (from backend/):
 *   npm run compress-images              # convert all non-WebP images
 *   npm run compress-images -- --dry-run   # preview without changes
 *   npm run compress-images -- --quality=75
 *   npm run compress-images -- --limit=5
 *   npm run compress-images -- --id=12
 *
 * Stop Strapi before running (avoids SQLite lock conflicts in local dev).
 */

const path = require('path');
const fs = require('fs');
const os = require('os');
const fse = require('fs-extra');
const sharp = require('sharp');
const { compileStrapi, createStrapi } = require('@strapi/strapi');
const { file: fileUtils } = require('@strapi/utils');

const { bytesToKbytes } = fileUtils;
const FILE_MODEL_UID = 'plugin::upload.file';
const CONVERTIBLE_MIMES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/tiff',
  'image/bmp',
  'image/heic',
  'image/heif',
]);

function parseArgs(argv) {
  const options = {
    dryRun: false,
    quality: 80,
    limit: null,
    id: null,
  };

  for (const arg of argv) {
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg.startsWith('--quality=')) {
      options.quality = Number(arg.split('=')[1]);
    } else if (arg.startsWith('--limit=')) {
      options.limit = Number(arg.split('=')[1]);
    } else if (arg.startsWith('--id=')) {
      options.id = Number(arg.split('=')[1]);
    }
  }

  if (!Number.isInteger(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error('--quality must be an integer between 1 and 100');
  }

  return options;
}

function sanitizeFormatEntry(entry) {
  if (!entry) return entry;
  const { name, hash, ext, mime, path: filePath, width, height, size, url } = entry;
  return { name, hash, ext, mime, path: filePath, width, height, size, url };
}

function sanitizeFormats(formats) {
  if (!formats) return null;
  return Object.fromEntries(
    Object.entries(formats).map(([key, value]) => [key, sanitizeFormatEntry(value)]),
  );
}

function isConvertible(file) {
  if (!file?.mime?.startsWith('image/')) return false;
  if (file.mime === 'image/webp') return false;
  if (file.mime === 'image/svg+xml' || file.ext === '.svg') return false;
  return (
    CONVERTIBLE_MIMES.has(file.mime) ||
    /\.(jpe?g|png|gif|tiff?|bmp|heic|heif)$/i.test(file.ext || '')
  );
}

async function resolveSourcePath(strapi, file) {
  const publicDir = strapi.dirs.static.public;

  if (file.url?.startsWith('http://') || file.url?.startsWith('https://')) {
    const response = await fetch(file.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file.url} (${response.status})`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const tmpDir = await fse.mkdtemp(path.join(os.tmpdir(), 'strapi-webp-src-'));
    const tmpPath = path.join(tmpDir, `${file.hash}${file.ext}`);
    await fse.writeFile(tmpPath, buffer);
    return { sourcePath: tmpPath, tmpDir };
  }

  const relative = (file.url || '').replace(/^\//, '');
  const sourcePath = path.join(publicDir, relative);
  const existingWebpPath = path.join(publicDir, 'uploads', `${file.hash}.webp`);

  if (!fs.existsSync(sourcePath) && fs.existsSync(existingWebpPath)) {
    return { sourcePath: existingWebpPath, tmpDir: null, syncOnly: true };
  }

  return { sourcePath, tmpDir: null, syncOnly: false };
}

async function deleteStoredFile(strapi, storedFile) {
  if (!storedFile?.hash || !storedFile?.ext) return;
  try {
    await strapi.plugin('upload').provider.delete(storedFile);
  } catch {
    // Missing files are fine during migration.
  }
}

async function convertFile(strapi, file, options) {
  const uploadService = strapi.plugin('upload').service('upload');
  const imageManipulation = strapi.plugin('upload').service('image-manipulation');
  const uploadImage = uploadService._uploadImage;

  if (!uploadImage) {
    throw new Error('Upload service is missing _uploadImage; Strapi version may have changed.');
  }

  const { sourcePath, tmpDir: sourceTmpDir, syncOnly = false } = await resolveSourcePath(strapi, file);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file not found at ${sourcePath}`);
  }

  const originalSize = (await fse.stat(sourcePath)).size;
  const workDir = await fse.mkdtemp(path.join(os.tmpdir(), 'strapi-webp-'));
  const webpPath = syncOnly ? sourcePath : path.join(workDir, `${file.hash}.webp`);
  const baseName = path.basename(file.name || file.hash, file.ext || path.extname(file.name || ''));

  try {
    if (syncOnly) {
      const metadata = await sharp(sourcePath).metadata();
      const webpSize = originalSize;

      if (options.dryRun) {
        return {
          dryRun: true,
          id: file.id,
          name: `${baseName}.webp`,
          beforeBytes: originalSize,
          afterBytes: webpSize,
          savedBytes: 0,
          savedPct: '0.0',
          synced: true,
        };
      }

      await strapi.db.query(FILE_MODEL_UID).update({
        where: { id: file.id },
        data: {
          name: `${baseName}.webp`,
          ext: '.webp',
          mime: 'image/webp',
          url: `/uploads/${file.hash}.webp`,
          size: bytesToKbytes(webpSize),
          width: metadata.width,
          height: metadata.height,
          formats: {},
        },
      });

      return {
        id: file.id,
        name: `${baseName}.webp`,
        beforeBytes: originalSize,
        afterBytes: webpSize,
        savedBytes: 0,
        savedPct: '0.0',
        synced: true,
      };
    }

    await sharp(sourcePath).webp({ quality: options.quality }).toFile(webpPath);
    const webpSize = (await fse.stat(webpPath)).size;

    if (webpSize >= originalSize) {
      return {
        skipped: true,
        id: file.id,
        name: file.name,
        beforeBytes: originalSize,
        afterBytes: webpSize,
        reason: 'WebP would not be smaller than the original',
      };
    }

    if (options.dryRun) {
      const saved = Math.max(0, originalSize - webpSize);
      const pct = originalSize > 0 ? ((saved / originalSize) * 100).toFixed(1) : '0.0';
      return {
        dryRun: true,
        id: file.id,
        name: file.name,
        beforeBytes: originalSize,
        afterBytes: webpSize,
        savedBytes: saved,
        savedPct: pct,
      };
    }

    if (file.formats) {
      await Promise.all(Object.values(file.formats).map((format) => deleteStoredFile(strapi, format)));
    }
    await deleteStoredFile(strapi, file);

    const fileData = {
      name: `${baseName}.webp`,
      alternativeText: file.alternativeText,
      caption: file.caption,
      focalPoint: file.focalPoint,
      folder: file.folder,
      folderPath: file.folderPath,
      hash: file.hash,
      ext: '.webp',
      mime: 'image/webp',
      size: bytesToKbytes(webpSize),
      sizeInBytes: webpSize,
      filepath: webpPath,
      path: file.path || null,
      provider: file.provider,
      formats: {},
      getStream: () => fs.createReadStream(webpPath),
    };

    const { width, height } = await imageManipulation.getDimensions(fileData);
    Object.assign(fileData, { width, height });

    await uploadImage(fileData);

    await strapi.db.query(FILE_MODEL_UID).update({
      where: { id: file.id },
      data: {
        name: fileData.name,
        ext: fileData.ext,
        mime: fileData.mime,
        url: fileData.url,
        size: fileData.size,
        width: fileData.width,
        height: fileData.height,
        formats: sanitizeFormats(fileData.formats),
      },
    });

    const saved = Math.max(0, originalSize - webpSize);
    const pct = originalSize > 0 ? ((saved / originalSize) * 100).toFixed(1) : '0.0';

    return {
      id: file.id,
      name: fileData.name,
      beforeBytes: originalSize,
      afterBytes: webpSize,
      savedBytes: saved,
      savedPct: pct,
    };
  } finally {
    await fse.remove(workDir);
    if (sourceTmpDir) {
      await fse.remove(sourceTmpDir);
    }
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const appDir = path.resolve(__dirname, '..');
  const appContext = await compileStrapi({ appDir });
  const strapi = createStrapi(appContext);

  await strapi.load();

  const provider = strapi.config.get('plugin::upload.provider');
  if (provider !== 'local') {
    strapi.log.warn(
      `Upload provider is "${provider}". The script supports local and remote URLs, but always back up your media before running.`,
    );
  }

  try {
    const query = options.id
      ? { where: { id: options.id } }
      : { where: {}, orderBy: { id: 'asc' } };

    let files = await strapi.db.query(FILE_MODEL_UID).findMany(query);
    files = files.filter(isConvertible);

    if (options.limit) {
      files = files.slice(0, options.limit);
    }

    if (files.length === 0) {
      console.log('No convertible images found.');
      return;
    }

    console.log(
      `${options.dryRun ? 'Dry run' : 'Converting'} ${files.length} image(s) to WebP (quality ${options.quality})...`,
    );

    const results = [];
    const skipped = [];
    const errors = [];

    for (const file of files) {
      try {
        const result = await convertFile(strapi, file, options);
        if (result.skipped) {
          skipped.push(result);
          console.log(
            `  [skip] #${result.id} ${result.name} — ${formatBytes(result.beforeBytes)} (kept original; ${result.reason.toLowerCase()})`,
          );
          continue;
        }
        results.push(result);
        console.log(
          `  [${options.dryRun ? 'preview' : result.synced ? 'sync' : 'ok'}] #${result.id} ${result.name} — ${formatBytes(result.beforeBytes)} → ${formatBytes(result.afterBytes)} (${result.savedPct}% smaller)`,
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        errors.push({ id: file.id, name: file.name, message });
        console.error(`  [error] #${file.id} ${file.name} — ${message}`);
      }
    }

    const totalBefore = results.reduce((sum, item) => sum + item.beforeBytes, 0);
    const totalAfter = results.reduce((sum, item) => sum + item.afterBytes, 0);
    const totalSaved = Math.max(0, totalBefore - totalAfter);
    const totalPct = totalBefore > 0 ? ((totalSaved / totalBefore) * 100).toFixed(1) : '0.0';

    console.log('');
    console.log(`Processed: ${results.length}/${files.length}`);
    if (skipped.length > 0) {
      console.log(`Skipped:   ${skipped.length} (already optimal or WebP would be larger)`);
    }
    if (errors.length > 0) {
      console.log(`Errors:    ${errors.length}`);
    }
    console.log(
      `Storage:   ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (saved ${formatBytes(totalSaved)}, ${totalPct}% smaller on originals)`,
    );

    if (options.dryRun) {
      console.log('\nDry run complete. Re-run without --dry-run to apply changes.');
    }

    if (errors.length > 0) {
      process.exitCode = 1;
    }
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
