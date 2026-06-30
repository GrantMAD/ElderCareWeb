'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types/app'

export function useSession() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [familyId, setFamilyId] = useState<string | null>(null)
  const [familyName, setFamilyName] = useState<string | null>(null)
  const [elderId, setElderId] = useState<string | null>(null)
  const [elderName, setElderName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const fetchProfileAndContext = async (userId: string) => {
      // 1. Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      setProfile(profileData as Profile | null)

      // 2. Fetch Family Membership
      const userMemberRes = await supabase
        .from('family_members')
        .select('family_id, families(name)')
        .eq('user_id', userId)
        .single()
      
      const userMember = userMemberRes.data as any

      if (userMember?.family_id) {
        setFamilyId(userMember.family_id)
        setFamilyName(userMember.families?.name ?? null)

        // 3. Fetch Elder in that Family
        const elderMemberRes = await supabase
          .from('family_members')
          .select('user_id, profiles!user_id(full_name)')
          .eq('family_id', userMember.family_id)
          .eq('role', 'elder')
          .single()
        
        const elderMember = elderMemberRes.data as any

        if (elderMember) {
          setElderId(elderMember.user_id)
          setElderName(elderMember.profiles?.full_name ?? null)
        }
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfileAndContext(session.user.id).finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setLoading(true)
        fetchProfileAndContext(session.user.id).finally(() => setLoading(false))
      } else {
        setProfile(null)
        setFamilyId(null)
        setFamilyName(null)
        setElderId(null)
        setElderName(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, profile, familyId, familyName, elderId, elderName, loading }
}
