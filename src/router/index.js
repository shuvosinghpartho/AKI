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
    path: '/upload-csv',
    name: 'UploadCSVFile',
    component: () => import('../views/UploadCSVFile.vue')
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
  },
  {
    path: '/process',
    name: 'PREPROCESSING',
    component: () => import('../views/ProcessView.vue')
  },
  {
    path: '/training',
    name: 'Training',
    component: () => import('../views/TrainingView.vue')
  },
  {
    path: '/predict',
    name: 'Predict',
    component: () => import('../views/PredictView.vue')
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: () => import('../views/SubscriptionView.vue')
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: () => import('../views/UserProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
