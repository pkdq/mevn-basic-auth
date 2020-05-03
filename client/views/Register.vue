<template>
    <div class="container w-full h-12 mx-auto my-16">
        <div class="max-w-sm mx-auto h-12">
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

                <button 
                    class="w-full text-sm mt-3 py-3 bg-emerald text-white rounded-sm focus:outline-none hover:bg-emerald-light"
                    @click="register"
                >Sign Up</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import cTextInput from '@components/common/cTextInput.vue'

export default {
    name: 'Register',
    components: {
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

            await this.registerUser(this.model)
        }
    }
}
</script>