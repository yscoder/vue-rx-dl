import MessageApi from '../api/message'
import Store from '../core2/store'

export default {
    getMsgs(store) {
        MessageApi.all().then(data => {
            store.commit('msgList', data.list)
        })
    },
    sendMsg(store, msg) {
        store.commit('sendMsg', msg)
    },
    updateUser({ commit }, user) {
        Store.users.set(cache => {
            Object.assign(cache.find(u => u.id === user.id), user)
        })
    },
    getUsers({commit}) {
        Store.users.get().then(data => {
            commit('syncUsers', data)
        })
    }
}
