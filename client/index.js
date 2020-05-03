import Vue from 'vue'

import Main from './views/Main.vue'

const app = new Vue({
    el: '#app',
    render: h => h(Main)
})