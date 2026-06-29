'use client'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Mail, Phone, Trash2 } from 'lucide-react'
import type { FamilyMember } from '@/types/app'

interface FamilyMemberListProps {
  members: FamilyMember[]
  loading?: boolean
  onRemove?: (id: string) => void
}

export function FamilyMemberList({ members, loading, onRemove }: FamilyMemberListProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-12 h-12 rounded-full bg-surface-200 dark:bg-surface-800" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-surface-200 dark:bg-surface-800 rounded w-1/4" />
                <div className="h-3 bg-surface-200 dark:bg-surface-800 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="divide-y divide-surface-200 dark:divide-surface-800">
      {members.map(member => (
        <div key={member.id} className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-lg">
              {member.profile?.full_name?.charAt(0) || '?'}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-surface-900 dark:text-surface-100">
                  {member.profile?.full_name || 'Unknown User'}
                </h4>
                <Badge className={member.role === 'primary_caregiver' ? 'bg-brand-100 text-brand-700' : 'bg-surface-100 text-surface-700'}>
                  {member.role.replace('_', ' ')}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 mt-1 text-sm text-surface-500">
                {member.profile?.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {member.profile.email}
                  </span>
                )}
                {member.profile?.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {member.profile.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {member.role !== 'primary_caregiver' && onRemove && (
            <Button 
              variant="ghost" 
              className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 w-full sm:w-auto"
              onClick={() => onRemove(member.id)}
            >
              <Trash2 className="w-4 h-4 mr-2 sm:mr-0" />
              <span className="sm:hidden">Remove Member</span>
            </Button>
          )}
        </div>
      ))}
    </Card>
  )
}
