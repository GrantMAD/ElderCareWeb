'use client'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

interface InviteMemberModalProps {
  open: boolean
  onClose: () => void
  onInvite: (email: string, role: string) => Promise<void>
}

export function InviteMemberModal({ open, onClose, onInvite }: InviteMemberModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('caregiver')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onInvite(email, role)
      setEmail('')
      setRole('caregiver')
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-1">
        <h2 className="text-xl font-bold mb-2 text-surface-900 dark:text-surface-100">Invite Family Member</h2>
        <p className="text-sm text-surface-500 mb-6">
          Send an invitation link for a family member to join this dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="member@family.com"
          />

          <Select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { label: 'Caregiver', value: 'caregiver' },
              { label: 'Viewer', value: 'viewer' },
            ]}
          />

          <div className="flex gap-3 justify-end pt-4 border-t border-surface-200 dark:border-surface-800">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Send Invitation
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
