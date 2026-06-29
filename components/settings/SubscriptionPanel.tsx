'use client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CreditCard, CheckCircle2 } from 'lucide-react'

export function SubscriptionPanel() {
  // In a real app, you would fetch this from your database/Stripe
  const isSubscribed = false

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">Elder Care Premium</h3>
            {isSubscribed ? (
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Active</Badge>
            ) : (
              <Badge className="bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-300">Free Tier</Badge>
            )}
          </div>
          
          <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md">
            Upgrade to Premium to unlock advanced features like unlimited family members, 24/7 priority emergency alerts, and historical trend analysis.
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-2 text-surface-700 dark:text-surface-300">
              <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
              <span>Unlimited family member invites</span>
            </li>
            <li className="flex items-start gap-2 text-surface-700 dark:text-surface-300">
              <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
              <span>24/7 Priority Emergency Alerts with SMS</span>
            </li>
            <li className="flex items-start gap-2 text-surface-700 dark:text-surface-300">
              <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
              <span>Advanced AI-powered wellness insights</span>
            </li>
            <li className="flex items-start gap-2 text-surface-700 dark:text-surface-300">
              <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
              <span>30-day historical data retention</span>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Button className="w-full sm:w-auto">
              {isSubscribed ? 'Manage Subscription' : 'Upgrade to Premium - $19/mo'}
            </Button>
          </div>
        </div>
        
        <div className="w-full md:w-72 shrink-0 bg-surface-50 dark:bg-surface-900/50 rounded-2xl p-6 border border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-3 mb-4 text-surface-500">
            <CreditCard className="w-5 h-5" />
            <h4 className="font-medium">Payment Method</h4>
          </div>
          {isSubscribed ? (
            <div>
              <p className="text-surface-900 dark:text-surface-100 font-medium">Visa ending in 4242</p>
              <p className="text-sm text-surface-500 mt-1">Next billing date: Oct 15, 2024</p>
            </div>
          ) : (
            <p className="text-sm text-surface-500">
              No payment method on file. Add one to start your premium subscription.
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
