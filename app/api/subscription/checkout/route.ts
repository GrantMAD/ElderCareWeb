import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Stripe integration is currently deferred.
  // This is a stub for the checkout route.
  return NextResponse.json(
    { url: '/dashboard/settings' },
    { status: 200 }
  )
}
