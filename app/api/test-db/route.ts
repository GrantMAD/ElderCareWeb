import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Use SERVICE ROLE key to bypass RLS
  const supabase = createClient(url!, serviceKey!)

  const membersRes = await supabase.from('family_members').select('*')
  const medsRes = await supabase.from('medications').select('*')

  return Response.json({
    env_url_set: !!url,
    env_service_key_set: !!serviceKey,
    env_anon_key_set: !!anonKey,
    service_key_prefix: serviceKey?.substring(0, 30),
    family_members_data: membersRes.data,
    family_members_error: membersRes.error,
    medications_data: medsRes.data,
    medications_error: medsRes.error,
  })
}
