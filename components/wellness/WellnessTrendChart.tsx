'use client'
import { Card } from '@/components/ui/Card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { format } from 'date-fns'
import type { WellnessCheckin } from '@/types/app'

interface WellnessTrendChartProps {
  checkins: WellnessCheckin[]
  loading?: boolean
}

export function WellnessTrendChart({ checkins, loading }: WellnessTrendChartProps) {
  if (loading) {
    return (
      <Card className="p-6 h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      </Card>
    )
  }

  if (!checkins || checkins.length === 0) {
    return (
      <Card className="p-6 h-[400px] flex flex-col items-center justify-center text-surface-500">
        <p>Not enough data to display trends.</p>
      </Card>
    )
  }

  // Format data for Recharts (reverse to get chronological order)
  const chartData = [...checkins].reverse().map(checkin => ({
    date: checkin.completed_at ? format(new Date(checkin.completed_at), 'MMM d') : '',
    mood: checkin.mood_score || null,
    energy: checkin.energy_score || null,
    // Inverse pain so higher is better for the chart (optional, but keeping it raw for now)
    pain: checkin.pain_score || null, 
  }))

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-6">30-Day Trends</h3>
      
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              dy={10}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 5]}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 10]}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="mood" 
              name="Mood (1-5)"
              stroke="#0ea5e9" // light blue
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="energy" 
              name="Energy (1-5)"
              stroke="#f59e0b" // amber
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="pain" 
              name="Pain (0-10)"
              stroke="#ef4444" // red
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
