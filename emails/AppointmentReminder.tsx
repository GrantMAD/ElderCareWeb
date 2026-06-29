// emails/AppointmentReminder.tsx
// ⚠️  Email template stub — wire up with Resend when ready.

import * as React from 'react'

interface AppointmentReminderProps {
  elderName: string
  doctorName: string
  specialty?: string
  location?: string
  appointmentDate: string
  notes?: string
  dashboardUrl: string
}

export function AppointmentReminderEmail({
  elderName,
  doctorName,
  specialty,
  location,
  appointmentDate,
  notes,
  dashboardUrl,
}: AppointmentReminderProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#0f766e', fontSize: 24, marginBottom: 8 }}>
        📅 Appointment Reminder
      </h1>
      <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 24px' }}>
        Upcoming appointment for <strong>{elderName}</strong>
      </p>

      <div
        style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #86efac',
          borderRadius: 8,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <p style={{ color: '#374151', fontSize: 16, margin: '0 0 8px' }}>
          <strong>Doctor:</strong> {doctorName}
          {specialty && ` (${specialty})`}
        </p>
        <p style={{ color: '#374151', fontSize: 16, margin: '0 0 8px' }}>
          <strong>Date & Time:</strong> {appointmentDate}
        </p>
        {location && (
          <p style={{ color: '#374151', fontSize: 16, margin: '0 0 8px' }}>
            <strong>Location:</strong> {location}
          </p>
        )}
        {notes && (
          <p style={{ color: '#374151', fontSize: 16, margin: '0 0 0' }}>
            <strong>Notes:</strong> {notes}
          </p>
        )}
      </div>

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
        View in Dashboard
      </a>
    </div>
  )
}
