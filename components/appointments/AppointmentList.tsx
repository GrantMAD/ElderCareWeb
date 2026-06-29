'use client'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { format } from 'date-fns'
import type { Appointment } from '@/types/app'

interface AppointmentListProps {
  appointments: Appointment[]
  loading?: boolean
  onEdit?: (apt: Appointment) => void
}

export function AppointmentList({ appointments, loading, onEdit }: AppointmentListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="p-4 animate-pulse flex gap-4">
            <div className="w-16 h-16 bg-surface-200 dark:bg-surface-800 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-5 bg-surface-200 dark:bg-surface-800 rounded w-1/3" />
              <div className="h-4 bg-surface-200 dark:bg-surface-800 rounded w-1/4" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 px-4 border-2 border-dashed border-surface-200 dark:border-surface-800 rounded-xl bg-surface-50 dark:bg-surface-900/50">
        <Calendar className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100">No Appointments</h3>
        <p className="text-sm text-surface-500 mt-1">There are no upcoming appointments scheduled.</p>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">Completed</Badge>
      case 'cancelled': return <Badge className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">Cancelled</Badge>
      default: return <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">Upcoming</Badge>
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {appointments.map(apt => (
        <Card 
          key={apt.id} 
          className={`p-4 hover:border-brand-300 dark:hover:border-brand-700 transition-colors cursor-pointer group ${apt.status === 'cancelled' ? 'opacity-60' : ''}`}
          onClick={() => onEdit?.(apt)}
        >
          <div className="flex gap-4">
            <div className="w-16 shrink-0 text-center flex flex-col justify-center items-center bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 rounded-lg border border-brand-100 dark:border-brand-800/50 p-2">
              <span className="text-xs font-semibold uppercase">{format(new Date(apt.appointment_date || ''), 'MMM')}</span>
              <span className="text-xl font-bold leading-none my-0.5">{format(new Date(apt.appointment_date || ''), 'd')}</span>
              <span className="text-xs text-brand-600 dark:text-brand-500">{format(new Date(apt.appointment_date || ''), 'yyyy')}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-surface-900 dark:text-surface-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate pr-2">
                  {apt.doctor_name} {apt.specialty ? `(${apt.specialty})` : ''}
                </h4>
                {getStatusBadge(apt.status)}
              </div>
              
              <div className="space-y-1 mt-2">
                <div className="flex items-center text-sm text-surface-600 dark:text-surface-400 gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{format(new Date(apt.appointment_date || ''), 'h:mm a')}</span>
                </div>
                {apt.location && (
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400 gap-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{apt.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {apt.notes && (
            <div className="mt-4 pt-3 border-t border-surface-100 dark:border-surface-800 text-sm text-surface-600 dark:text-surface-400 truncate italic">
              {apt.notes}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
