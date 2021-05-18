import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachReg from './pages/coaches/CoachReg.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachContact from './pages/requests/ContactCoach.vue';
import CoachRequests from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';

import store from './store.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        { path: '/coach/register', component: CoachReg, meta: { requiresAuth: true} },
        {
            path: '/coaches/:id', 
            component: CoachDetails, 
            props: true, 
            children: [
                { path: 'contact', component: CoachContact }
            ]
        },
        { path: '/requests-received', component: CoachRequests, meta: { requiresAuth: true} },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true} },
        //{ path: '/404', component: NotFound },
        { path: '/:pathMatch(.*)*', component: NotFound}
    ],
    scrollBehavior(_1, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { left: 0, top: 0 }
    }
});

router.beforeEach( (to, _, next) => {
    if( to.meta.requiresAuth && !store.getters.isAuth) {
        next('/auth');
    } else if ( to.meta.requiresUnauth && store.getters.isAuth ) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;