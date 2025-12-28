import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignInView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
