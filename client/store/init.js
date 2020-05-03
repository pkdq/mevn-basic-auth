import auth from '@store/modules/auth'

const initStore = (store) => {
    store.registerModule('auth', auth)
}

export default initStore