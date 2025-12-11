import path from 'path';

export default ({ env }) => {
  // Strapi Cloud provides DATABASE_URL automatically
  // If it exists, use PostgreSQL; otherwise use SQLite for local development
  const isProduction = env('DATABASE_URL', null) !== null;

  if (isProduction) {
    // Strapi Cloud / Production: Use PostgreSQL with DATABASE_URL
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: {
            rejectUnauthorized: false,
          },
        },
        pool: {
          min: 2,
          max: 10,
        },
        acquireConnectionTimeout: 60000,
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
          min: 2,
          max: 10,
        },
        acquireConnectionTimeout: 60000,
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


