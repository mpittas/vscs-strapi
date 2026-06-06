import type { Core } from '@strapi/strapi';

const PROJECT_CM_KEY =
  'plugin_content_manager_configuration_content_types::api::project.project';

const REMOVED_PROJECT_FIELDS = [
  'category',
  'country',
  'excerpt',
  'projectStatus',
] as const;

const PROJECT_FIELD_LABELS: Record<string, string> = {
  title: 'Заглавие',
  slug: 'Линк',
  location: 'Държава',
  energy: 'Енергия',
  year: 'Година',
  services: 'Услуги',
  client: 'Клиент',
  content: 'Съдържание',
  featuredImage: 'Главна снимка',
  gallery: 'Галерия',
};

const PROJECT_EDIT_LAYOUT = [
  [
    { name: 'title', size: 6 },
    { name: 'slug', size: 6 },
  ],
  [
    { name: 'location', size: 6 },
    { name: 'energy', size: 6 },
  ],
  [
    { name: 'year', size: 6 },
    { name: 'services', size: 6 },
  ],
  [{ name: 'client', size: 12 }],
  [{ name: 'content', size: 12 }],
  [
    { name: 'featuredImage', size: 6 },
    { name: 'gallery', size: 6 },
  ],
];

function applyProjectMetadatas(metadatas: Record<string, unknown> = {}) {
  for (const field of REMOVED_PROJECT_FIELDS) {
    delete metadatas[field];
  }

  for (const [field, label] of Object.entries(PROJECT_FIELD_LABELS)) {
    if (!metadatas[field]) {
      metadatas[field] = { edit: {}, list: {} };
    }

    const metadata = metadatas[field] as {
      edit: Record<string, unknown>;
      list: Record<string, unknown>;
    };

    metadata.edit = { ...metadata.edit, label };
    metadata.list = { ...metadata.list, label };
  }

  return metadatas;
}

async function applyProjectAdminLayout(strapi: Core.Strapi) {
  const contentType = strapi.contentType('api::project.project');
  if (!contentType) return;

  const configService = strapi
    .plugin('content-manager')
    ?.service('content-types') as
    | {
        findConfiguration?: (model: unknown) => Promise<Record<string, unknown>>;
        updateConfiguration?: (
          model: unknown,
          config: Record<string, unknown>,
        ) => Promise<void>;
      }
    | undefined;

  if (
    configService?.findConfiguration &&
    configService?.updateConfiguration
  ) {
    const current = await configService.findConfiguration(contentType);
    await configService.updateConfiguration(contentType, {
      ...current,
      metadatas: applyProjectMetadatas(
        (current.metadatas as Record<string, unknown>) ?? {},
      ),
      layouts: {
        ...(current.layouts as Record<string, unknown>),
        edit: PROJECT_EDIT_LAYOUT,
      },
    });
    return;
  }

  const view = await strapi.db.query('strapi::core-store').findOne({
    where: { key: PROJECT_CM_KEY },
  });

  const config = view?.value
    ? JSON.parse(view.value as string)
    : {
        settings: {
          bulkable: true,
          filterable: true,
          searchable: true,
          pageSize: 10,
          mainField: 'title',
          defaultSortBy: 'title',
          defaultSortOrder: 'ASC',
        },
        metadatas: {},
        layouts: {},
      };

  config.metadatas = applyProjectMetadatas(config.metadatas);
  config.layouts = { ...(config.layouts ?? {}), edit: PROJECT_EDIT_LAYOUT };

  if (view) {
    await strapi.db.query('strapi::core-store').update({
      where: { id: view.id },
      data: { value: JSON.stringify(config) },
    });
  } else {
    await strapi.db.query('strapi::core-store').create({
      data: {
        key: PROJECT_CM_KEY,
        value: JSON.stringify(config),
        type: 'object',
      },
    });
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await applyProjectAdminLayout(strapi);
    } catch (error) {
      strapi.log.error('[bootstrap] Failed to apply project admin layout:', error);
    }
  },
};
