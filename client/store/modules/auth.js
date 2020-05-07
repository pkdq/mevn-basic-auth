import client from '@utils/axios'

export default {
    namespaced: true,

    state: {
        user: null,
        token: null
    },

    getters: {
        user: (state) => state.user
    },

    mutations: {
        setAuthentication(state, { user, token }) {
            state.user = user
            state.token = token
        }
    },

    actions: {

        logout({ commit }) {
            try {
                localStorage.removeItem('auth')
                commit('setAuthentication', { user: null, token: null })
            } catch (e) {
                throw e
            }
        },

        async resendConfirmationEmail({ commit }, data) {
            let response;

            try {
                response = await client.post('auth/register/email/resend')
            } catch (e) {
                throw e
            }

            return response.data
        },

        async resetPassword({ commit }, data) {
            let response;

            try {
                response = await client.post('auth/password/reset', data)
            } catch (e) {
                throw e
            }

            return response.data;
        },

        async forgotPassword({ commit }, data) {
            let response;

            try {
                response = await client.post('auth/password/email', data)
            } catch (e) {
                throw e
            }

            return response.data
        },

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

        async activateAccount({ commit }, data) {
            let response;

            try {
                response = await client.post('auth/register/confirm', data)
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