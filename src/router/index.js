import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchResults.vue'),
    props: (route) => ({ query: route.query.q }),
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('../views/Bookmarks.vue'),
  },
  {
    path: '/repo/:owner/:repo',
    name: 'RepoDetail',
    component: () => import('../views/RepoDetail.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
