<template>
    <div class="container w-full h-12 mx-auto my-16">
        <div class="max-w-lg mx-auto h-12">
            <h2 class="text-gold text-center text-xl">Register</h2>

            <div class="w-full bg-white shadow mt-5 rounded-sm p-8">
                <c-text-input 
                    name="name" 
                    v-model="model.name"
                    v-validate="'required'"
                    :error="errors.first('name')"
                    placeholder="Enter your name" />

                <c-text-input 
                    name="email" 
                    v-model="model.email" 
                    type="email" 
                    v-validate="'required|email'"
                    :error="errors.first('email')"
                    placeholder="Enter your email" />

                <c-text-input 
                    name="password" 
                    v-model="model.password" 
                    type="password"
                    v-validate="'required|min:6'"
                    :error="errors.first('password')"
                    placeholder="Enter your password" />

                <c-button label="Sign Up" :loading="loading" @click="register" />
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
    name: 'Register',
    mixins: [loading, registerError],
    components: {
        cButton,
        cTextInput
    },
    
    data: () => ({
        model: {
            name: '',
            email: '',
            password: ''
        }
    }),

    methods: {
        ...mapActions('auth', ['registerUser']),

        async register() {
            const isValid = await this.$validator.validate()            

            if (!isValid) {
                return
            }

            this.toggleLoading()

            try {
                await this.registerUser(this.model)
                this.redirectTo({ name: 'home' })
            } catch (error) {
                this.toggleLoading()

                this.setErrors(error)
            }
        },
    }
}
</script>