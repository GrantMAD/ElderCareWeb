'use client'
import { Table, TableHeader, TableBody, Tr, Th, Td } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { format } from 'date-fns'
import type { WellnessCheckin } from '@/types/app'

interface CheckinHistoryTableProps {
  checkins: WellnessCheckin[]
  loading?: boolean
}

export function CheckinHistoryTable({ checkins, loading }: CheckinHistoryTableProps) {
  if (loading) {
    return (
      <Card className="p-6 h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      </Card>
    )
  }

  if (!checkins || checkins.length === 0) {
    return (
      <Card className="p-6 text-center text-surface-500">
        No check-in history available.
      </Card>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">Completed</Badge>
      case 'missed': return <Badge className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">Missed</Badge>
      default: return <Badge className="bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300">Pending</Badge>
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-surface-200 dark:border-surface-800">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Check-in History</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <Tr>
              <Th>Date & Time</Th>
              <Th>Status</Th>
              <Th>Mood (1-5)</Th>
              <Th>Energy (1-5)</Th>
              <Th>Pain (0-10)</Th>
              <Th>Notes</Th>
            </Tr>
          </TableHeader>
          <TableBody>
            {checkins.map(checkin => (
              <Tr key={checkin.id}>
                <Td className="whitespace-nowrap">
                  {checkin.completed_at 
                    ? format(new Date(checkin.completed_at), 'MMM d, yyyy h:mm a')
                    : checkin.scheduled_time 
                      ? format(new Date(checkin.scheduled_time), 'MMM d, yyyy h:mm a')
                      : 'Unknown Date'
                  }
                </Td>
                <Td>{getStatusBadge(checkin.status)}</Td>
                <Td>{checkin.status === 'completed' ? (checkin.mood_score || '-') : '-'}</Td>
                <Td>{checkin.status === 'completed' ? (checkin.energy_score || '-') : '-'}</Td>
                <Td>{checkin.status === 'completed' ? (checkin.pain_score ?? '-') : '-'}</Td>
                <Td className="max-w-[200px] truncate" title={checkin.notes}>
                  {checkin.notes || '-'}
                </Td>
              </Tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
