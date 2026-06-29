'use client'
import { SubscriptionPanel } from '@/components/settings/SubscriptionPanel'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function SubscriptionPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="mb-4 -ml-4 text-surface-500">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Button>
        </Link>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Subscription & Billing</h2>
        <p className="mt-1 text-sm text-surface-500">
          Manage your premium subscription plan and payment methods.
        </p>
      </div>

      <SubscriptionPanel />
    </div>
  )
}
