'use client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAppointments } from '@/hooks/useAppointments'
import { Calendar as CalendarIcon, MapPin, Plus } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

import { Appointment } from '@/types/app'

export function UpcomingAppointments() {
  const { appointments, loading } = useAppointments()

  // Take only the next 3
  const nextAppointments = appointments?.slice(0, 3) || []

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Upcoming Visits</h3>
        <Link href="/dashboard/appointments">
          <Button variant="ghost" size="sm" className="h-8 px-2 -mr-2">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse flex gap-4">
              <div className="w-12 h-12 bg-surface-200 dark:bg-surface-800 rounded-lg" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-surface-200 dark:bg-surface-800 rounded w-3/4" />
                <div className="h-3 bg-surface-200 dark:bg-surface-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : nextAppointments.length === 0 ? (
        <div className="text-center py-6 px-4 bg-surface-50 dark:bg-surface-900/50 rounded-lg border border-dashed border-surface-200 dark:border-surface-800">
          <CalendarIcon className="w-8 h-8 text-surface-400 mx-auto mb-2" />
          <p className="text-sm text-surface-600 dark:text-surface-400">No upcoming appointments scheduled.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {nextAppointments.map((apt: Appointment) => (
            <div key={apt.id} className="flex gap-4 group">
              <div className="w-12 shrink-0 text-center flex flex-col justify-center items-center bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 rounded-lg border border-brand-100 dark:border-brand-800/50 p-1">
                <span className="text-xs font-semibold uppercase">{format(new Date(apt.appointment_date || ''), 'MMM')}</span>
                <span className="text-lg font-bold leading-none">{format(new Date(apt.appointment_date || ''), 'd')}</span>
              </div>
              <div className="flex-1 min-w-0 py-1">
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {apt.doctor_name} {apt.specialty ? `(${apt.specialty})` : ''}
                </p>
                <div className="flex items-center text-xs text-surface-500 mt-1 gap-3">
                  <span className="flex items-center gap-1 shrink-0">
                    <CalendarIcon className="w-3 h-3" />
                    {format(new Date(apt.appointment_date || ''), 'h:mm a')}
                  </span>
                  {apt.location && (
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{apt.location}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {appointments && appointments.length > 3 && (
            <Link href="/dashboard/appointments" className="block w-full">
              <Button variant="ghost" className="w-full text-xs text-surface-500">
                View all {appointments.length} appointments
              </Button>
            </Link>
          )}
        </div>
      )}
    </Card>
  )
}
