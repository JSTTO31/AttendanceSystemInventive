<template>
   <v-container class="h-100" v-if="student">
    <v-row >
      <v-col cols="3">
        <v-avatar size="240" color="grey-lighten-4 rounded-xl">
            <v-img :src="student.image"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="px-5 pt-5">
        <v-card class="d-flex stretch mb-4" flat>
          <div class="mt-3 align-end w-100  d-flex">
            <div>
              <h1 class="">{{ student.first_name + ' ' + student.last_name }}</h1>
              <h4 class=" font-weight-regular">OJT Student</h4>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex align-self-start" v-if="student.attendance && student.attendance.time_in && student.attendance.time_out">
              <v-chip
              size="large"
              variant="text"
              color="primary"
              prepend-icon="mdi-check"
              class="w-100 text-capitalize"
              style="font-style: italic"
              >end proccess</v-chip
            >
            </div>
            <div class="d-flex align-self-start" v-else-if="student.attendance && student.attendance.time_in">
              <v-btn class="ml-2" @click="leave" color="error" variant="elevated" prepend-icon="mdi-logout">Leave</v-btn>
            </div>
            <div class="d-flex align-self-start" v-else>
              <!-- <v-btn class="rounded-lg" variant="text" icon="mdi-dots-horizontal"></v-btn> -->
              <v-btn class="ml-2" @click="enter" color="primary" variant="outlined">Present</v-btn>
              <v-btn class="ml-2" @click="absent" color="error" variant="outlined">Absent</v-btn>
            </div>
          </div>
        </v-card>
        <VProgressLinear height="35" color="primary"  :model-value="(student.work_time_total?.toFixed(0) || 0) / 550 * 100" class="text-subtitle-1 my-5  text-capitalize text-grey-darken-2">Time Remaining {{ student.work_time_total?.toFixed(0) || 0 }}/550h</VProgressLinear>
        <v-row>
        <v-col>
          <v-card flat class="pa-5 align-center d-flex rounded-lg">
            <v-icon size="60">mdi-clock-in</v-icon>
            <div class="px-5">
              <h4 >Time in</h4>
              <h3>{{ timeIn}}</h3>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card flat class="pa-5 align-center d-flex rounded-lg">
            <v-icon size="60">mdi-clock-out</v-icon>
            <div class="px-5">
              <h4 >Time out</h4>
              <h3>{{ timeOut}}</h3>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card flat class="pa-5 align-center d-flex rounded-lg">
            <v-icon size="60">mdi-update</v-icon>
            <div class="px-5">
              <h4 >Work time</h4>
              <h3>{{workTime}}</h3>
            </div>
          </v-card>
        </v-col>
      </v-row>
      </v-col>
      <!-- <v-divider vertical class="my-10"></v-divider>
      <v-col cols="4" class="d-flex align-center justify-center ">
        <v-card flat class="pa-5 align-center flex-column d-flex rounded-lg h-100">
            <v-progress-circular color="primary" width="20"  :model-value="45" size="200">
              <div class="px-5 text-center text-grey-darken-3">
                <h1>{{ student.remaining }}h</h1>
                <h4 class="mt-n2">Remaining</h4>
              </div>
            </v-progress-circular>
          </v-card>
      </v-col> -->
    </v-row>
    <nav class="d-flex">
      <v-tabs class="mt-4">
        <v-tab color="primary" class="text-capitalize">Overview</v-tab>
        <v-tab color="primary" class="text-capitalize">Courses</v-tab>
        <v-tab color="primary" class="text-capitalize">Information</v-tab>
      </v-tabs>
    </nav>
    <div class="py-5">
      <RouterView v-slot="{Component}">
        <Suspense>
            <component :is="Component"></component>
            <template #fallback>
              loading...
            </template>
        </Suspense>
      </RouterView>
    </div>
    <LoadingOverlay :show="isLoading"></LoadingOverlay>
  </v-container>
</template>

<script setup lang="ts">
import  LoadingOverlay from '../../components/LoadingOverlay.vue'
import {ref} from 'vue'
import { storeToRefs } from 'pinia';
import {useStudentStore} from '../../stores/student'
import { computed } from 'vue';
import { useAttendanceStore } from '@/stores/attendance';
import { useRoute } from 'vue-router';
const $attendance = useAttendanceStore()
const {student} = storeToRefs(useStudentStore())
const timeIn = computed(() => student.value.attendance && student.value.attendance.time_in ?  new Date(student.value.attendance.time_in).toLocaleTimeString('en-us', {minute: '2-digit', hour: '2-digit'}) : '--')
const timeOut = computed(() => student.value.attendance && student.value.attendance.time_out ?  new Date(student.value.attendance.time_out).toLocaleTimeString('en-us', {minute: '2-digit', hour: '2-digit'}) : '--')
const workTime = computed(() => student.value.attendance && student.value.attendance.time_in && student.value.attendance.time_out ? student.value.attendance.work_time + 'h' : '--')
const isLoading  = ref(false)
const route = useRoute()
$attendance.getAllStudentAttendance(parseInt(route.params.student_id.toString()))

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
