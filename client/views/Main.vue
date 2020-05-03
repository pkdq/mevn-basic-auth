<template>
    <div>
        <div class="h-2 w-full bg-gold-light"></div>
        <div class="w-full h-12 flex items-center justify-between px-6">
            <router-link class="text-gold" to="/">MEVN</router-link>

            <div class="">
                <router-link class="text-brown" to="/auth/login">Sign In</router-link>
                <router-link class="text-brown border-2 boder-brown px-3 py-2 ml-3 rounded-full hover:text-brown-darkest hover:border-brown-darkest" to="/auth/register">Join Now</router-link>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>