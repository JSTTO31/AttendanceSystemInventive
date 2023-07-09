// Composables
import { useAppStore } from '@/stores/app'
import { useCategoryStore } from '@/stores/category'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '@/views/PageNotFound.vue'
//@ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';
import { useUserStore } from '@/stores/user'
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
      },
      // Create
      {
        path: '/student/create',
        name: 'CreateStudent',
        component: () => import(/* webpackChunkName: "student.create" */ '@/views/student/Create.vue'),

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
        children: [
          {
            path: '',
            name: 'ShowStudent.index',
            component: () => import(/* webpackChunkName: "student_index" */ '@/views/student/show/Index.vue'),
          },
          {
            path: 'information',
            name: 'ShowStudent.information',
            component: () => import(/* webpackChunkName: "student_information */ '@/views/student/show/Information.vue'),
          },
          {
            path: 'courses',
            name: 'ShowStudent.courses',
            component: () => import(/* webpackChunkName: "student_course" */  '@/views/student/show/Course.vue'),
          },
        ]
      },
      // Course
      {
        path: '/course',
        component: () => import('@/views/Course.vue'),
        name: 'Course',
        redirect: {name: 'IndexCourse'},
        //@ts-ignore
        beforeEnter: (to, from, next) => {
          const $category = useCategoryStore()
          const {categories} = storeToRefs(useCategoryStore())

          if(categories.value.length > 0){
            return next()
          }

          return $category.getAll().then(() => {
            next()
          })
        },
        children: [
          {
            path: '',
            component: () => import('@/views/course/Index.vue'),
            name: 'IndexCourse',
          },
          {
            path: 'category/:category_id',
            component: () => import('@/views/course/Category.vue'),
            name: 'CategoryCourse',
            //@ts-ignore
            beforeEnter: (to, from, next) => {
              const {category, categories} = storeToRefs(useCategoryStore())
              const categoryExists = categories.value.find(item => item.id == to.params.category_id)
              if(!categoryExists){
                return next({name: 'IndexCourse'})
              }

              category.value = categoryExists
              next()
            },
            children: [
              {
                path: 'sub-category/:sub_category_id/course/:course_id/add-attendees',
                component: () => import('@/views/course/AddAttendees.vue'),
                //@ts-ignore
                props: (route) => {
                  const {category} = storeToRefs(useCategoryStore())
                  return {course: category.value.sub_categories.find(item => item.id == route.params.sub_category_id)?.courses.find(item => item.id == route.params.course_id)}
                },
                name: 'AddAttendeesCourse'
              }
            ]
          }
        ]
      },
      // Category
      {
        path: '/category',
        component: () => import('@/views/category/Index.vue'),
        name: 'IndexCategory',
      },
      // Sub Category
      {
        path: '/sub_category',
        component: () => import('@/views/sub_category/Index.vue'),
        name: 'IndexSubCategory',
      },
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
  // { path: "*", component: PageNotFound }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(){
    return {top: 0}
  }
})

router.afterEach(() => {
  nprogress.done()
})


router.beforeEach((to, from, next) => {
  const {isLoading} = storeToRefs(useAppStore())
  nprogress.configure({
    speed: 400,
    trickleSpeed: 500,
    template: '<div class="bar bg-secondary" style="height: 4px" role="bar"><div class="peg bg-secondary"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
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
