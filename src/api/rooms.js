import { supabase } from './supabaseClient'

export async function getRooms() {
  const { data, error } = await supabase
    .from('rooms')
    .select('*, room_members(count)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map((room) => ({
    ...room,
    member_count: room.room_members?.[0]?.count ?? 0,
  }))
}

export async function getRoom(roomId) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*, room_members(count)')
    .eq('id', roomId)
    .single()
  if (error) throw error
  return { ...data, member_count: data.room_members?.[0]?.count ?? 0 }
}

export async function createRoom(name) {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('rooms')
    .insert({ name, created_by: user.id })
    .select()
    .single()

  if (error) throw error

  await supabase.from('room_members').insert({
    room_id: data.id,
    user_id: user.id,
  })

  return data
}

export async function joinRoom(roomId) {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase.from('room_members').insert({
    room_id: roomId,
    user_id: user.id,
  })

  if (error && error.code !== '23505') throw error
}

export async function getRoomMembers(roomId) {
  const { data, error } = await supabase
    .from('room_members')
    .select('user_id, profiles(full_name, email)')
    .eq('room_id', roomId)

  if (error) throw error
  return data
}

export async function getMyRooms() {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('room_members')
    .select('room_id, rooms(*)')
    .eq('user_id', user.id)

  if (error) throw error
  return data.map((m) => m.rooms)
}
