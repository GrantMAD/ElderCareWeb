// emails/SOSAlert.tsx
// ⚠️  Email template stub — wire up with Resend when ready.

import * as React from 'react'

interface SOSAlertProps {
  elderName: string
  triggerType: string
  severity: string
  message?: string
  locationLat?: number
  locationLng?: number
  dashboardUrl: string
  timestamp: string
}

export function SOSAlertEmail({
  elderName,
  triggerType,
  severity,
  message,
  locationLat,
  locationLng,
  dashboardUrl,
  timestamp,
}: SOSAlertProps) {
  const severityColor =
    severity === 'critical' ? '#dc2626' : severity === 'high' ? '#ea580c' : '#d97706'

  const triggerLabel: Record<string, string> = {
    sos_button: 'SOS Button Pressed',
    missed_checkin: 'Missed Check-In',
    medication_missed: 'Medication Missed',
    fall_detected: 'Fall Detected',
    manual: 'Manual Alert',
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>
      <div
        style={{
          backgroundColor: severityColor,
          color: '#ffffff',
          padding: '16px 24px',
          borderRadius: '8px 8px 0 0',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22 }}>
          🚨 {severity.toUpperCase()} ALERT — {elderName}
        </h1>
      </div>

      <div
        style={{
          backgroundColor: '#fef2f2',
          border: `1px solid ${severityColor}`,
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '24px',
        }}
      >
        <p style={{ color: '#374151', fontSize: 16, margin: '0 0 8px' }}>
          <strong>Trigger:</strong> {triggerLabel[triggerType] ?? triggerType}
        </p>
        <p style={{ color: '#374151', fontSize: 16, margin: '0 0 8px' }}>
          <strong>Time:</strong> {timestamp}
        </p>
        {message && (
          <p style={{ color: '#374151', fontSize: 16, margin: '0 0 8px' }}>
            <strong>Details:</strong> {message}
          </p>
        )}
        {locationLat && locationLng && (
          <p style={{ color: '#374151', fontSize: 16, margin: '0 0 16px' }}>
            <strong>Location:</strong>{' '}
            <a
              href={`https://maps.google.com/?q=${locationLat},${locationLng}`}
              style={{ color: '#0f766e' }}
            >
              View on Google Maps
            </a>
          </p>
        )}

        <div style={{ marginTop: 24 }}>
          <a
            href={dashboardUrl}
            style={{
              backgroundColor: severityColor,
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            View Alert in Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
