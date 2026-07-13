import { supabase } from './supabaseClient'

function getChannel(roomId, topic) {
  return supabase.channel(`room:${roomId}`, {
    config: { broadcast: { ack: false, self: false } },
  })
}

// Subscriptions

export function subscribeToMessages(roomId, callback) {
  const channel = getChannel(roomId)
  channel.on('broadcast', { event: 'new_message' }, (payload) => callback(payload.payload))
  channel.subscribe()
  return channel
}

export function subscribeToCode(roomId, callback) {
  const channel = getChannel(roomId)
  channel.on('broadcast', { event: 'code_updated' }, (payload) => callback(payload.payload))
  channel.subscribe()
  return channel
}

export function subscribeToWhiteboard(roomId, callback) {
  const channel = getChannel(roomId)
  channel.on('broadcast', { event: 'whiteboard_updated' }, (payload) => callback(payload.payload))
  channel.subscribe()
  return channel
}

export function subscribeToRoomMembers(roomId, callback) {
  const channel = getChannel(roomId)
  channel.on('broadcast', { event: 'member_joined' }, (payload) => callback(payload.payload))
  channel.subscribe()
  return channel
}

// Broadcasts (call after saving to DB)

export async function broadcastMessage(roomId, message) {
  const channel = getChannel(roomId)
  await channel.subscribe()
  channel.send({ type: 'broadcast', event: 'new_message', payload: message })
}

export async function broadcastCode(roomId, codeData) {
  const channel = getChannel(roomId)
  await channel.subscribe()
  channel.send({ type: 'broadcast', event: 'code_updated', payload: codeData })
}

export async function broadcastWhiteboard(roomId, sceneData) {
  const channel = getChannel(roomId)
  await channel.subscribe()
  channel.send({ type: 'broadcast', event: 'whiteboard_updated', payload: sceneData })
}

export async function broadcastMemberJoined(roomId, member) {
  const channel = getChannel(roomId)
  await channel.subscribe()
  channel.send({ type: 'broadcast', event: 'member_joined', payload: member })
}
