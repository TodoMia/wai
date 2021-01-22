import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/user'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/uploadm',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Uploadm.vue'),
                    meta: { title: '明文转密文' }
                },
                {
                    path: '/uploadj',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Uploadj.vue'),
                    meta: { title: '明文转密文' }
                },
                {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/User.vue'),
                    meta: { title: '个人中心' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
