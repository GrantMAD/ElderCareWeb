'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Medication } from '@/types/app'
import { useSession } from '@/hooks/useSession'

export function useMedications(elderId?: string) {
  const [medications, setMedications] = useState<Medication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { elderId: sessionElderId } = useSession()
  const targetId = elderId || sessionElderId

  const fetchMedications = useCallback(async () => {

    try {
      if (!targetId) {
        setMedications([])
        return
      }
      const supabase = createClient()
      const { data, error: err } = await supabase
        .from('medications')
        .select('*, schedules:medication_schedules(*)')
        .eq('elder_id', targetId)
        .order('name')
      if (err) throw err
      setMedications(data ?? [])
    } catch (err) {
      setError('Failed to load medications')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [targetId])

  useEffect(() => { fetchMedications() }, [fetchMedications])

  const addMedication = async (med: Omit<Medication, 'id' | 'created_at'>) => {

    const supabase = createClient()
    const { data } = await (supabase as any).from('medications').insert(med).select().single()
    if (data) setMedications(prev => [...prev, data])
    return data
  }

  const updateMedication = async (id: string, updates: Partial<Medication>) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m))
    const supabase = createClient()
    await (supabase as any).from('medications').update(updates).eq('id', id)
  }

  return { medications, loading, error, refetch: fetchMedications, addMedication, updateMedication }
}
