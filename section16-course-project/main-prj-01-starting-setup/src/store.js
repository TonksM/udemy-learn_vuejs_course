import { createStore } from 'vuex';

import coachesModule from './store/modules/coaches.js'
import requestsModule from './store/modules/requests.js'
import authModule from './store/modules/auth.js'

import rootGetters from "./store/getters.js";

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
        auth: authModule,
    },
    getters: rootGetters
})

export default store;