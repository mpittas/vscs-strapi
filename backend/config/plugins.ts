export default () => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: "bg",
      locales: ["bg", "en", "fr"],
    },
  },
  upload: {
    config: {
      // Blog/project images rarely need multi-MB originals on a small CMS.
      sizeLimit: 10 * 1024 * 1024,
      breakpoints: {
        large: 1200,
        medium: 800,
        small: 400,
      },
      sharp: {
        cache: false,
        concurrency: 1,
      },
      concurrentUploadSize: 1,
      providerOptions: {
        localServer: {
          // Long cache for uploads — Next.js fetches them rarely (ISR/webhooks).
          maxage: 60 * 60 * 24 * 7,
        },
      },
    },
  },
});
