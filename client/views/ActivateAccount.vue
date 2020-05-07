<template>
    <h1 class="text-center my-16 text-brown">
        Confirming Email .....
    </h1>
</template>

<script>
import { mapActions } from 'vuex'


export default {
    name: 'ActivateAccount',

    methods: {
        ...mapActions('auth', ['activateAccount'])
    },

    async mounted() {
        try {
            console.warn('TRY')
            await this.activateAccount({ token: this.$route.params.token })
            this.$router.push('/')
        } catch (e) {
            console.warn('CATCH')

            // TODO: Throw flash message here
            this.$router.push('/')
        }
    }
}
</script>