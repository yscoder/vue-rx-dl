import MessageApi from '../api/message'
import { CacheService, SocketService } from './base'
import storage from '../cache/storage'

const ChatService = new CacheService('chat', storage.SESSION)
const MsgService = new SocketService('ws://localhost:3300')

MsgService.watch(msg => ChatService.updateModel(cache => {
    console.log('[RX]: subscribe ', msg)
    cache.push(msg)
    return cache
}))

// 多订阅
// MsgService.watch(x => console.log(x))

export const getData = () => ChatService.getModel(MessageApi.all().then(data => data.list))
export const send = item => MsgService.send(item)
