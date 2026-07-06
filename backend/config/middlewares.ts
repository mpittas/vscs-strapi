const isProduction = process.env.NODE_ENV === 'production';

export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        process.env.FRONTEND_URL || 'https://your-vercel-app.vercel.app',
        /\.vercel\.app$/,
      ],
    },
  },
  ...(isProduction ? [] : ['strapi::poweredBy']),
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '256kb',
      textLimit: '256kb',
      formLimit: '10mb',
      formidable: {
        maxFileSize: 10 * 1024 * 1024,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

