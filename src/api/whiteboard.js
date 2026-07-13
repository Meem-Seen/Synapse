import { supabase } from './supabaseClient'

export async function getWhiteboardScene(roomId) {
  const { data, error } = await supabase
    .from('whiteboard_scenes')
    .select('*')
    .eq('room_id', roomId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function saveWhiteboardScene(roomId, elements) {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error('Not authenticated')

  const existing = await getWhiteboardScene(roomId)

  if (existing) {
    const { data, error } = await supabase
      .from('whiteboard_scenes')
      .update({ scene_data: elements, updated_by: user.id })
      .eq('room_id', roomId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('whiteboard_scenes')
    .insert({ room_id: roomId, scene_data: elements, updated_by: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}
