import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import wsPlugin from './wsPlugin'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userList: []
    },
    mutations,
    actions,
    getters: {
        userList(state) {
            return state.userList
        },
        loginUser(state) {
            return state.userList.length ? state.userList.find(u => u.id === 10002) : {}
        }
    },
    plugins: [wsPlugin()],
    modules: [
        task
    ]
})
