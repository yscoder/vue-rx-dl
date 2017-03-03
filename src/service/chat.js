import MessageApi from '../api/message'
import { CacheService, SocketService } from './base'

const ChatService = new CacheService(MessageApi.all().then(data => data.list), 'chat')
const MsgService = new SocketService('ws://localhost:3300')

MsgService.watch(msg => ChatService.updateModel(cache => {
    console.log('[RX]: subscribe ', msg)
    cache.push(msg)
    return cache
}))

// 多订阅
// MsgService.watch(x => console.log(x))

export const getData = () => ChatService.getModel()
export const send = item => MsgService.send(item)
