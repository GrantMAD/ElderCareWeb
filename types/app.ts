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
  phone?: string | null
  role: UserRole
  full_name?: string | null
  avatar_url?: string | null
  timezone: string
  expo_push_token?: string | null
  created_at: string
  updated_at: string
}

// ─── Family ──────────────────────────────────────────────────────────────────
export interface Family {
  id: string
  name?: string | null
  subscription_tier: SubscriptionTier
  stripe_customer_id?: string | null
  stripe_subscription_id?: string | null
  created_at: string
}

export interface FamilyMember {
  id: string
  family_id: string
  user_id: string
  role: FamilyMemberRole
  is_primary_caregiver: boolean
  joined_at: string
  profile?: Profile | null
}

// ─── Medication ───────────────────────────────────────────────────────────────
export interface Medication {
  id: string
  elder_id: string
  name: string
  dosage?: string | null
  instructions?: string | null
  prescribed_by?: string | null
  is_critical: boolean
  created_at: string
  schedules?: MedicationSchedule[] | null
}

export interface MedicationSchedule {
  id: string
  medication_id: string
  frequency: MedicationFrequency
  times_of_day: string[]
  days_of_week: number[]
  start_date?: string | null
  end_date?: string | null
  is_active: boolean
}

export interface MedicationLog {
  id: string
  schedule_id?: string | null
  elder_id: string
  scheduled_time?: string | null
  action: MedicationAction
  logged_at: string
  note?: string | null
  medication?: Medication | null
}

// ─── Wellness ────────────────────────────────────────────────────────────────
export interface WellnessCheckin {
  id: string
  elder_id: string
  scheduled_time?: string | null
  completed_at?: string | null
  mood_score?: number | null
  pain_score?: number | null
  energy_score?: number | null
  notes?: string | null
  status: CheckinStatus
}

// ─── Appointments ─────────────────────────────────────────────────────────────
export interface Appointment {
  id: string
  elder_id: string
  doctor_name?: string | null
  specialty?: string | null
  location?: string | null
  appointment_date?: string | null
  notes?: string | null
  reminder_sent: boolean
  status: AppointmentStatus
  created_by?: string | null
  created_at: string
}

// ─── Emergency Alerts ────────────────────────────────────────────────────────
export interface EmergencyAlert {
  id: string
  elder_id: string
  family_id: string
  trigger_type: AlertTrigger
  severity: AlertSeverity
  message?: string | null
  location_lat?: number | null
  location_lng?: number | null
  acknowledged_by?: string | null
  acknowledged_at?: string | null
  resolved_at?: string | null
  created_at: string
  elder?: Profile | null
  acknowledger?: Profile | null
}

// ─── Location ────────────────────────────────────────────────────────────────
export interface LocationSharing {
  id: string
  elder_id: string
  is_enabled: boolean
  last_lat?: number | null
  last_lng?: number | null
  last_updated?: string | null
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
  metadata?: Record<string, unknown> | null
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
export interface FamilyDashboardData {
  elder: Profile
  family: Family
  todayMeds: { taken: number; total: number }
  latestCheckin?: WellnessCheckin | null
  upcomingAppointments: Appointment[]
  activeAlerts: EmergencyAlert[]
  recentActivity: ActivityItem[]
}