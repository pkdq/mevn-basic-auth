import client from '@utils/axios'

export default {
    namespaced: true,

    state: {
        test: 'Here'
    },

    getters: {},

    mutations: {},

    actions: {
        async registerUser(context, data) {
            let response;

            try {
                response = client.post('auth/register', data)
            } catch (e) {
                throw e
            }

            return response.data
        }
    }
}