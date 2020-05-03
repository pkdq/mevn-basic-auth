<template>
    <div>
        <div class="h-2 w-full bg-gold-light"></div>
        <div class="w-full h-12 flex items-center justify-between px-6">
            <div class="text-gold">MEVN</div>
            <div class="">
                <router-link class="text-brown" to="/auth/login">Sign In</router-link>
                <router-link class="text-brown border-2 boder-brown p-1 ml-3 rounded-full" to="/auth/register">Join Now</router-link>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>