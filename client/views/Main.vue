<template>
    <div>
        <div v-if="!isUserEmailConfirmed && user" class="w-full h-12 tex-brown bg-gold-lightest flex items-center justify-center">
            Please confirm your email address. Didn't receive an email?
            <span
                    class="cursor-pointer ml-2 border-b-2 border-brown hover:text-brown-darkest"
                    @click="resendEmailConfirm"
            >
                Click here to resend email.
            </span>
        </div>
        <div class="h-2 w-full bg-gold-light"></div>
        <div class="w-full h-12 flex items-center justify-between px-6">
            <router-link class="text-gold" to="/">MEVN</router-link>

            <div class="" v-if="user">
                <span class="cursor-pointer text-brown hover:text-brown-darkest" @click="logoutUser">Logout</span>
            </div>
            <div v-else>
                <router-link class="text-brown" to="/auth/login">Sign In</router-link>
                <router-link class="text-brown border-2 boder-brown px-3 py-2 ml-3 rounded-full hover:text-brown-darkest hover:border-brown-darkest" to="/auth/register">Join Now</router-link>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('auth', ['user']),

        isUserEmailConfirmed: vm => !!vm.user && !!vm.user.email_confirmed_at
    },

    methods: {
        ...mapActions('auth', ['logout', 'checkAuth', 'resendConfirmationEmail']),

        async resendEmailConfirm() {
            try {
                await this.resendConfirmationEmail()
                this.redirectTo({ name: 'home' })
            } catch (e) {
                this.redirectTo({ name: 'home' })
            }
        },

        logoutUser() {
            this.logout()
            this.redirectTo({ name: 'home' })
        }
    },

    created() {
        this.checkAuth()
    }
}
</script>