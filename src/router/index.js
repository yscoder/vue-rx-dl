import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from 'view/Chat'
import Task from 'view/Task'
import Team from 'view/Team'
// import Mix from 'view/Mix'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/chat', component: Chat },
        { path: '/team', component: Team },
        { path: '/task', component: Task }
    ]
})
