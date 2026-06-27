// lib/stripe.ts
// ⚠️  STRIPE INTEGRATION DEFERRED — will be wired in a future session.
// This file is a placeholder stub. Do not add real credentials until Stripe is ready.

export const STRIPE_CONFIG = {
  PRICE_BASIC_MONTHLY: process.env.STRIPE_PRICE_BASIC_MONTHLY ?? '',
  PRICE_PREMIUM_MONTHLY: process.env.STRIPE_PRICE_PREMIUM_MONTHLY ?? '',
  deferred: true,
} as const
