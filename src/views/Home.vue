<template>
  <v-container class="px-8 py-5">
      <v-row align-content="stretch">
        <v-col cols="12" md="8" class="d-flex flex-column">
          <div class="d-flex">
            <v-card flat class="border d-flex align-center rounded-lg pa-5 w-100">
              <VProgressCircular :model-value="remainingPercentage" size="85" width="5" class="text-h5" color="primary">{{remainingPercentage}}%</VProgressCircular>
              <div class="px-5">
                <h2 class="font-weight-medium">Remaining</h2>
                <h4 class="font-weight-light">All students remaining</h4>
              </div>
            </v-card>
            <span class="mx-2"></span>
            <v-card flat class="border d-flex align-center rounded-lg pa-5 w-100">
              <VProgressCircular model-value="90" size="85" width="5" color="primary"  class="text-h5">90%</VProgressCircular>
              <div class="px-5">
                <h2 class="font-weight-medium">Attendance</h2>
                <h4 class="font-weight-light">4 students out of 10</h4>
              </div>
            </v-card>
          </div>
          <div class="h-100 pt-5">
            <v-card flat class="border h-100 rounded-lg pa-5 py-8 d-flex justify-center flex-column align-center">
              <ChartBar :chart-data="chartData"></ChartBar>
            </v-card>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="h-100  d-flex flex-column">
          <v-card flat class="pa-5  rounded-lg border h-25">
            <div class="mb-2 d-flex align-center">
              <h4 class="font-weight-bold">Upcoming Events</h4>
              <v-spacer></v-spacer>
              <v-btn @click="$router.push({name: 'ScheduleIndex'})" size="small" append-icon="mdi-chevron-right" variant="text" class="text-capitalize">More Events</v-btn>
            </div>
            <v-card v-for="event in events" flat @click="$router.push({name: 'ScheduleShow', params: {event_id: event.id}})" style="border-color: #615dec !important" class="pa-4 bg-grey-lighten-5 border-s-xl rounded-lg mb-2" :key="event.id">
              <h5 class="text-subtitle-1 font-weight-medium">{{ event.title }}</h5>
              <h6 class="text-caption">{{ new Date(event.date_time.event_date_start).toDateString() }} | {{ event.date_time.event_time_start.replace(':00', '') }}{{ event.date_time.event_time_start == event.date_time.event_time_end ? '' : ' - ' + event.date_time.event_time_end.replace(':00', '') }}</h6>
            </v-card>
          </v-card>
          <v-card flat class="pa-5  rounded-lg border mt-5 h-75">
            <div class="d-flex mb-2 align-center">
              <h4 class="text-md-subtitle-1 font-weight-medium">All students</h4>
              <v-spacer></v-spacer>
              <v-btn size="small" @click="$router.push({name: 'IndexStudent'})" flat color="transparent" append-icon="mdi-chevron-right" class="text-capitalize">See more students</v-btn>
            </div>
            <v-card @click="$router.push({name: 'ShowStudent', params: {student_id: student.id}})" flat class="border-b align-center d-flex py-2" v-for="student in students" :key="student.id" :student="student">
              <v-avatar size="55">
                <v-img :src="student.image"></v-img>
              </v-avatar>
              <div class="d-flex flex-column justify-center ml-4">
                <h5 class="text-capitalize font-weight-medium">{{ student.first_name }} {{student.last_name}}</h5>
                <h6 class="text-capitalize font-weight-medium text-grey-darken-1">{{ student.position }}</h6>
              </div>
              <v-spacer></v-spacer>
              <v-chip size="small" class="px-2 text-capitalize" :color="status(student) == 'absent' ? 'error' : status(student) == 'late' ? 'warning' : status(student) == 'present' ? 'success' : '#615dec'">{{ status(student) }}</v-chip>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {useEventStore} from '@/stores/events'
import {computed} from 'vue'
import ChartBar from '@/components/ChartBar.vue';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import { useDisplay, useTheme } from 'vuetify/lib/framework.mjs';
import { Student } from '@/stores/student';
const {mobile} = useDisplay()
const {current} = useTheme()
const {students, number_of_students, remaining} = storeToRefs(useAppStore())
const remainingPercentage = computed(() => Math.abs((100 -(number_of_students.value / remaining.value * 100))).toFixed(0))
const chartData : any = computed(() => ({
    labels: students.value.map(item => item.first_name.length > 10 ? item.first_name.substring(0, 10) + '...' : item.first_name),
    datasets: [
      {
        data: students.value.map(item => item.work_time_total?.toFixed(0) || 0),
        backgroundColor: [current.value.colors.primary, current.value.colors.primary, current.value.colors.primary],
        borderRadius: 5,
        barThickness: mobile.value ? 35 : 65,
      }
    ]
}))

const status = computed(() => (student: Student) => {
  if(!student.attendance){
    return 'pending'
  }
    return student.attendance.is_absent ? 'absent' : student.attendance.late_time != null ? 'late' : student.attendance.is_event ? 'event' : 'present'
})

const $event = useEventStore()
const {events} = storeToRefs($event)
$event.getEvents()
</script>
