import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Stripe webhook handler — deferred.
  // In production: verify Stripe signature, handle subscription events,
  // and update families.subscription_tier in Supabase.
  return NextResponse.json({ received: true }, { status: 200 })
}
