// emails/FamilyInvite.tsx
// ⚠️  Email template stub — wire up with Resend when ready.

import * as React from 'react'

interface FamilyInviteProps {
  inviterName: string
  familyName: string
  inviteUrl: string
  role: string
}

export function FamilyInviteEmail({
  inviterName,
  familyName,
  inviteUrl,
  role,
}: FamilyInviteProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#0f766e', fontSize: 24, marginBottom: 16 }}>
        You've been invited to Elder Care Companion
      </h1>
      <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.5 }}>
        <strong>{inviterName}</strong> has invited you to join the{' '}
        <strong>{familyName}</strong> family as a{' '}
        <strong>{role}</strong>.
      </p>
      <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.5, marginTop: 16 }}>
        Elder Care Companion helps families monitor and support their loved ones
        remotely with medication tracking, wellness check-ins, and real-time alerts.
      </p>
      <div style={{ margin: '32px 0' }}>
        <a
          href={inviteUrl}
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
          Accept Invitation
        </a>
      </div>
      <p style={{ color: '#9ca3af', fontSize: 14 }}>
        This link expires in 7 days. If you did not expect this invitation, you
        can safely ignore this email.
      </p>
    </div>
  )
}
