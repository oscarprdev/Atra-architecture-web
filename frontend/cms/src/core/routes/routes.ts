import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/dashboard',
    component: () => import('../../screens/Dashboard/Dashboard-screen.vue'),
    beforeEnter: (_: any, from: any, next: any) => {
      if (from.fullPath === 'http://localhost:1234/admin') {
        next();
      }
    }
  }
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
        top: 0
      };
    } else {
      return { left: 0, top: 0 };
    }
  }
});
