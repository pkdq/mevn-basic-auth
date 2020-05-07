<template>
    <div class="container w-full h-12 mx-auto my-16">
        <div class="max-w-lg mx-auto h-12">
            <h2 class="text-gold text-center text-xl">Reset Your Password</h2>

            <div class="w-full bg-white shadow mt-5 rounded-sm p-8">

                <div class="w-full bg-red-200 text-red-800 mx-auto p-2 mb-2 rounded" v-if="errors.first('error')">
                    {{ errors.first('error') }}
                </div>

                <c-text-input
                    name="password"
                    v-model="model.password"
                    type="password"
                    v-validate="'required|min:6'"
                    :error="errors.first('password')"
                    placeholder="Enter your new password" />

                <c-button label="Reset Password" :loading="loading" @click="reset" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import cButton from '@components/common/cButton.vue'
import cTextInput from '@components/common/cTextInput.vue'

import loading from "../mixins/loading";
import registerError from "../mixins/registerError";


export default {
    name: 'Reset Password',
    mixins: [loading, registerError],
    components: {
        cButton,
        cTextInput
    },

    data: () => ({
        model: {
            email: '',
        }
    }),

    methods: {
        ...mapActions('auth', ['resetPassword']),

        async reset() {
            const isValid = await this.$validator.validate()

            if (!isValid) {
                return
            }

            this.toggleLoading()

            try {
                const response = await this.resetPassword({
                    ...this.model,
                    token: this.$route.params.token
                })

                this.$router.push('/')
            } catch (error) {
                this.toggleLoading()

                this.setErrors(error)
            }
        },
    }
}
</script>