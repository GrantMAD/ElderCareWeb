'use client'
import { useState } from 'react'
import { AppointmentList } from '@/components/appointments/AppointmentList'
import { AppointmentForm } from '@/components/appointments/AppointmentForm'
import { useAppointments } from '@/hooks/useAppointments'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Plus } from 'lucide-react'
import type { Appointment } from '@/types/app'

export default function AppointmentsPage() {
  const { appointments, loading, addAppointment, updateAppointment } = useAppointments()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingApt, setEditingApt] = useState<Appointment | undefined>()

  const handleOpenForm = (apt?: Appointment) => {
    setEditingApt(apt)
    setIsModalOpen(true)
  }

  const handleCloseForm = () => {
    setEditingApt(undefined)
    setIsModalOpen(false)
  }

  const handleSubmit = async (data: Partial<Appointment>) => {
    if (editingApt) {
      await updateAppointment(editingApt.id, data)
    } else {
      await addAppointment(data as Omit<Appointment, 'id' | 'created_at' | 'reminder_sent'>)
    }
    handleCloseForm()
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Appointments</h2>
          <p className="mt-1 text-sm text-surface-500">
            Manage upcoming doctor visits and check-ups.
          </p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="w-5 h-5 mr-2" />
          Add Appointment
        </Button>
      </div>

      <AppointmentList 
        appointments={appointments || []} 
        loading={loading} 
        onEdit={handleOpenForm}
      />

      <Modal open={isModalOpen} onClose={handleCloseForm}>
        <div className="p-1">
          <h2 className="text-xl font-bold mb-6 text-surface-900 dark:text-surface-100">
            {editingApt ? 'Edit Appointment' : 'Schedule Appointment'}
          </h2>
          <AppointmentForm 
            initialData={editingApt} 
            onSubmit={handleSubmit} 
            onCancel={handleCloseForm} 
          />
        </div>
      </Modal>
    </div>
  )
}
