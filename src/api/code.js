import { supabase } from './supabaseClient'

export async function getCode(roomId) {
  const { data, error } = await supabase
    .from('code_sessions')
    .select('*')
    .eq('room_id', roomId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function saveCode(roomId, content, language) {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error('Not authenticated')

  const existing = await getCode(roomId)

  if (existing) {
    const { data, error } = await supabase
      .from('code_sessions')
      .update({ content, language, updated_by: user.id })
      .eq('room_id', roomId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('code_sessions')
    .insert({ room_id: roomId, content, language, updated_by: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}
