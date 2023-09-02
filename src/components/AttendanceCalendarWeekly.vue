<template>
  <v-card flat class="rounded-lg border h-100">
        <v-card color="primary" class=" text-subtitle-1 font-weight-bold rounded-0">
          <v-row>
            <v-col class="text-center bg-black  pa-5" style="width: 2.714286%;">Name</v-col>
            <v-col class="text-center pa-5" style="width: 1.714286%;" v-for="n in 7" :key="n">{{ getDay(n -1) }}</v-col>
          </v-row>
        </v-card>
        <v-card class="pa-2 rounded-0" flat>
          <v-row v-for="student in students" :key="student.id">
            <v-col class=" font-weight-medium text-capitalize pa-5" style="width: 1.714286%;">{{ student.first_name[0] }}. {{ student.last_name }}</v-col>
            <AttendanceCalendarWeeklyStatusBar v-for="date, n in weekdays" :key="n" :date="date" :student="student"></AttendanceCalendarWeeklyStatusBar>
          </v-row>
        </v-card>
    </v-card>
</template>

<script setup lang="ts">
import AttendanceCalendarWeeklyStatusBar from './AttendanceCalendarWeeklyStatusBar.vue';
import {getDay} from '@/utils'
import { useAppStore } from '@/stores/app';
import { useAttendanceStore } from '@/stores/attendance';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const {weekly_attendances} = storeToRefs(useAttendanceStore())
const {students} = storeToRefs(useAppStore())
const weekdays = computed(() => {
  const start = new Date()
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start)
  end.setDate(end.getDate() + 6)

  const container = []
  while(start <= end){
      //@ts-ignore
      container.push(new Date(start))
      start.setDate(start.getDate() + 1)
  }

  return container
})
</script>

<style scoped>

</style>
