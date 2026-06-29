'use client'
import { useState } from 'react'
import { MedicationList } from '@/components/medications/MedicationList'
import { MedicationForm } from '@/components/medications/MedicationForm'
import { AdherenceCalendar } from '@/components/medications/AdherenceCalendar'
import { AdherenceBar } from '@/components/medications/AdherenceBar'
import { useMedications } from '@/hooks/useMedications'
import { useMedicationLogs } from '@/hooks/useMedicationLogs'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Plus } from 'lucide-react'
import type { Medication } from '@/types/app'

export default function MedicationsPage() {
  const { medications, loading: medsLoading, addMedication, updateMedication } = useMedications()
  const { logs, expectedLogsCount } = useMedicationLogs()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMed, setEditingMed] = useState<Medication | undefined>()

  const takenToday = logs?.filter(l => l.action === 'taken' && new Date(l.logged_at).toDateString() === new Date().toDateString()).length || 0
  const expectedToday = expectedLogsCount || 0

  const handleOpenForm = (med?: Medication) => {
    setEditingMed(med)
    setIsModalOpen(true)
  }

  const handleCloseForm = () => {
    setEditingMed(undefined)
    setIsModalOpen(false)
  }

  const handleSubmit = async (data: any) => {
    if (editingMed) {
      await updateMedication(editingMed.id, data)
    } else {
      await addMedication(data)
    }
    handleCloseForm()
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Medications</h2>
          <p className="mt-1 text-sm text-surface-500">
            Track daily medications, adherence, and schedules.
          </p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="w-5 h-5 mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
          <AdherenceBar taken={takenToday} total={expectedToday} />
        </div>
        <div className="lg:col-span-2">
          <AdherenceCalendar />
        </div>
      </div>

      {/* Medications List */}
      <div>
        <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">Current Regimen</h3>
        <MedicationList 
          medications={medications || []} 
          loading={medsLoading} 
          onEdit={handleOpenForm}
        />
      </div>

      <Modal open={isModalOpen} onClose={handleCloseForm}>
        <div className="p-1">
          <h2 className="text-xl font-bold mb-6 text-surface-900 dark:text-surface-100">
            {editingMed ? 'Edit Medication' : 'Add Medication'}
          </h2>
          <MedicationForm 
            initialData={editingMed} 
            onSubmit={handleSubmit} 
            onCancel={handleCloseForm} 
          />
        </div>
      </Modal>
    </div>
  )
}
