<template>
  <v-card class="pa-3 border h-100 rounded-lg" flat>
      <v-card class="pl-1 mt-1 h-100 mb-5" flat>
        <div class="d-flex align-center w-100">
          <h3>
            <v-icon class="mr-3">mdi-calendar</v-icon>{{ monthsName[selectedMonth] }}
            {{ getFullYear }}
          </h3>
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-chevron-left"
            class="rounded-lg mr-2"
            flat
            @click="emits('update:selectedMonth', selectedMonth - 1)"
            :disabled="selectedMonth < 1"
            variant="text"
          ></v-btn>
          <v-btn
            icon="mdi-chevron-right"
            class="rounded-lg"
            flat
            @click="emits('update:selectedMonth', selectedMonth + 1)"
            :disabled="selectedMonth > 10"
            variant="text"
          ></v-btn>
        </div>
        <div class="d-flex flex-wrap justify-space-between">
          <CalendarBoxDayVue
            class="my-2"
            :status="'absent'"
            v-for="day, index in daysInMonth"
            :key="day + index"
            :day="day"
            :month="selectedMonth"
            @dblclick="setStartAt(parseInt(day.toString()))"
            @click.prevent=""
          ></CalendarBoxDayVue>
          <v-spacer></v-spacer>
        </div>
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
import CalendarBoxDayVue from "./CalendarBoxDay.vue";
import ManualAttendanceDialog from "./ManualAttendanceDialog.vue";
import { watch, computed, ref } from "vue";
const showManualDialog = ref(false)
const props = defineProps(['selectedMonth'])
const emits = defineEmits(['update:selectedMonth'])
const start_at : any = ref(new Date());
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
const now = new Date();
const getFullYear = now.getFullYear();
const daysInMonth = computed(() => new Date(getFullYear, props.selectedMonth + 1, 0).getDate())

const setStartAt = (day: number) => {
  const newDate = new Date(now.getFullYear(), props.selectedMonth, day);
  console.log(newDate);

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
