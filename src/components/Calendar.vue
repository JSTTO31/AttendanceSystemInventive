<template>
  <v-card class="pa-5" v-if="student.attendances">
    <div class="d-flex align-center ">
      <h3><v-icon class="mr-3">mdi-calendar</v-icon>{{ monthsName[getMonth] }} {{ getFullYear }}</h3>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-chevron-left" class="rounded-lg mr-2" flat color="black" variant="text"></v-btn>
      <v-btn icon="mdi-chevron-right" class="rounded-lg" flat color="black" variant="text"></v-btn>
    </div>
    <v-card  class="d-flex pl-1 mt-1 align-start flex-wrap  h-100 mb-5"  flat>
      <CalendarBoxDayVue :status="'absent'" v-for="day in daysInMonth" :key="day" :day="day"></CalendarBoxDayVue>
      <v-card variant="outlined" class="mr-2 my-2 d-flex align-center justify-center" height="51" color="grey" width="51" v-for="z in 34-daysInMonth" :key="z" disabled></v-card>
    </v-card>
    <div v-if="student.attendances.length > 0">
      <h3 class="mb-2">Attendance History</h3>
      <v-table hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time in</th>
            <th>Time out</th>
            <th>Work time</th>
          </tr>
        </thead>
        <tbody>
          <AttendanceListItem v-for="attendance in student.attendances.slice(page - 1 * perPage)" :key="attendance.id" :attendance="attendance"></AttendanceListItem>
        </tbody>
      </v-table>
    </div>
    <div class="w-100 align-center mt-5 d-flex" v-if="page_total > 1">
      Page {{page}} / {{ page_total }}
      <v-spacer></v-spacer>
      <v-pagination :length="page_total" color="primary" v-model="page"></v-pagination>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import AttendanceListItem from './AttendanceListItem.vue';
import { storeToRefs } from 'pinia';
import CalendarBoxDayVue from './CalendarBoxDay.vue';
import { useStudentStore } from '@/stores/student';
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
const {student} = storeToRefs(useStudentStore())
const monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// const props = defineProps();
const now = new Date();
const daysInMonth = new Date(now.getMonth() + 1, now.getFullYear(), 0).getDate()
const getMonth = now.getMonth()
const getFullYear = now.getFullYear()
const {students} = storeToRefs(useStudentStore())
const page = ref(1)
const perPage = 10
let page_total = computed(() => Math.ceil((student.value.attendances?.length || 0)  / perPage))
// const 
// const paginatedAttendance = computed
</script>

<style scoped>

</style>
