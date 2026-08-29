import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Stripe client for server-side use. Requires a test secret key (sk_test_...).
 * Live keys are rejected so this scaffolding cannot charge accidentally.
 */
export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  if (!secretKey.startsWith("sk_test_")) {
    throw new Error(
      "STRIPE_SECRET_KEY must be a test key (sk_test_...). Live keys are not allowed in this scaffolding.",
    );
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: "2026-06-24.dahlia",
      typescript: true,
    });
  }

  return stripeClient;
}

export function isStripeTestMode(): boolean {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return Boolean(secretKey?.startsWith("sk_test_"));
}
