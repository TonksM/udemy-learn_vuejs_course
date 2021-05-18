import authMutations from './auth/mutations.js';
import authActions from './auth/actions.js';
import authGetters from './auth/getters.js';


const auth = {
    namespaced: false,
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false
        };
    },
    mutations: authMutations,
    actions: authActions,
    getters: authGetters,
}

export default auth;