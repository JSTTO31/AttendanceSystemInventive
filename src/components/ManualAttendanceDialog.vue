<template>
  <v-dialog
    :model-value="showDialog"
    width="500"
    @click:outside="emits('update:showDialog', false)"
  >
    <div class="rounded-lg bg-white pa-5">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-book-open-outline</v-icon>
        Manual Attendance</v-card-title
      >
      <v-card-text class="mt-3">
        <v-row>
          <v-col>
            <div>
              <label for="from">Time in:</label>
              <VueDatePicker
                :clearable="false"
                :alt-position="() : any =>({right: -20, top: -50})"
                v-model="attendance.time_in"
                id="from"
                auto-apply
                partial-flow
                :flow="['calendar', 'month', 'year', 'time']"
              ></VueDatePicker>
            </div>
          </v-col>
          <v-col>
            <div>
              <label for="to">Time out:</label>
              <VueDatePicker
                :clearable="false"
                :alt-position="() : any =>({right: -20, top: -50})"
                v-model="attendance.time_out"
                id="to"
                auto-apply
                partial-flow
                :flow="['calendar', 'month', 'year', 'time']"
              ></VueDatePicker>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <h4 class="mb-1">Attendance Options </h4>
            <v-card :key="option.value" :disabled="option.value == 'policy' && !enablePolicy" v-for="option in options" @click="attendance.option = option.value" variant="outlined"  class="mb-2 d-flex align-center rounded-lg border text-black" :color="option.color" flat>
              <v-col cols="1">
                <v-radio v-model="attendance.option" hide-details :value="option.value" density="compact"></v-radio>
              </v-col>
              <v-col class="text-black px-5">
                {{option.label}}
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="elevated" @click="$attendance.manual(attendance)">Save</v-btn>
        <v-btn @click="emits('update:showDialog', false)">No</v-btn>
      </v-card-actions>
      <v-btn
        icon="mdi-close"
        variant="text"
        class="ma-1"
        size="small"
        @click="emits('update:showDialog', false)"
        style="position: absolute; top: 0; right: 0"
      ></v-btn>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
//@ts-ignore
import { useAttendanceStore } from "@/stores/attendance";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { computed } from "vue";
import { reactive, ref } from "vue";
const $attendance = useAttendanceStore()
const props = defineProps(["showDialog"]);
const emits = defineEmits(["update:showDialog"]);
const timeStart = new Date()
timeStart.setHours(9)
timeStart.setMinutes(16)
const timeEnd = new Date()
timeEnd.setHours(18)
const attendance = reactive({
  time_in: timeStart,
  time_out: timeEnd,
  option: 'present',
})

const enablePolicy = computed(() => {
  const timeLimit = new Date()
  timeLimit.setHours(9)
  timeLimit.setMinutes(15)
  if(timeLimit < attendance.time_in){
    return true
  }
  return false
})

let options = [
  {
    value: 'present',
    label: 'Present',
    color: 'primary'
  },
  {
    value: 'absent',
    label: 'Absent',
    color: 'error'
  },
  {
    value: 'policy',
    label: 'Present with policy',
    color: 'warning'
  },
]

</script>

<style scoped></style>
