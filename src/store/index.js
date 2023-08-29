import { createStore } from 'vuex'
import config from './modules/config'
import auth from './modules/auth'

export default createStore({
    namespaced: true,
    modules: {
        config,
        auth
    },
});