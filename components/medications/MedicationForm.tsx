'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

interface MedicationFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function MedicationForm({ initialData, onSubmit, onCancel }: MedicationFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [dosage, setDosage] = useState(initialData?.dosage || '')
  const [frequency, setFrequency] = useState(initialData?.schedules?.[0]?.frequency || 'daily')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Format data
    const data = {
      name,
      dosage,
      is_critical: false, // default
      schedules: [
        {
          frequency,
          times_of_day: ['09:00'],
          days_of_week: [1,2,3,4,5,6,7],
          is_active: true
        }
      ]
    }
    
    await onSubmit(data)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Medication Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="e.g. Lisinopril"
      />
      
      <Input
        label="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        placeholder="e.g. 10mg"
      />
      
      <Select
        label="Frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Twice Daily', value: 'twice_daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'As Needed', value: 'as_needed' }
        ]}
      />
      
      <div className="flex gap-3 justify-end pt-4 border-t border-surface-200 dark:border-surface-800">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? 'Update' : 'Add Medication'}
        </Button>
      </div>
    </form>
  )
}
