import { createStore } from 'vuex';

import coachesModule from './store/modules/coaches.js'
import requestsModule from './store/modules/requests.js'

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule
    }
})

export default store;