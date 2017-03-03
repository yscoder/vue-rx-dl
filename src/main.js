import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueRx, Rx)
Vue.use(ElementUI)

export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
