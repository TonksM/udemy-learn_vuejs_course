import { createStore } from 'vuex';

import coachesModule from './store/modules/coaches.js'
import requestsModule from './store/modules/requests.js'

import rootGetters from "./store/getters.js";

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule
    },
    state() {
        return {
            userId: 'c3'
        };
    },
    getters: rootGetters
})

export default store;