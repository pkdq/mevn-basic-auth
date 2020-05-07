import Router from 'vue-router'

import Home from '@views/Home.vue'
import Login from '@views/Login.vue'
import Register from '@views/Register.vue'
import ResetPassword from "@views/ResetPassword.vue";
import ActivateAccount from "@views/ActivateAccount.vue";
import ForgotPassword from "@views/ForgotPassword.vue"

export default new Router({
    mode: 'history',
    routes: [
        { path: '/auth/login', component: Login },
        { path: '/auth/register', component: Register },
        { path: '/auth/register/confirm/:token', component: ActivateAccount },
        { path: '/auth/password/reset/:token', component: ResetPassword },
        { path: '/auth/password/email', component: ForgotPassword },
        { path: '/', component: Home },
    ]
})