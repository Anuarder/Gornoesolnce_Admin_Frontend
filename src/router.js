import store from '@/store';
import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Auth/Login.vue'

import Main from './views/Main.vue'
import Home from './views/Home.vue'
import Apartments from './views/Apartments.vue'
import Personal from './views/Personal.vue'
import Requests from './views/Requests.vue'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/main',
            redirect: '/home',
            component: Main,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/apartments',
                    name: 'apartments',
                    component: Apartments
                },
                {
                    path: '/personal',
                    name: 'personal',
                    component: Personal
                },
                {
                    path: '/requests',
                    name: 'requests',
                    component: Requests
                },
            ],
            meta: {
				requaresAuth: true,
			},
        }
    ]
});

router.beforeEach((to, from, next) => {
	const requaresAuth = to.matched.some(record => record.meta.requaresAuth);
    const currentUser = store.state.token;
    const isTimeOver = store.state.tokenEXP < Math.floor(new Date().getTime() / 1000);
	if (requaresAuth && !currentUser) {
		next('/login');
	} else if (requaresAuth && currentUser) {
        if(isTimeOver){
            next('/login');
        }
		next();
	} else {
		next();
	}
});

export default router;