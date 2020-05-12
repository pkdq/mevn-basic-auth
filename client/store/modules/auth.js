import client from '@utils/axios'

export default {
    namespaced: true,

    state: {
        user: null,
        token: null
    },

    getters: {
        isAuthenticated: state => !!state.token && !!state.user,
        user: state => state.user
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },

        SET_USER(state, user) {
            state.user = user
        },
    },

    actions: {

        logout({ commit }) {
            try {
                localStorage.removeItem('token')
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
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

        async loginUser({ dispatch }, data) {
            let response;

            try {
                response = await  client.post('auth/login', data)

                return dispatch('attempt', response.data.token)
            } catch (e) {
                throw e
            }
        },

        async attempt({ state, commit }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }

            if (!state.token) {
                return
            }

            let response;

            try {
                response = await client.get('auth/user')

                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_USER', null)
                commit('SET_TOKEN', null)
            }

            return response
        },

        async activateAccount({ commit }, data) {
            let response;

            try {
                response = await client.post('auth/register/confirm', data)
                localStorage.setItem('token', JSON.stringify(response.data.token))
                commit('SET_USER', response.data.user)
                commit('SET_TOKEN', response.data.token)
            } catch (e) {
                throw e
            }

            return response.data
        },

        async registerUser({ commit }, data) {
            let response;

            try {
                response = await client.post('auth/register', data)
                localStorage.setItem('token', JSON.stringify(response.data.token))
                commit('SET_USER', response.data.user)
                commit('SET_TOKEN', response.data.token)
            } catch (e) {
                throw e
            }            

            return response.data
        }
    }
}