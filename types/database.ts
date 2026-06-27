// types/database.ts
// Placeholder — replace with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          phone: string | null
          role: string
          full_name: string | null
          avatar_url: string | null
          timezone: string
          expo_push_token: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      families: {
        Row: {
          id: string
          name: string | null
          subscription_tier: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['families']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['families']['Insert']>
      }
      family_members: {
        Row: {
          id: string
          family_id: string
          user_id: string
          role: string
          is_primary_caregiver: boolean
          joined_at: string
        }
        Insert: Omit<Database['public']['Tables']['family_members']['Row'], 'id' | 'joined_at'>
        Update: Partial<Database['public']['Tables']['family_members']['Insert']>
      }
      medications: {
        Row: {
          id: string
          elder_id: string
          name: string
          dosage: string | null
          instructions: string | null
          prescribed_by: string | null
          is_critical: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['medications']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['medications']['Insert']>
      }
      medication_schedules: {
        Row: {
          id: string
          medication_id: string
          frequency: string
          times_of_day: string[]
          days_of_week: number[]
          start_date: string | null
          end_date: string | null
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['medication_schedules']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['medication_schedules']['Insert']>
      }
      medication_logs: {
        Row: {
          id: string
          schedule_id: string | null
          elder_id: string
          scheduled_time: string | null
          action: string
          logged_at: string
          note: string | null
        }
        Insert: Omit<Database['public']['Tables']['medication_logs']['Row'], 'id' | 'logged_at'>
        Update: Partial<Database['public']['Tables']['medication_logs']['Insert']>
      }
      wellness_checkins: {
        Row: {
          id: string
          elder_id: string
          scheduled_time: string | null
          completed_at: string | null
          mood_score: number | null
          pain_score: number | null
          energy_score: number | null
          notes: string | null
          status: string
        }
        Insert: Omit<Database['public']['Tables']['wellness_checkins']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['wellness_checkins']['Insert']>
      }
      appointments: {
        Row: {
          id: string
          elder_id: string
          doctor_name: string | null
          specialty: string | null
          location: string | null
          appointment_date: string | null
          notes: string | null
          reminder_sent: boolean
          status: string
          created_by: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['appointments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['appointments']['Insert']>
      }
      emergency_alerts: {
        Row: {
          id: string
          elder_id: string
          family_id: string
          trigger_type: string
          severity: string
          message: string | null
          location_lat: number | null
          location_lng: number | null
          acknowledged_by: string | null
          acknowledged_at: string | null
          resolved_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['emergency_alerts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['emergency_alerts']['Insert']>
      }
      location_sharing: {
        Row: {
          id: string
          elder_id: string
          is_enabled: boolean
          last_lat: number | null
          last_lng: number | null
          last_updated: string | null
          visible_to: string[]
        }
        Insert: Omit<Database['public']['Tables']['location_sharing']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['location_sharing']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
