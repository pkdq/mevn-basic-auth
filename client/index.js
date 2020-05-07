import Vue from 'vue'
import Router from 'vue-router'
import Validator from 'vee-validate'

import './styles/main.css'

import routes from './routes'
import Main from '@views/Main.vue'

import store from '@store'
import initStore from '@store/init'

Vue.use(Router)
Vue.use(Validator)

Vue.mixin({
    methods: {
        redirectTo(route) {
            this.$router.push(route).catch(err => {})
        }
    }
});

initStore(store)

const app = new Vue({
    el: '#app',
    store,
    router: routes,
    render: h => h(Main)
})