<template>
  <div v-if="courses.length > 0">
    <TransitionGroup name="slide">
      <CourseListItem v-for="course in courses" :key="course.id" :course="course"></CourseListItem>
    </TransitionGroup>
  </div>
  <div class="pt-15 d-flex justify-center" v-else>
    <h3>No courses taken</h3>
  </div>
</template>

<script setup lang="ts">
import CourseListItem from '../../../components/CourseListItem.vue'
import { useCourseStore } from '@/stores/course';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const {courses} = storeToRefs(useCourseStore())
const $course = useCourseStore()
const route = useRoute()
//@ts-ignore
$course.getAll(route.params.student_id)
</script>

<style scoped>
.slide-enter-active, .slide-leave-active{
  transition: transform .15s ease-in-out, opacity .05s linear;
} 
.slide-enter-from, .slide-leave-to{
  transform: translateX(-10%);
  opacity: 0;
} 
</style>
