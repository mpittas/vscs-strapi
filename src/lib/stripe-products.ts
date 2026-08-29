/**
 * Placeholder Stripe product/price IDs for VSCS Priority.
 * Set these in .env.local after creating test Products in the Stripe Dashboard.
 */
export const STRIPE_PRIORITY_PRICE_ID =
  process.env.STRIPE_PRICE_PRIORITY ?? "";

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

export function isStripeTestConfigured(): boolean {
  const secret = process.env.STRIPE_SECRET_KEY ?? "";
  const publishable = STRIPE_PUBLISHABLE_KEY;
  return (
    secret.startsWith("sk_test_") &&
    (publishable.startsWith("pk_test_") || publishable.length === 0)
  );
}

export function getPriorityPriceId(): string | null {
  return STRIPE_PRIORITY_PRICE_ID || null;
}
