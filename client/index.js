import Vue from 'vue'
import Router from 'vue-router'

import './styles/main.css'

import routes from './routes'
import Main from './views/Main.vue'

Vue.use(Router)

const app = new Vue({
    el: '#app',
    router: routes,
    render: h => h(Main)
})