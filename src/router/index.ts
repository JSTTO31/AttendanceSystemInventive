// Composables
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
//@ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';

import { useUserStore } from '@/stores/user'
import { useEventStore } from '@/stores/events';
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      // Home
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {
          title: 'Dashboard',

        }
      },
      // Create
      {
        path: '/student/create',
        name: 'CreateStudent',
        component: () => import(/* webpackChunkName: "student.create" */ '@/views/student/Create.vue'),
        meta: {
          title: 'Student Create',
        }
      },
      // Student Index
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
        },
        meta: {
          title: 'Student Management',

        }
      },
      // Student show
      {
        path: '/student/:student_id',
        name: 'ShowStudent',
        //@ts-ignore
        redirect: {name: 'ShowStudent.index'},
         component: () => import('@/views/student/Show.vue'),
        //@ts-ignore
        beforeEnter: (to, from, next) => {
          const $student = useStudentStore()
          //@ts-ignore
          $student.get(to.params.student_id).then(() => {
            return next();
          })
        },
        meta: {
          title: 'Student Information',

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
          {
            path: 'courses',
            name: 'ShowStudent.courses',
            component: () => import('@/views/student/show/Course.vue'),
          },
        ]
      },
      {
        path: '/attendance',
        name: 'attendanceIndex',
        component: () => import('@/views/attendance/Index.vue'),
        meta: {
          title: 'Attendance Overview',

        },
      },
      {
        path: '/schedule',
        name: 'schedule',
        //@ts-ignore
        component: () => import('@/views/Schedule.vue'),
        meta: {
          title: 'Schedule',
        },
        //@ts-ignore
        beforeEnter: (to, from, next) => {
          const $event = useEventStore()
          $event.getEvents().then(() => next()).catch(() => next({name: 'Home'}))
        },
        children: [
          {
            path: '',
            name: 'ScheduleIndex',
            component: () => import('@/views/schedule/Index.vue'),
          },
          {
            path: '/events/show/:event_id',
            name: 'ScheduleShow',
            component: () => import('@/views/schedule/Show.vue'),
            //@ts-ignore
            beforeEnter(to, from ,next){
              const {event, events} = storeToRefs(useEventStore())
              const $event = useEventStore()
              const exists = events.value.find(item => item.id == to.params.event_id)

              if(exists){
                event.value = exists;
                return next()
              }



              $event.getEvent(to.params.event_id).then((response: any) => {
                if(response.data){
                  event.value = response.data
                  next()
                }else{
                  return next({name: 'ScheduleIndex'})
                }
              }).catch((error) => next({name: 'ScheduleIndex'}))
            }
          },
        ]
      }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Login
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: {guest: true}
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.afterEach(() => {
  nprogress.done()
})


router.beforeEach((to, from, next) => {
  nprogress.configure({
    speed: 400,
    trickleSpeed: 500,
    showSpinner: false
  })
  nprogress.start();
  const {isLoging} = storeToRefs(useUserStore())

  if(to.meta.requiresAuth && !isLoging.value){
    console.log('trigger')
    next('/login')
    return
  }

  if(to.meta.guest && isLoging.value){
    next('/')
    return
  }

   next()
})

export default router
