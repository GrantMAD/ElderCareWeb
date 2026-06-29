'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Appointment } from '@/types/app'

interface AppointmentFormProps {
  initialData?: Appointment
  onSubmit: (data: Partial<Appointment>) => Promise<void>
  onCancel: () => void
}

export function AppointmentForm({ initialData, onSubmit, onCancel }: AppointmentFormProps) {
  const [doctorName, setDoctorName] = useState(initialData?.doctor_name || '')
  const [specialty, setSpecialty] = useState(initialData?.specialty || '')
  const [location, setLocation] = useState(initialData?.location || '')
  const [date, setDate] = useState(initialData?.appointment_date ? new Date(initialData.appointment_date).toISOString().slice(0, 16) : '')
  const [notes, setNotes] = useState(initialData?.notes || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    await onSubmit({
      doctor_name: doctorName,
      specialty,
      location,
      appointment_date: new Date(date).toISOString(),
      notes,
      status: initialData?.status || 'upcoming',
      reminder_sent: initialData?.reminder_sent || false,
    })
    
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Doctor Name"
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
        required
        placeholder="e.g. Dr. Smith"
      />
      
      <Input
        label="Specialty"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        placeholder="e.g. Cardiology"
      />
      
      <Input
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="e.g. City Hospital, Room 402"
      />
      
      <Input
        label="Date & Time"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-surface-900 dark:text-surface-100">Notes (Optional)</label>
        <textarea
          className="flex min-h-[80px] w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3 py-2 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any questions or items to bring..."
        />
      </div>
      
      <div className="flex gap-3 justify-end pt-4 border-t border-surface-200 dark:border-surface-800">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? 'Update Appointment' : 'Add Appointment'}
        </Button>
      </div>
    </form>
  )
}
