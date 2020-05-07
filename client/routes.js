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
        { path: '/', component: Home, name: 'home' },
        { path: '/auth/login', component: Login, name: 'auth-login' },
        { path: '/auth/register', component: Register, name: 'auth-register' },
        { path: '/auth/register/confirm/:token', component: ActivateAccount, name: 'auth-register-confirm' },
        { path: '/auth/password/reset/:token', component: ResetPassword, name: 'auth-password-reset' },
        { path: '/auth/password/email', component: ForgotPassword, name: 'auth-password-email' },
    ]
})