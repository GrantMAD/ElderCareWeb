import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Stripe integration is currently deferred.
  // This is a stub for the webhook route.
  return NextResponse.json({ received: true }, { status: 200 })
}
