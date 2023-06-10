<template>
  <v-card
        class="d-flex align-center pa-2 border-b"
        flat
        :to="{name: 'ShowStudent', params: {student_id: student.id}}"
      >
        <v-row>
          <v-col class="d-flex align-center" cols="4">
            <v-avatar size="65">
              <v-img :src="student.image"></v-img>
            </v-avatar>
            <div class="ml-4">
              <h4>{{ student.first_name + " " + student.last_name }}</h4>
              <h5 class="font-weight-regular">{{ student.email }}</h5>
            </div>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"></span> {{ timeIn}}
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"></span> {{timeOut}}
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"></span> {{ workTime}}
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"></span> {{ parseInt(student.remaining).toFixed(0) + 'h'}}
          </v-col>
        </v-row>
      </v-card>
</template>

<script setup lang="ts">
import { Student } from '@/stores/student';
import { computed } from 'vue';
const props = defineProps<{student: Student}>()
const timeIn = computed(() => props.student.attendance && props.student.attendance.time_in ?  new Date(props.student.attendance.time_in).toLocaleTimeString() : '--')
const timeOut = computed(() => props.student.attendance && props.student.attendance.time_out ?  new Date(props.student.attendance.time_out).toLocaleTimeString() : '--')
const workTime = computed(() => props.student.attendance && props.student.attendance.time_in && props.student.attendance.time_out ? parseInt(props.student.attendance.work_time).toFixed(0) + 'h' : '--')
</script>

<style scoped>

</style>
