<template>
  <v-card class="pa-5">
    <div class="d-flex align-center ">
      <h2 ><v-icon class="mr-3">mdi-calendar</v-icon>{{ monthsName[getMonth] }} {{ getFullYear }}</h2>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-chevron-left" class="rounded-lg mr-2" flat color="black" variant="text"></v-btn>
      <v-btn icon="mdi-chevron-right" class="rounded-lg" flat color="black" variant="text"></v-btn>
    </div>
    <v-card  class="d-flex pl-1 mt-3 align-start flex-wrap  h-100"  flat>
      <CalendarBoxDayVue :status="'absent'" v-for="day in daysInMonth" :key="day" :day="day"></CalendarBoxDayVue>
      <v-card variant="outlined" class="mr-2 my-2 d-flex align-center justify-center" height="51" color="grey" width="51" v-for="z in 34-daysInMonth" :key="z" disabled></v-card>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import CalendarBoxDayVue from './CalendarBoxDay.vue';
import { useStudentStore } from '@/stores/student';
import { Attendance } from '@/stores/attendance';
const monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// const props = defineProps();
const now = new Date();
const daysInMonth = new Date(now.getMonth() + 1, now.getFullYear(), 0).getDate()
const getMonth = now.getMonth()
const getFullYear = now.getFullYear()
const {students} = storeToRefs(useStudentStore())
// const getStatus = (day: number) => {
//   const currentDay = students.value.attendances.find((item: Attendance) => new Date(item.created_at).getDay() == day)
//   if(currentDay){
//     console.log(currentDay)
//   }
// }
</script>

<style scoped>

</style>
