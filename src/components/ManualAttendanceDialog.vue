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
                @closed="followDate('time_in')"
                :clearable="false"
                v-model="attendance.time_in"
                id="from"
                auto-apply
              ></VueDatePicker>
            </div>
          </v-col>
          <v-col>
            <div>
              <label for="to">Time out:</label>
              <VueDatePicker
                @closed="followDate('time_out')"
                :clearable="false"
                v-model="attendance.time_out"
                id="to"
                auto-apply
              ></VueDatePicker>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <h4 class="mb-1">Attendance Options</h4>
            <v-card
              :key="option.value"
              :disabled="option.value == 'policy' && !enablePolicy"
              v-for="option in options"
              @click="attendance.option = option.value"
              variant="outlined"
              class="mb-2 d-flex align-center rounded-lg border text-black"
              :color="option.color"
              flat
            >
              <v-col cols="1">
                <v-radio
                  v-model="attendance.option"
                  hide-details
                  :value="option.value"
                  density="compact"
                ></v-radio>
              </v-col>
              <v-col class="text-black px-5">
                {{ option.label }}
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-4">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="elevated"
          @click.stop="submit"
          :loading="isLoading"
          >Save</v-btn
        >
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
import useManual from "@/composables/useManual";
import { useAttendanceStore } from "@/stores/attendance";
import { useStudentStore } from "@/stores/student";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";
const { student } = storeToRefs(useStudentStore());
const $attendance = useAttendanceStore();
const props = defineProps(["showDialog", "start_at"]);
const emits = defineEmits(["update:showDialog"]);
const { attendance, enablePolicy, isLoading, options, followDate } = useManual(
  props.start_at
);

const submit = () => {
  isLoading.value = true;
  $attendance.manual(student.value.id, attendance.value).then(() => {
    isLoading.value = false;
    emits("update:showDialog", false);
  });
};
</script>

<style scoped></style>
