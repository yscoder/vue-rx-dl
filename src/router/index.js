import Vue from 'vue'
import VueRouter from 'vue-router'
// import Chat from 'view/Chat'
import Team from 'view/Team2'
// import Mix from 'view/Mix'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        // { path: '/chat', component: Chat },
        // { path: '/mix', component: Mix },
        { path: '/team', component: Team }
    ]
})
