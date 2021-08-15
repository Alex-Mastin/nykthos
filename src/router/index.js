import { createRouter, createWebHistory } from 'vue-router'
import AppLayoutHome from "../layouts/AppLayoutHome.vue";
import AppLayoutDefault from "../layouts/AppLayoutDefault.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/home/index.vue'),
    meta: { layout: AppLayoutHome, title: 'Home | Nykthos, a deck generator for Tabletop Simulator' }
  },
  {
    path: '/decks',
    name: 'Decks',
    component: () => import('../pages/decks/index.vue'),
    meta: { layout: AppLayoutDefault, title: 'Your Decks | Nykthos, a deck generator for Tabletop Simulator' }
  },
  {
    path: '/decks/new',
    name: 'Deck Redirect',
    component: () => import('../pages/decks/redirect/index.vue'),
    meta: { layout: AppLayoutDefault, title: 'Your Decks | Nykthos, a deck generator for Tabletop Simulator' }
  },
  {
    path: '/decks/:id',
    name: 'Deck',
    component: () => import('../pages/decks/id/index.vue'),
    meta: { layout: AppLayoutDefault }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta && to.meta.title
    ? to.meta.title
    : window.document.title

  next()
})

export default router
