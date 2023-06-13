<template>
  <div>
    <Calendar></Calendar>
  </div>
</template>

<script setup lang="ts">
import Calendar from '@/components/Calendar.vue';
import { useAttendanceStore } from '@/stores/attendance';
import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const {student} = storeToRefs(useStudentStore())
const $attendance = useAttendanceStore()
// const props = defineProps(['student_id'])
const route = useRoute()
$attendance.getAllStudentAttendance(parseInt(route.params.student_id.toString()))
</script>

<style scoped>

</style>