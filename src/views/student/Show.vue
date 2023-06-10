<template>
   <v-container class="h-100" v-if="student">
    <v-row>
      <v-col cols="3">
        <v-card class="pa-5 align-center flex-column d-flex rounded-lg h-100">
            <v-progress-circular color="primary" width="20"  :model-value="45" size="200">
              <div class="px-5 text-center text-grey-darken-3">
                <h1>{{ student.remaining }}h</h1>
                <h4 class="mt-n2">Remaining</h4>
              </div>
            </v-progress-circular>
          </v-card>
      </v-col>
      <v-col>
        <v-card class="d-flex align-end mb-4" flat>
          <v-avatar size="125" color="grey-lighten-4 rounded-lg">
            <v-img :src="student.image"></v-img>
          </v-avatar>
          <div class="mt-3 w-100 px-5 d-flex">
            <div>
              <h1 class="">{{ student.first_name + ' ' + student.last_name }}</h1>
              <h4 class=" font-weight-regular">Student OJT</h4>
            </div>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" class="mx-2" color="primary" @click="enter">Present</v-btn>
            <v-btn variant="outlined" class="mx-2" color="error" @click="absent()">Absent</v-btn>
          </div>
        </v-card>
        <v-row>
        <v-col>
          <v-card class="pa-5 align-center d-flex rounded-lg">
            <v-icon size="60">mdi-clock-in</v-icon>
            <div class="px-5">
              <h4 >Time in</h4>
              <h3>{{ timeIn}}</h3>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-5 align-center d-flex rounded-lg">
            <v-icon size="60">mdi-clock-out</v-icon>
            <div class="px-5">
              <h4 >Time out</h4>
              <h3>{{ timeOut}}</h3>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-5 align-center d-flex rounded-lg">
            <v-icon size="60">mdi-update</v-icon>
            <div class="px-5">
              <h4 >work time</h4>
              <h3>{{workTime}}</h3>
            </div>
          </v-card>
        </v-col>
      </v-row>
      </v-col>
    </v-row>
    <nav class="d-flex pt-5">
      <v-tabs class="mt-4">
        <v-tab color="primary" class="text-capitalize">Overview</v-tab>
        <v-tab color="primary" class="text-capitalize">Courses</v-tab>
        <v-tab color="primary" class="text-capitalize">Information</v-tab>
      </v-tabs>
    </nav>
    <div class="py-5">
      <CalendarVue></CalendarVue>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import CalendarVue from '@/components/Calendar.vue';
import { storeToRefs } from 'pinia';
import {useStudentStore} from '../../stores/student'
import { computed } from 'vue';
import { useAttendanceStore } from '@/stores/attendance';
const $attendance = useAttendanceStore()
const {student} = storeToRefs(useStudentStore())
const timeIn = computed(() => student.value.attendance && student.value.attendance.time_in ?  new Date(student.value.attendance.time_in).toLocaleTimeString('en-us', {minute: '2-digit', hour: '2-digit'}) : '--')
const timeOut = computed(() => student.value.attendance && student.value.attendance.time_out ?  new Date(student.value.attendance.time_out).toLocaleTimeString('en-us', {minute: '2-digit', hour: '2-digit'}) : '--')
const workTime = computed(() => student.value.attendance && student.value.attendance.time_in && student.value.attendance.time_out ? student.value.attendance.work_time + 'h' : '--')
const isLoading  = ref(false)
const enter = () => {
  isLoading.value = true
  $attendance.enter(student.value.id).then(() => {
    isLoading.value = false
  })
}
const leave = () => {
  isLoading.value = true
  $attendance.leave(student.value.id, student.value.attendance.id).then(() => {
    isLoading.value = false
  })
}
const absent = () => {
  isLoading.value = true
  $attendance.absent(student.value.id).then(() => {
    isLoading.value = false
  })
}

</script>

<style scoped>

</style>
