// types/app.ts
// App-level types for Elder Care Companion

export type UserRole = 'elder' | 'family_member' | 'doctor' | 'admin'
export type FamilyMemberRole = 'elder' | 'caregiver' | 'observer'
export type SubscriptionTier = 'free' | 'basic' | 'premium'

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical'
export type AlertTrigger =
  | 'sos_button'
  | 'missed_checkin'
  | 'medication_missed'
  | 'fall_detected'
  | 'manual'

export type MedicationFrequency =
  | 'daily'
  | 'twice_daily'
  | 'weekly'
  | 'as_needed'
  | 'custom'

export type MedicationAction = 'taken' | 'skipped' | 'snoozed'
export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled'
export type CheckinStatus = 'pending' | 'completed' | 'missed'

// ─── Profile ─────────────────────────────────────────────────────────────────
export interface Profile {
  id: string
  email: string
  phone?: string
  role: UserRole
  full_name?: string
  avatar_url?: string
  timezone: string
  expo_push_token?: string
  created_at: string
  updated_at: string
}

// ─── Family ──────────────────────────────────────────────────────────────────
export interface Family {
  id: string
  name?: string
  subscription_tier: SubscriptionTier
  stripe_customer_id?: string
  stripe_subscription_id?: string
  created_at: string
}

export interface FamilyMember {
  id: string
  family_id: string
  user_id: string
  role: FamilyMemberRole
  is_primary_caregiver: boolean
  joined_at: string
  profile?: Profile
}

// ─── Medication ───────────────────────────────────────────────────────────────
export interface Medication {
  id: string
  elder_id: string
  name: string
  dosage?: string
  instructions?: string
  prescribed_by?: string
  is_critical: boolean
  created_at: string
  schedules?: MedicationSchedule[]
}

export interface MedicationSchedule {
  id: string
  medication_id: string
  frequency: MedicationFrequency
  times_of_day: string[]
  days_of_week: number[]
  start_date?: string
  end_date?: string
  is_active: boolean
}

export interface MedicationLog {
  id: string
  schedule_id?: string
  elder_id: string
  scheduled_time?: string
  action: MedicationAction
  logged_at: string
  note?: string
  medication?: Medication
}

// ─── Wellness ────────────────────────────────────────────────────────────────
export interface WellnessCheckin {
  id: string
  elder_id: string
  scheduled_time?: string
  completed_at?: string
  mood_score?: number      // 1–5
  pain_score?: number      // 0–10
  energy_score?: number    // 1–5
  notes?: string
  status: CheckinStatus
}

// ─── Appointments ─────────────────────────────────────────────────────────────
export interface Appointment {
  id: string
  elder_id: string
  doctor_name?: string
  specialty?: string
  location?: string
  appointment_date?: string
  notes?: string
  reminder_sent: boolean
  status: AppointmentStatus
  created_by?: string
  created_at: string
}

// ─── Emergency Alerts ────────────────────────────────────────────────────────
export interface EmergencyAlert {
  id: string
  elder_id: string
  family_id: string
  trigger_type: AlertTrigger
  severity: AlertSeverity
  message?: string
  location_lat?: number
  location_lng?: number
  acknowledged_by?: string
  acknowledged_at?: string
  resolved_at?: string
  created_at: string
  elder?: Profile
  acknowledger?: Profile
}

// ─── Location ────────────────────────────────────────────────────────────────
export interface LocationSharing {
  id: string
  elder_id: string
  is_enabled: boolean
  last_lat?: number
  last_lng?: number
  last_updated?: string
  visible_to: string[]
}

// ─── Activity Feed ───────────────────────────────────────────────────────────
export type ActivityType =
  | 'checkin_completed'
  | 'checkin_missed'
  | 'medication_taken'
  | 'medication_missed'
  | 'medication_snoozed'
  | 'appointment_upcoming'
  | 'sos_triggered'
  | 'alert_acknowledged'

export interface ActivityItem {
  id: string
  type: ActivityType
  message: string
  timestamp: string
  metadata?: Record<string, unknown>
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
export interface FamilyDashboardData {
  elder: Profile
  family: Family
  todayMeds: { taken: number; total: number }
  latestCheckin?: WellnessCheckin
  upcomingAppointments: Appointment[]
  activeAlerts: EmergencyAlert[]
  recentActivity: ActivityItem[]
}
