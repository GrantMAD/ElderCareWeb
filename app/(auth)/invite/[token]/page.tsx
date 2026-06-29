'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function InvitePage({ params }: { params: { token: string } }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [inviteDetails, setInviteDetails] = useState<{ inviterName: string, familyName: string } | null>(null)
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // In a real app, we would verify the token with the backend and get details
    // For now, mock the invite details
    setInviteDetails({
      inviterName: 'Jane Doe',
      familyName: 'Doe Family',
    })
  }, [params.token])

  const handleAccept = async () => {
    setIsLoading(true)
    setError('')
    try {
      // Simulate accepting invite
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/login?message=Invite+accepted.+Please+login.')
    } catch (err: any) {
      setError('Failed to accept invite. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">You've been invited!</h3>
        {inviteDetails ? (
          <p className="mt-2 text-sm text-surface-600 dark:text-surface-400">
            <span className="font-semibold text-surface-900 dark:text-surface-100">{inviteDetails.inviterName}</span> has invited you to join the <span className="font-semibold text-surface-900 dark:text-surface-100">{inviteDetails.familyName}</span> care team.
          </p>
        ) : (
          <p className="mt-2 text-sm text-surface-500">Loading invite details...</p>
        )}
      </div>

      <div className="space-y-4">
        <Button onClick={handleAccept} className="w-full" loading={isLoading} disabled={!inviteDetails}>
          Accept Invitation
        </Button>
        <Button variant="outline" className="w-full" onClick={() => router.push('/login')}>
          Decline
        </Button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800 text-center">
          {error}
        </div>
      )}
    </div>
  )
}
