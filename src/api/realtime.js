import { supabase } from './supabaseClient'

const channels = {}

function getChannel(roomId) {
  if (!channels[roomId]) {
    const channel = supabase.channel(`room:${roomId}`, {
      config: { broadcast: { ack: false, self: false } },
    })
    channel.subscribe()
    channels[roomId] = channel
  }
  return channels[roomId]
}

export function subscribeToMessages(roomId, callback) {
  const channel = getChannel(roomId)
  channel.on('broadcast', { event: 'new_message' }, (payload) => callback(payload.payload))
  return channel
}

export function subscribeToCode(roomId, callback) {
  const channel = getChannel(roomId)
  channel.on('broadcast', { event: 'code_updated' }, (payload) => callback(payload.payload))
  return channel
}

export function subscribeToWhiteboard(roomId, callback) {
  const channel = getChannel(roomId)
  channel.on('broadcast', { event: 'whiteboard_updated' }, (payload) => callback(payload.payload))
  return channel
}

export function subscribeToRoomMembers(roomId, callback) {
  const channel = getChannel(roomId)
  channel.on('broadcast', { event: 'member_joined' }, (payload) => callback(payload.payload))
  return channel
}

export function broadcastMessage(roomId, message) {
  getChannel(roomId).send({ type: 'broadcast', event: 'new_message', payload: message })
}

export function broadcastCode(roomId, codeData) {
  getChannel(roomId).send({ type: 'broadcast', event: 'code_updated', payload: codeData })
}

export function broadcastWhiteboard(roomId, sceneData) {
  getChannel(roomId).send({ type: 'broadcast', event: 'whiteboard_updated', payload: sceneData })
}

export function broadcastMemberJoined(roomId, member) {
  getChannel(roomId).send({ type: 'broadcast', event: 'member_joined', payload: member })
}

export function cleanupChannel(roomId) {
  if (channels[roomId]) {
    channels[roomId].unsubscribe()
    delete channels[roomId]
  }
}
