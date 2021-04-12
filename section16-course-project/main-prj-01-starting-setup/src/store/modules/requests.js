import requestMutations from './requests/mutations.js';
import requestActions from './requests/actions.js';
import requestGetters from './requests/getters.js';


const coaches = {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: requestMutations,
    actions: requestActions,
    getters: requestGetters,
}

export default coaches;