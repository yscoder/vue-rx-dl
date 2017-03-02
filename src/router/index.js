import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from 'view/Chat'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/Chat', component: Chat }
    ]
})
