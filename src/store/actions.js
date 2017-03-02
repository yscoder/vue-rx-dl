import MessageApi from '../api/message'

export default {
    getMsgs(store) {
        MessageApi.all().then(data => {
            store.commit('msgList', data.list)
        })
    },
    sendMsg(store, msg) {
        store.commit('sendMsg', msg)
    }
}
