// Composables
import { useAppStore } from '@/stores/app'
import { useAttendanceStore } from '@/stores/attendance'
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
        component: () => import('@/views/student/Create.vue'),

      },
      {
        path: '/student',
        name: 'IndexStudent',
         component: () => import('@/views/student/Index.vue'),
        //@ts-ignore
         beforeEnter: (to, from, next) => {
           const query = to.fullPath.match(/\?.*/ig)
           const $student = useStudentStore()
           $student.getAll(query ? query : '').then(() => {
            return next()
           })
        }
      },
      {
        path: '/student/:student_id',
        name: 'ShowStudent',
        //@ts-ignore
        redirect: {name: 'ShowStudent.index'},
         component: () => import('@/views/student/Show.vue'),
        //@ts-ignore
        beforeEnter: (to, from, next) => {
          const {students, student} = storeToRefs(useStudentStore())
          const studentExists = students.value.find(item => item.id == to.params.student_id)
          if(studentExists){
            student.value = studentExists
            return next()
          }

          const $student = useStudentStore()

          $student.get(to.params.student_id).then(() => {
            return next();
          })

        },
        children: [
          {
            path: '',
            name: 'ShowStudent.index',
            component: () => import('@/views/student/show/Index.vue'),
          },
          {
            path: 'information',
            name: 'ShowStudent.information',
            component: () => import('@/views/student/show/Information.vue'),
          },
        ]
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
  scrollBehavior(to, from, savedPosition){
    return {top: 0}
  }
})

router.afterEach(() => {
  const {isLoading} = storeToRefs(useAppStore())
  isLoading.value = false

})


router.beforeEach((to, from, next) => {
  const {isLoading} = storeToRefs(useAppStore())
  isLoading.value = true
  // const {isLoging} = storeToRefs(useUserStore())

  // if(to.meta.requiresAuth && !isLoging.value){
  //   next({name: 'Login'})
  // }

  // if(to.meta.guest && isLoging.value){
  //   next('/')

  // }

   next()
})

export default router
