<template>
  <v-card
    :key="student.email"
    class="d-flex flex-column justify-center align-center  rounded-xl "
    :class="rail ? 'ma-1 my-5' : 'mb-5 pa-5 py-10'"
    @click.stop=""
    :to="{name: 'ShowStudent', params: {student_id: student.id}}"
    flat
  >
  <v-tooltip
  v-if="rail"
        activator="parent"
        location="start"
      >{{ student.first_name + ' ' + student.last_name }}</v-tooltip>
    <v-avatar :size="rail ? 40: 125" class="bg-grey-lighten-4">
      <v-img :src="student.image"></v-img>
    </v-avatar>
    <v-card-text class="text-center" v-if="!rail">
      <h2>{{ `${student.first_name} ${student.last_name}` }}</h2>
      <h5 class="font-weight-regular">{{ student.email }}</h5>
    </v-card-text>
   <div v-if="!rail">

    <v-card-actions class="w-100 d-flex align-center justify-center" v-if="!student.attendance">
      <v-btn prepend-icon="mdi-check" color="primary" variant="outlined" @click="enter">Present</v-btn>
      <v-btn prepend-icon="mdi-close" variant="outlined" color="error" @click="absent">Absent</v-btn>
    </v-card-actions>
    <v-card-actions class="w-100 d-flex align-center px-12 justify-center" v-else-if="student.attendance && student.attendance.is_absent || !!student.attendance.time_in && !!student.attendance.time_out">
      <v-chip @click.prevent size="large" variant="text" color="primary" prepend-icon="mdi-check" class="w-100 text-capitalize" style="font-style: italic;">end proccess</v-chip>
    </v-card-actions>
    <v-card-actions v-else-if="!!student.attendance.time_in" class="w-100">
      <v-btn color="error"  variant="elevated" @click="leave(student.id, student.attendance.id)" prepend-icon="mdi-logout" block v-if="student.attendance.time_in ">Leave</v-btn>
    </v-card-actions>
    <v-card-actions v-else class="w-100 px-10">
    </v-card-actions>
   </div>
    <v-overlay :model-value="isLoading" contained class="d-flex align-center justify-center" @click.stop="" scrim="grey-lighten-4" persistent>
      <v-progress-circular indeterminate color="primary" size="45"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script setup lang="ts">
import { useAttendanceStore } from '@/stores/attendance';
import { Student } from '@/stores/student';
import { ref } from 'vue';
const props = defineProps<{student: Student, rail: boolean}>()
const $attendance = useAttendanceStore()
const isLoading = ref(false)
const enter = () => {
  isLoading.value = true
  $attendance.enter(props.student.id).then(() => {
    isLoading.value = false
  })
}
const leave = (student_id: number, attendance_id: number) => {
  isLoading.value = true
  $attendance.leave(student_id, attendance_id).then(() => {
    isLoading.value = false
  })
}
const absent = () => {
  isLoading.value = true
  $attendance.absent(props.student.id).then(() => {
    isLoading.value = false
  })
}

</script>

<style scoped>

</style>