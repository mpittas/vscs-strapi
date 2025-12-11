export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'temporary-build-secret-replace-in-production'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'temporary-build-salt-replace-in-production'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'temporary-build-salt-replace-in-production'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY', 'temporary-build-key-replace-in-production'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
