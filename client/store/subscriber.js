import store from '@store'
import axios from '@utils/axios'

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if (mutation.payload) {
                axios.defaults.headers.access_token = mutation.payload
                localStorage.setItem('token', mutation.payload)
            } else {
                axios.defaults.headers.access_token = mutation.payload
                localStorage.setItem('token', mutation.payload)
            }

            break

        default:
            break
    }
})