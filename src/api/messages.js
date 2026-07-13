import { supabase } from './supabaseClient'

export async function getMessages(roomId) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*, profiles(full_name)')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function sendMessage(roomId, text, role = 'bot') {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('chat_messages')
    .insert({ room_id: roomId, user_id: user.id, text, role })
    .select()
    .single()

  if (error) throw error
  return data
}
