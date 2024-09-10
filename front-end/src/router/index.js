import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useGlobalStore } from '@/stroes/useGlobalStore';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'index',
            path: '/',
            component: AppLayout,
            redirect: '/users',
            children: [
                {
                    path: '/users',
                    name: 'users',
                    component: () => import('@/views/users/UserList.vue')
                }
            ]
        },
        {
            path: '/pages',
            name: 'pages',
            children: [
                {
                    path: 'notfound',
                    name: 'notfound',
                    component: () => import('@/views/pages/NotFound.vue')
                }
            ]
        },
        {
            path: '/auth',
            name: 'auth',
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/views/pages/auth/Login.vue')
                },
                {
                    path: 'access',
                    name: 'access',
                    component: () => import('@/views/pages/auth/Access.vue')
                },
                {
                    path: 'error',
                    name: 'error',
                    component: () => import('@/views/pages/auth/Error.vue')
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const store = useGlobalStore();
    if (to.name !== 'login' && !store.isLogin) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
