// emails/WeeklyWellnessReport.tsx
// ⚠️  Email template stub — wire up with Resend when ready.

import * as React from 'react'

interface WeeklyWellnessReportProps {
  elderName: string
  weekOf: string
  avgMoodScore?: number
  avgPainScore?: number
  avgEnergyScore?: number
  checkinsCompleted: number
  checkinsTotal: number
  medsTaken: number
  medsTotal: number
  upcomingAppointments: Array<{ doctorName: string; date: string }>
  dashboardUrl: string
}

function ScoreBar({ label, score }: { label: string; score?: number }) {
  if (score === undefined) return null
  const pct = Math.round((score / 10) * 100)
  const color = score >= 7 ? '#16a34a' : score >= 4 ? '#d97706' : '#dc2626'
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ color: '#374151', fontSize: 14 }}>{label}</span>
        <span style={{ color, fontSize: 14, fontWeight: 600 }}>{score.toFixed(1)} / 10</span>
      </div>
      <div style={{ backgroundColor: '#e5e7eb', borderRadius: 4, height: 8 }}>
        <div style={{ width: `${pct}%`, backgroundColor: color, borderRadius: 4, height: 8 }} />
      </div>
    </div>
  )
}

export function WeeklyWellnessReportEmail({
  elderName,
  weekOf,
  avgMoodScore,
  avgPainScore,
  avgEnergyScore,
  checkinsCompleted,
  checkinsTotal,
  medsTaken,
  medsTotal,
  upcomingAppointments,
  dashboardUrl,
}: WeeklyWellnessReportProps) {
  const adherencePct = medsTotal > 0 ? Math.round((medsTaken / medsTotal) * 100) : 0
  const checkinPct = checkinsTotal > 0 ? Math.round((checkinsCompleted / checkinsTotal) * 100) : 0

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#0f766e', fontSize: 24, marginBottom: 4 }}>
        Weekly Wellness Report
      </h1>
      <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 32px' }}>
        {elderName} · Week of {weekOf}
      </p>

      {/* Wellness Scores */}
      <div style={{ backgroundColor: '#f9fafb', borderRadius: 8, padding: 20, marginBottom: 24 }}>
        <h2 style={{ color: '#111827', fontSize: 16, margin: '0 0 16px' }}>Wellness Scores</h2>
        <ScoreBar label="Mood" score={avgMoodScore} />
        <ScoreBar label="Pain (lower is better)" score={avgPainScore ? 10 - avgPainScore : undefined} />
        <ScoreBar label="Energy" score={avgEnergyScore} />
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ backgroundColor: '#eff6ff', borderRadius: 8, padding: 16, textAlign: 'center' as const }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1d4ed8' }}>{checkinPct}%</div>
          <div style={{ color: '#374151', fontSize: 13 }}>Check-ins Completed</div>
          <div style={{ color: '#9ca3af', fontSize: 12 }}>{checkinsCompleted}/{checkinsTotal}</div>
        </div>
        <div style={{ backgroundColor: '#f0fdf4', borderRadius: 8, padding: 16, textAlign: 'center' as const }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#16a34a' }}>{adherencePct}%</div>
          <div style={{ color: '#374151', fontSize: 13 }}>Medication Adherence</div>
          <div style={{ color: '#9ca3af', fontSize: 12 }}>{medsTaken}/{medsTotal} doses</div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#111827', fontSize: 16, margin: '0 0 12px' }}>Upcoming Appointments</h2>
          {upcomingAppointments.map((appt, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <span style={{ color: '#374151', fontSize: 14 }}>{appt.doctorName}</span>
              <span style={{ color: '#6b7280', fontSize: 14 }}>{appt.date}</span>
            </div>
          ))}
        </div>
      )}

      <a
        href={dashboardUrl}
        style={{
          backgroundColor: '#0f766e',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        View Full Dashboard
      </a>
    </div>
  )
}
