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
            await this.activateAccount({ token: this.$route.params.token })
            this.redirectTo({ name: 'home' })
        } catch (e) {
            // TODO: Throw flash message here
            this.redirectTo({ name: 'home' })
        }
    }
}
</script>