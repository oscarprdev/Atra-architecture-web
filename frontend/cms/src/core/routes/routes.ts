import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../../screens/Home.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../../screens/Dashboard-screen.vue'),
    beforeEnter: (_: any, __: any, next: any) => {
      const referringURL = document.referrer;
      if (referringURL === 'https://atra-architecture.vercel.app/') {
        next();
      } else {
        next('/');
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
