'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { FamilyMember } from '@/types/app'
import { useSession } from '@/hooks/useSession'

export function useFamilyMembers(familyId?: string) {
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { familyId: sessionFamilyId } = useSession()
  const targetId = familyId || sessionFamilyId

  const fetchMembers = useCallback(async () => {
    try {
      if (!targetId) {
        setMembers([])
        setLoading(false)
        return
      }
      const supabase = createClient()
      
      const { data, error: err } = await supabase
        .from('family_members')
        .select('*, profile:profiles(*)')
        .eq('family_id', targetId)
        .order('joined_at', { ascending: true })

      if (err) throw err
      
      setMembers((data as unknown) as FamilyMember[])
    } catch (err) {
      setError('Failed to load family members')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [targetId])

  useEffect(() => { fetchMembers() }, [fetchMembers])

  const updateMemberRole = async (id: string, updates: Partial<FamilyMember>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m))
    const supabase = createClient()
    await (supabase as any).from('family_members').update(updates).eq('id', id)
  }

  return { members, loading, error, refetch: fetchMembers, updateMemberRole }
}
