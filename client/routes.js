import Router from 'vue-router'

import Home from '@views/Home.vue'
import Login from '@views/Login.vue'
import Register from '@views/Register.vue'

export default new Router({
    mode: 'history',
    routes: [
        { path: '/auth/login', component: Login },
        { path: '/auth/register', component: Register },
        { path: '/', component: Home },
    ]
})