import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import wsPlugin from './wsPlugin'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msgList: []
    },
    mutations,
    actions,
    getters: {
        msgList(state) {
            return state.msgList
        }
    },
    plugins: [wsPlugin()],
    modules: [
        task
    ]
})
