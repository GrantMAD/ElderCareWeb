'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_MEDICATIONS } from '@/lib/mock-data'
import type { Medication } from '@/types/app'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co'

export function useMedications(elderId?: string) {
  const [medications, setMedications] = useState<Medication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMedications = useCallback(async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300))
      setMedications(MOCK_MEDICATIONS)
      setLoading(false)
      return
    }
    try {
      if (!elderId) {
        setMedications([])
        return
      }
      const supabase = createClient()
      const { data, error: err } = await supabase
        .from('medications')
        .select('*, schedules:medication_schedules(*)')
        .eq('elder_id', elderId)
        .order('name')
      if (err) throw err
      setMedications(data ?? [])
    } catch (err) {
      setError('Failed to load medications')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [elderId])

  useEffect(() => { fetchMedications() }, [fetchMedications])

  const addMedication = async (med: Omit<Medication, 'id' | 'created_at'>) => {
    if (USE_MOCK) {
      const newMed: Medication = { ...med, id: `med-${Date.now()}`, created_at: new Date().toISOString() }
      setMedications(prev => [...prev, newMed])
      return newMed
    }
    const supabase = createClient()
    const { data } = await (supabase as any).from('medications').insert(med).select().single()
    if (data) setMedications(prev => [...prev, data])
    return data
  }

  const updateMedication = async (id: string, updates: Partial<Medication>) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m))
    if (!USE_MOCK) {
      const supabase = createClient()
      await (supabase as any).from('medications').update(updates).eq('id', id)
    }
  }

  return { medications, loading, error, refetch: fetchMedications, addMedication, updateMedication }
}
