export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['temporary-key-1', 'temporary-key-2']),
  },
  // MCP is for local AI tooling only — keep off in production to save memory.
  mcp: {
    enabled: env.bool('MCP_ENABLED', env('NODE_ENV') !== 'production'),
  },
  // Webhook configuration for on-demand revalidation
  webhooks: {
    // Default headers sent with every webhook request
    defaultHeaders: {
      Authorization: `Bearer ${env('WEBHOOK_TOKEN', 'your-webhook-secret')}`,
    },
  },
});
