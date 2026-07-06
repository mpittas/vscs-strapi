import path from 'path';

export default ({ env }) => {
  // Small pool for Railway hobby: min 0 lets the service sleep when idle
  // (open DB connections count as outbound traffic and prevent serverless sleep).
  const productionPool = {
    min: env.int('DATABASE_POOL_MIN', 0),
    max: env.int('DATABASE_POOL_MAX', 2),
  };

  // Production uses DATABASE_URL (Railway Postgres, etc.)
  // Local dev falls back to SQLite unless DATABASE_CLIENT=postgres
  const isProduction = env('DATABASE_URL', null) !== null;

  if (isProduction) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: env.bool('DATABASE_SSL', true)
            ? { rejectUnauthorized: false }
            : false,
        },
        pool: productionPool,
        acquireConnectionTimeout: env.int('DATABASE_ACQUIRE_TIMEOUT', 30000),
      },
    };
  }

  // Local development: Use SQLite (simplest, no setup required)
  // Or use PostgreSQL locally by setting DATABASE_CLIENT=postgres in .env
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'postgres') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'strapi'),
          user: env('DATABASE_USERNAME', 'postgres'),
          password: env('DATABASE_PASSWORD', ''),
          ssl: false,
        },
        pool: {
          min: 0,
          max: 5,
        },
        acquireConnectionTimeout: 30000,
      },
    };
  }

  // Default: SQLite for local development
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', '.tmp', 'data.db'),
      },
      useNullAsDefault: true,
      acquireConnectionTimeout: 60000,
    },
  };
};


