import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../../screens/Home/Home-screen.vue'),
  },
  {
    path: '/projects',
    component: () => import('../../screens/Projects/Projects-screen.vue'),
  },
  {
    path: '/about',
    component: () => import('../../screens/About/About-screen.vue'),
  },
  {
    path: '/contact',
    component: () => import('../../screens/Contact/Contact-screen.vue'),
  },
  {
    path: '/projecte/:id',
    component: () => import('../../screens/Project/Project-screen.vue'),
  },
  {
    path: '/admin',
    component: () => import('../../screens/Admin/Admin.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../../screens/Dashboard/Dashboard-screen.vue'),
    // beforeEnter: (_: any, from: any) => {
    //   return from.path === '/admin' && document.cookie === 'true';
    // },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 0,
      };
    } else {
      return { left: 0, top: 0 };
    }
  },
});
