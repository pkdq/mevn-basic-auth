<template>
    <div class="container w-full h-12 mx-auto my-16">
        <div class="max-w-lg mx-auto h-12">
            <h2 class="text-gold text-center text-xl">Forgot Password</h2>

            <div class="w-full bg-white shadow mt-5 rounded-sm p-8">

                <div class="w-full bg-red-200 text-red-800 mx-auto p-2 mb-2 rounded" v-if="errors.first('error')">
                    {{ errors.first('error') }}
                </div>

                <c-text-input
                    name="email"
                    v-model="model.email"
                    type="email"
                    v-validate="'required|email'"
                    :error="errors.first('email')"
                    placeholder="Enter your email" />

                <c-button label="Send Password Reset Link" :loading="loading" @click="reset" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import cButton from '@components/common/cButton.vue'
import cTextInput from '@components/common/cTextInput.vue'

import loading from "@mixins/loading";
import registerError from "@mixins/registerError";


export default {
    name: 'ForgotPassword',
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
        ...mapActions('auth', ['forgotPassword']),

        async reset() {
            const isValid = await this.$validator.validate()

            if (!isValid) {
                return
            }

            this.toggleLoading()

            try {
                await this.forgotPassword(this.model)
                this.redirectTo({ name: 'home' })
            } catch (error) {
                this.toggleLoading()

                this.setErrors(error)
            }
        },
    }
}
</script>