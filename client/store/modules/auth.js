import client from '@utils/axios'

export default {
    namespaced: true,

    state: {},

    getters: {},

    mutations: {
        setAuthentication(state, { user, token }) {
            state.user = user
            state.token = token
        }
    },

    actions: {

        checkAuth({ commit }) {
            if (localStorage.getItem('auth')) {
                const auth = JSON.parse(localStorage.getItem('auth'))

                commit('setAuthentication', auth)
            }
        },

        async loginUser({ commit }, data) {
            let response;

            try {
                response = await  client.post('auth/login', data)
                localStorage.setItem('auth', JSON.stringify(response.data))
                commit('setAuthentication', response.data)
            } catch (e) {
                throw e
            }

            return response.data
        },

        async registerUser({ commit }, data) {
            let response;

            try {
                response = await client.post('auth/register', data)
                localStorage.setItem('auth', JSON.stringify(response.data))
                commit('setAuthentication', response.data)
            } catch (e) {
                throw e
            }            

            return response.data
        }
    }
}