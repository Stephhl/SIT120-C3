import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import SecondPage from '../views/SecondPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/secondpage',
      name: 'secondpage',
      component: SecondPage
    }
  ]
})

export default router
