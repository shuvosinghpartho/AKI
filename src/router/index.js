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
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/data-processing',
    name: 'DataProcessing',
    component: () => import('../views/DataProcessingView.vue')
  },
  {
    path: '/cleaning',
    name: 'Cleaning',
    component: () => import('../views/CleaningView.vue')
  },
  {
    path: '/filtering',
    name: 'Filtering',
    component: () => import('../views/FilteringView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
