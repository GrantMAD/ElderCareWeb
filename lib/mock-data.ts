// lib/mock-data.ts
// Mock data used when Supabase is not yet configured or for UI development
import type {
  Profile,
  Family,
  FamilyMember,
  Medication,
  MedicationLog,
  WellnessCheckin,
  Appointment,
  EmergencyAlert,
  LocationSharing,
  ActivityItem,
  FamilyDashboardData,
} from '../types/app'

export const MOCK_ELDER: Profile = {
  id: 'elder-001',
  email: 'margaret@example.com',
  phone: '+27 82 555 0100',
  role: 'elder',
  full_name: 'Margaret Johnson',
  avatar_url: null,
  timezone: 'Africa/Johannesburg',
  created_at: '2024-01-15T08:00:00Z',
  updated_at: '2024-01-15T08:00:00Z',
}

export const MOCK_FAMILY: Family = {
  id: 'family-001',
  name: 'Johnson Family',
  subscription_tier: 'basic',
  created_at: '2024-01-15T08:00:00Z',
}

export const MOCK_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fm-001',
    family_id: 'family-001',
    user_id: 'user-001',
    role: 'caregiver',
    is_primary_caregiver: true,
    joined_at: '2024-01-15T08:00:00Z',
    profile: {
      id: 'user-001',
      email: 'sarah@example.com',
      role: 'family_member',
      full_name: 'Sarah Johnson',
      timezone: 'Africa/Johannesburg',
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-15T08:00:00Z',
    },
  },
  {
    id: 'fm-002',
    family_id: 'family-001',
    user_id: 'user-002',
    role: 'observer',
    is_primary_caregiver: false,
    joined_at: '2024-02-01T08:00:00Z',
    profile: {
      id: 'user-002',
      email: 'james@example.com',
      role: 'family_member',
      full_name: 'James Johnson',
      timezone: 'Africa/Johannesburg',
      created_at: '2024-02-01T08:00:00Z',
      updated_at: '2024-02-01T08:00:00Z',
    },
  },
]

export const MOCK_MEDICATIONS: Medication[] = [
  {
    id: 'med-001',
    elder_id: 'elder-001',
    name: 'Metformin',
    dosage: '500mg',
    instructions: 'Take with food',
    prescribed_by: 'Dr. Patel',
    is_critical: true,
    created_at: '2024-01-20T08:00:00Z',
    schedules: [
      {
        id: 'sched-001',
        medication_id: 'med-001',
        frequency: 'twice_daily',
        times_of_day: ['08:00', '20:00'],
        days_of_week: [0, 1, 2, 3, 4, 5, 6],
        is_active: true,
      },
    ],
  },
  {
    id: 'med-002',
    elder_id: 'elder-001',
    name: 'Aspirin',
    dosage: '75mg',
    instructions: 'Take after breakfast',
    prescribed_by: 'Dr. Patel',
    is_critical: false,
    created_at: '2024-01-20T08:00:00Z',
    schedules: [
      {
        id: 'sched-002',
        medication_id: 'med-002',
        frequency: 'daily',
        times_of_day: ['09:00'],
        days_of_week: [0, 1, 2, 3, 4, 5, 6],
        is_active: true,
      },
    ],
  },
  {
    id: 'med-003',
    elder_id: 'elder-001',
    name: 'Lisinopril',
    dosage: '10mg',
    instructions: 'Take in the morning',
    prescribed_by: 'Dr. Mthembu',
    is_critical: true,
    created_at: '2024-01-20T08:00:00Z',
    schedules: [
      {
        id: 'sched-003',
        medication_id: 'med-003',
        frequency: 'daily',
        times_of_day: ['08:00'],
        days_of_week: [0, 1, 2, 3, 4, 5, 6],
        is_active: true,
      },
    ],
  },
  {
    id: 'med-004',
    elder_id: 'elder-001',
    name: 'Vitamin D3',
    dosage: '1000 IU',
    instructions: 'Take with lunch',
    prescribed_by: 'Dr. Patel',
    is_critical: false,
    created_at: '2024-01-20T08:00:00Z',
    schedules: [
      {
        id: 'sched-004',
        medication_id: 'med-004',
        frequency: 'daily',
        times_of_day: ['12:00'],
        days_of_week: [0, 1, 2, 3, 4, 5, 6],
        is_active: true,
      },
    ],
  },
]

export const MOCK_MEDICATION_LOGS: MedicationLog[] = [
  {
    id: 'log-001',
    elder_id: 'elder-001',
    schedule_id: 'sched-001',
    action: 'taken',
    logged_at: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
  {
    id: 'log-002',
    elder_id: 'elder-001',
    schedule_id: 'sched-002',
    action: 'skipped',
    logged_at: new Date(Date.now() - 3 * 3600000).toISOString(),
    note: 'Stomach upset',
  },
  {
    id: 'log-003',
    elder_id: 'elder-001',
    schedule_id: 'sched-003',
    action: 'taken',
    logged_at: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
]

export const MOCK_CHECKINS: WellnessCheckin[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  const isCompleted = Math.random() > 0.1
  return {
    id: `checkin-${i}`,
    elder_id: 'elder-001',
    scheduled_time: date.toISOString(),
    completed_at: isCompleted ? date.toISOString() : undefined,
    mood_score: isCompleted ? Math.floor(Math.random() * 3) + 3 : undefined,
    pain_score: isCompleted ? Math.floor(Math.random() * 4) : undefined,
    energy_score: isCompleted ? Math.floor(Math.random() * 2) + 3 : undefined,
    notes: i % 7 === 0 ? 'Feeling a bit tired today' : undefined,
    status: isCompleted ? 'completed' : 'missed',
  } as WellnessCheckin
})

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-001',
    elder_id: 'elder-001',
    doctor_name: 'Dr. Rohan Patel',
    specialty: 'Cardiology',
    location: 'Netcare Christiaan Barnard Memorial Hospital, Cape Town',
    appointment_date: new Date(Date.now() + 2 * 86400000).toISOString(),
    notes: 'Bring previous ECG results',
    reminder_sent: false,
    status: 'upcoming',
    created_at: new Date().toISOString(),
  },
  {
    id: 'appt-002',
    elder_id: 'elder-001',
    doctor_name: 'Dr. Nomsa Mthembu',
    specialty: 'General Practice',
    location: 'Mediclinic Constantiaberg',
    appointment_date: new Date(Date.now() + 9 * 86400000).toISOString(),
    notes: 'Routine check-up and blood pressure review',
    reminder_sent: false,
    status: 'upcoming',
    created_at: new Date().toISOString(),
  },
  {
    id: 'appt-003',
    elder_id: 'elder-001',
    doctor_name: 'Dr. Amina Hassan',
    specialty: 'Ophthalmology',
    location: 'Eye Institute, Cape Town CBD',
    appointment_date: new Date(Date.now() - 14 * 86400000).toISOString(),
    notes: 'Annual eye check',
    reminder_sent: true,
    status: 'completed',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 'appt-004',
    elder_id: 'elder-001',
    doctor_name: 'Dr. Peter van der Berg',
    specialty: 'Physiotherapy',
    location: 'Stellenbosch Physio Clinic',
    appointment_date: new Date(Date.now() - 5 * 86400000).toISOString(),
    notes: 'Cancelled due to transport issues',
    reminder_sent: true,
    status: 'cancelled',
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
]

export const MOCK_ALERTS: EmergencyAlert[] = [
  {
    id: 'alert-001',
    elder_id: 'elder-001',
    family_id: 'family-001',
    trigger_type: 'medication_missed',
    severity: 'medium',
    message: 'Margaret missed Aspirin (75mg) — scheduled at 09:00',
    acknowledged_by: undefined,
    resolved_at: undefined,
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 'alert-002',
    elder_id: 'elder-001',
    family_id: 'family-001',
    trigger_type: 'missed_checkin',
    severity: 'low',
    message: 'Daily wellness check-in was not completed yesterday',
    acknowledged_by: 'user-001',
    acknowledged_at: new Date(Date.now() - 18 * 3600000).toISOString(),
    resolved_at: new Date(Date.now() - 17 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: 'alert-003',
    elder_id: 'elder-001',
    family_id: 'family-001',
    trigger_type: 'sos_button',
    severity: 'critical',
    message: 'SOS button pressed by Margaret Johnson',
    location_lat: -33.9249,
    location_lng: 18.4241,
    acknowledged_by: 'user-001',
    acknowledged_at: new Date(Date.now() - 5 * 86400000 + 300000).toISOString(),
    resolved_at: new Date(Date.now() - 5 * 86400000 + 900000).toISOString(),
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
]

export const MOCK_LOCATION: LocationSharing = {
  id: 'loc-001',
  elder_id: 'elder-001',
  is_enabled: true,
  last_lat: -33.9249,
  last_lng: 18.4241,
  last_updated: new Date(Date.now() - 30 * 60000).toISOString(),
  visible_to: ['user-001', 'user-002'],
}

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'checkin_completed',
    message: 'Wellness check-in completed — Mood 😊, Pain 2/10',
    timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
  },
  {
    id: 'act-002',
    type: 'medication_taken',
    message: 'Metformin 500mg taken',
    timestamp: new Date(Date.now() - 5.5 * 3600000).toISOString(),
  },
  {
    id: 'act-003',
    type: 'medication_taken',
    message: 'Lisinopril 10mg taken',
    timestamp: new Date(Date.now() - 5.3 * 3600000).toISOString(),
  },
  {
    id: 'act-004',
    type: 'medication_missed',
    message: 'Aspirin 75mg missed — scheduled 09:00',
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
  {
    id: 'act-005',
    type: 'appointment_upcoming',
    message: 'Reminder: Dr. Patel (Cardiology) in 2 days',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
]

export const MOCK_DASHBOARD_DATA: FamilyDashboardData = {
  elder: MOCK_ELDER,
  family: MOCK_FAMILY,
  todayMeds: { taken: 3, total: 4 },
  latestCheckin: MOCK_CHECKINS[MOCK_CHECKINS.length - 1],
  upcomingAppointments: MOCK_APPOINTMENTS.filter(a => a.status === 'upcoming'),
  activeAlerts: MOCK_ALERTS.filter(a => !a.resolved_at),
  recentActivity: MOCK_ACTIVITY,
}
