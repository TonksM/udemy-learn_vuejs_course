import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachReg from './pages/coaches/CoachReg.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachContact from './pages/requests/ContactCoach.vue';
import CoachRequests from './pages/requests/RequestsReceived.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        { path: '/coach/register', component: CoachReg },
        {
            path: '/coaches/:id', 
            component: CoachDetails, 
            props: true, 
            children: [
                { path: 'contact', component: CoachContact }
            ]
        },
        { path: '/requests-received', component: CoachRequests }
    ],
    scrollBehavior(_1, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { left: 0, top: 0 }
    }
})

export default router;