<template>
  <div class="mt-5 h-100 px-5">
    <v-card class="h-100" flat>
      <div class="d-flex align-center mb-2 justify-space-between">
        <v-btn flat class="rounded-0" icon="mdi-chevron-left"></v-btn>
        <span class="d-flex align-end font-weight-bold text-grey-darken-3">
          <v-icon class="mr-2">mdi-calendar</v-icon>
          June 2023
        </span>
        <v-btn flat class="rounded-0" icon="mdi-chevron-right"></v-btn>
      </div>
      <!-- <div class="w-50">
        <v-card  class="d-flex align-center justify-center flex-column pa-4 rounded-lg" flat>
          <h3 class="font-weight-regular mb-4">Time Remaining</h3>
          <VProgressCircular color="warning" size="85" :model-value="50" width="8" class="">550h</VProgressCircular>
        </v-card>
      </div> -->
      <div >
        <v-card flat color="grey-lighten-4 rounded-0 pa-2">
          <v-row>
            <v-col class="text-center">Date</v-col>
            <v-col class="text-center">Time in</v-col>
            <v-col class="text-center">Time out</v-col>
            <v-col class="text-center">Status</v-col>
          </v-row>
        </v-card>
        <v-card flat class="py-4 rounded-0" v-if="student.attendance">
          <v-row>
            <v-col class="text-center">{{ new Date(student.attendance.created_at).toDateString() }}</v-col>
            <v-col class="text-center">{{ timeIn }}</v-col>
            <v-col class="text-center">{{ timeIn}}</v-col>
            <v-col class="text-center">
              {{ student.is_absent }}
              <v-chip color="success" prepend-icon="mdi-check" v-if="!student.is_absent">Present</v-chip>
              <v-chip color="error" prepend-icon="mdi-close" v-else>Absent</v-chip>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const {student} = storeToRefs(useStudentStore())
const timeIn = computed(() => !student.value.attendance.time_in ? '--' : new Date(student.value.attendance.time_in).toLocaleTimeString())

</script>

<style scoped>

</style>
