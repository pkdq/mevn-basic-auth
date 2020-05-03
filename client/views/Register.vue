<template>
    <div class="container w-full h-12 mx-auto my-16">
        <div class="max-w-sm mx-auto h-12">
            <h2 class="text-gold text-center text-xl">Register</h2>

            <div class="w-full bg-white shadow mt-5 rounded-sm p-8">
                <c-text-input v-model="model.name" placeholder="Enter your name" />

                <c-text-input v-model="model.email" type="email" placeholder="Enter your email" />

                <c-text-input v-model="model.password" type="password" placeholder="Enter your password" />

                <button class="w-full text-sm mt-3 py-3 bg-emerald text-white rounded-sm focus:outline-none hover:bg-emerald-light">Sign Up</button>
            </div>
        </div>
    </div>
</template>

<script>
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
    })
}
</script>