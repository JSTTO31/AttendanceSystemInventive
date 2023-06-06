// Composables
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: {guest: true}

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const {isLoging} = storeToRefs(useUserStore())

  if(to.meta.requiresAuth && !isLoging.value){
    next({name: 'Login'})
  }

  if(to.meta.guest && isLoging.value){
    next('/')

  }

  return next()
})

export default router
