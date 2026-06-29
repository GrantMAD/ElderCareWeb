'use client'
import { useState } from 'react'
import { FamilyMemberList } from '@/components/settings/FamilyMemberList'
import { InviteMemberModal } from '@/components/settings/InviteMemberModal'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useFamilyDashboard } from '@/hooks/useFamilyDashboard'
import { UserPlus, Save } from 'lucide-react'

export default function SettingsPage() {
  const { data, loading } = useFamilyDashboard()
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [elderName, setElderName] = useState(data?.elder?.full_name || '')

  const handleInvite = async (email: string, role: string) => {
    // In a real app, you would send this to your API
    console.log('Inviting', email, role)
    await new Promise(r => setTimeout(r, 1000))
  }

  const handleRemoveMember = (id: string) => {
    // API call to remove member
    console.log('Removing member', id)
  }

  const handleSaveElder = () => {
    // API call to save elder name
    console.log('Saving elder name', elderName)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Settings</h2>
        <p className="mt-1 text-sm text-surface-500">
          Manage family members and elder profile.
        </p>
      </div>

      <div className="space-y-6">
        {/* Elder Profile Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Elder Profile</h3>
          <div className="max-w-md space-y-4">
            <Input
              label="Elder's Full Name"
              value={elderName}
              onChange={(e) => setElderName(e.target.value)}
              placeholder="e.g. Margaret Johnson"
            />
            <Button onClick={handleSaveElder}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Family Members */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Family Members</h3>
            <Button onClick={() => setInviteModalOpen(true)} size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>
          
          <FamilyMemberList 
            members={data?.family_members || []} 
            loading={loading}
            onRemove={handleRemoveMember}
          />
        </div>
      </div>

      <InviteMemberModal 
        open={inviteModalOpen} 
        onClose={() => setInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  )
}
