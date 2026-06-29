import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Stripe integration is currently deferred.
  // This is a stub for the customer portal route.
  return NextResponse.json(
    { url: '/dashboard/settings/subscription' },
    { status: 200 }
  )
}
