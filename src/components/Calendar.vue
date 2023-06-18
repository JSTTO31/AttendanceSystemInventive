<template>
  <v-card class="pa-5 border" v-if="student.attendances" flat>
    <div class="d-flex align-center">
      <h3>
        <v-icon class="mr-3">mdi-calendar</v-icon>{{ monthsName[getMonth] }}
        {{ getFullYear }}
      </h3>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-chevron-left"
        class="rounded-lg mr-2"
        flat
        color="black"
        variant="text"
      ></v-btn>
      <v-btn
        icon="mdi-chevron-right"
        class="rounded-lg"
        flat
        color="black"
        variant="text"
      ></v-btn>
    </div>
    <v-card class="d-flex pl-1 mt-1 align-start flex-wrap h-100 mb-5" flat>
      <CalendarBoxDayVue
        :status="'absent'"
        v-for="day in daysInMonth"
        :key="day"
        :day="day"
        @click="setStartAt(day)"
      ></CalendarBoxDayVue>
      <!-- <v-card variant="outlined" class="mr-2 my-2 d-flex align-center justify-center" height="51" color="grey" width="51" v-for="z in 34-daysInMonth" :key="z" disabled></v-card> -->
      <ManualAttendanceDialog
        :start_at="start_at"
        :key="start_at"
        v-model:show-dialog="showManualDialog"
      ></ManualAttendanceDialog>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import CalendarBoxDayVue from "./CalendarBoxDay.vue";
import { useStudentStore } from "@/stores/student";
import { ref } from "vue";
import ManualAttendanceDialog from "./ManualAttendanceDialog.vue";
import { watch } from "vue";
const { student } = storeToRefs(useStudentStore());
const start_at = ref();
const showManualDialog = ref(false);
const monthsName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// const props = defineProps();
const now = new Date();
const daysInMonth = new Date(now.getMonth() + 1, now.getFullYear(), 0).getDate();
const getMonth = now.getMonth();
const getFullYear = now.getFullYear();
const setStartAt = (day: number) => {
  const newDate = new Date();
  newDate.setDate(day);
  start_at.value = newDate;
};
watch(
  () => start_at.value,
  () => {
    showManualDialog.value = true;
  }
);
</script>

<style scoped></style>
