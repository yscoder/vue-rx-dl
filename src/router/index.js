import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from 'view/Chat'
import Team from 'view/Team'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/chat', component: Chat },
        { path: '/team', component: Team }
    ]
})
