import { GET } from 'src/core2/ajax'
import _ from 'lodash'

export default {
    state: {
        task: {}
    },
    getters: {
        task(state, getters, rootState) {
            let task = state.task
            task.members = rootState.userList.filter(u => _.includes(task.members, u.id))
            return task
        }
    },
    actions: {
        update({ commit }) {

        },
        getTask({ commit }, id) {
            GET('/task/' + id).then(data => {
                commit('syncTask', data)
            })
        }
    },
    mutations: {
        syncTask(state, data, rootState) {
            state.task = data
        }
    }
}
