// Composables
import { useStudentStore } from '@/stores/student'
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
      {
        path: '/student/create',
        name: 'CreateStudent',
        component: () => import('@/views/student/Create.vue')
      },
       {
        path: '/student',
        name: 'IndexStudent',
         component: () => import('@/views/student/Index.vue'),
        //@ts-ignore
         beforeEnter: (to, from, next) => {
           const $student = useStudentStore()
           $student.getAll().then(() => {
          return next()

           })
        }
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
  // const {isLoging} = storeToRefs(useUserStore())

  // if(to.meta.requiresAuth && !isLoging.value){
  //   next({name: 'Login'})
  // }

  // if(to.meta.guest && isLoging.value){
  //   next('/')

  // }

  return next()
})

export default router
