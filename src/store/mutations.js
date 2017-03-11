export default {
    msgList(state, data) {
        state.msgList = data
    },
    sendMsg() {

    },
    addMsg(state, data) {
        console.log('[Vuex]: submit ', data)
        state.msgList.push(data)
    },
    updateUser(state, data) {
        state.userList = Object.assign(state.userList.find(u => u.id === data.id), data)
    },
    syncUsers(state, users) {
        state.userList = users
    }
}
