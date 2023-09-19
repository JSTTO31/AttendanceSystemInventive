<template>
  <v-container class="d-flex flex-column h-100 px-2 px-md-8 py-5">
    <v-row>
      <v-col cols="12" md="5">
        <v-card class="h-100 d-flex justify-center align-center pa-5 pt-10 rounded-lg border" flat>
          <VProgressCircular :model-value="(presents / students.length * 100)" size="120" width="9" color="primary"  class="text-h4 font-weight-regular mb-5">{{(presents / students.length * 100).toFixed(0) }}%</VProgressCircular>
          <div class="ml-5">
            <h1 class="font-weight-medium text-grey-darken-3">Attendances</h1>
            <h4 class="font-weight-light text-grey-darken-1">{{ presents }} students out of {{ students.length }}</h4>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <AttendanceLineChart class="h-100 pa-5 d-flex justify-center flex-column align-center  rounded-lg border"></AttendanceLineChart>
      </v-col>
      <!-- <v-col v-for="student in students" :key="student.id">
        <v-card class="h-100 border rounded-lg py-5 d-flex flex-column align-center" flat>
          <v-avatar size="140">
            <v-img :src="student.image"></v-img>
          </v-avatar>
          <div style="line-height: 1.1;" class="mt-2">
            <h3 class="px-5 text-grey-darken-3 pt-2 text-center text-capitalize">{{ student.first_name }} {{ student.last_name }}</h3>
            <h5 class="px-5 text-grey-darken-3 font-weight-regular pt-2 text-center text-capitalize">{{ student.position }}</h5>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex align-cenre justify-center">
            <v-btn rounded size="small" class="mx-1" color="primary" flat>Present</v-btn>
            <v-btn rounded size="small" class="mx-1" flat>Absent</v-btn>
          </div>
        </v-card>
      </v-col> -->
    </v-row>
    <v-row class="h-100">
      <v-col cols="12">
        <AttendanceCalendarWeeklyVue></AttendanceCalendarWeeklyVue>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AttendanceCalendarWeeklyVue from '@/components/AttendanceCalendarWeekly.vue';
import AttendanceLineChart from '@/components/AttedanceLineChart.vue'
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import {useAttendanceStore} from '@/stores/attendance'
import { computed } from 'vue';
const {students } = storeToRefs(useAppStore())
const $attendance = useAttendanceStore()
const {today_attendances} = storeToRefs(useAttendanceStore())
$attendance.getAll();

const presents = computed(() => {
  let count = 0;
  students.value.forEach((student) => {
    let isPresent = today_attendances.value.some(item => item.student_id == student.id && item.time_in)
    if(isPresent){
      count++
    }
  })
  return count;
})





</script>

<style scoped>
</style>
