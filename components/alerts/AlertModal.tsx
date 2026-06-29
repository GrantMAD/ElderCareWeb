'use client'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, Phone } from 'lucide-react'
import { useAlerts } from '@/hooks/useAlerts'

export function AlertModal({ alerts }: { alerts: any[] }) {
  const { acknowledgeAlert } = useAlerts()
  
  if (!alerts || alerts.length === 0) return null
  
  // Show the most recent critical alert
  const currentAlert = alerts[0]

  return (
    <Modal open={true} onClose={() => {}}>
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">CRITICAL ALERT</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          {currentAlert.message}
        </p>
        
        <div className="flex flex-col gap-3">
          <Button 
            className="w-full h-12 text-lg bg-red-600 hover:bg-red-700 text-white border-none"
            onClick={() => acknowledgeAlert(currentAlert.id, '')}
          >
            I am handling this
          </Button>
          <a href="tel:911" className="w-full h-12 text-lg flex items-center justify-center border border-surface-200 dark:border-surface-800 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-900 transition-colors">
            <Phone className="w-5 h-5 mr-2" />
            Call Emergency Services
          </a>
        </div>
      </div>
    </Modal>
  )
}
