<template>
  <v-dialog
    :model-value="showDialog"
    width="500"
    :fullscreen="mobile"
    scrim="transparent"
    @click:outside="emits('update:showDialog', false)"
  >
    <v-card v-if="!interceptEvent" :disabled="isLoading" style="overflow: visible !important;" class="pa-5" >
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-book-open-outline</v-icon>
        Manual Attendance</v-card-title
      >
      <v-card-text class="mt-3">
        <v-row>
          <v-col cols="12" class="py-0">
            <h4 class="">Attendance Time</h4>
          </v-col>
          <v-col cols="12" md="6">
            <div>
              <label for="from">Time in:</label>
              <VueDatePicker
                :timezone="'Asia/Manila'"
                :dark="current.dark"
                @closed="followDate('time_in')"
                :clearable="false"
                v-model="attendance.time_in"
                :flow="['hours', 'minutes']"
                id="from"
                auto-apply
              ></VueDatePicker>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div>
              <label for="to">Time out:</label>
              <VueDatePicker
                :timezone="'Asia/Manila'"
                :dark="current.dark"
                @closed="followDate('time_out')"
                :flow="['hours', 'minutes']"
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
              <v-col class="px-5">
                {{ option.label }}
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-6 mt-2">
        <v-btn
          color="primary"
          variant="elevated"
          @click.stop="submit"
          :loading="isLoading"
          >Save</v-btn
        >
        <v-btn @click="emits('update:showDialog', false)">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="remove" :disabled="!exists" color="error" prepend-icon="mdi-trash-can">Delete</v-btn>
      </v-card-actions>
      <v-menu :close-on-content-click="false">
        <template #activator="{props}">
          <v-btn
            v-bind="props"
            icon="mdi-cogs"
            variant="text"
            class="ma-1"
            color="grey-darken-3"
            style="position: absolute; top: 15px; right: 15px"
          ></v-btn>
        </template>
        <v-card width="350" class="rounded-lg py-5 px-8" flat>
          <v-list >
            <h3>Settings</h3>
            <v-divider class="my-2"></v-divider>
            <v-list-item class="px-0 pr-5 text-subtitle-1 font-weight-medium">
              <template #append>
                <v-switch color="primary" hide-details density="compact" v-model="attendance.allow_relogin"></v-switch>
              </template>
              Allow re-enter
            </v-list-item>
            <v-list-item class="px-0 pr-5 text-subtitle-1 font-weight-medium">
              <template #append>
                <v-switch color="primary" hide-details density="compact" v-model="attendance.break"></v-switch>
              </template>
              Break
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-card>
    <v-card v-else :disabled="isLoading">
      <v-card-text>
        <v-card-title class="d-flex px-0 align-center">
        <v-icon class="mr-2">mdi-calendar-alert</v-icon>
        Event Intercept</v-card-title
      >
          <p>
            It's seems the selected date has event, you can't modify this attendance unless you remove it. Do you want to remove it?
          </p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="removeAttendee" :loading="isLoading">Remove</v-btn>
            <v-btn @click="emits('update:showDialog', false)">no</v-btn>
          </v-card-actions>
      </v-card-text>
      <v-btn
        icon="mdi-close"
        variant="text"
        class="ma-1"
        size="small"
        @click="emits('update:showDialog', false)"
        style="position: absolute; top: 15px; right: 15px"
      ></v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
//@ts-ignore
import useManual from "@/composables/useManual";
import { useAppStore } from "@/stores/app";
import { useAttendanceStore } from "@/stores/attendance";
import { useCourseStore } from "@/stores/course";
import { useStudentStore } from "@/stores/student";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useDisplay, useTheme } from "vuetify/lib/framework.mjs";
const {mobile} = useDisplay()
const $course = useCourseStore()
const {current} = useTheme()
const { student } = storeToRefs(useStudentStore());
const { students } = storeToRefs(useAppStore());
const $attendance = useAttendanceStore();
const props = defineProps(["showDialog", "start_at"]);
const emits = defineEmits(["update:showDialog"]);
const { attendance, enablePolicy, isLoading, options, followDate, exists } = useManual(
  props.start_at
);
const interceptEvent = computed(() => {
  if(student.value.attendances.length < 1){
    return false
  }

  return student.value.attendances.find(item => {
    const attendanceDate = new Date(item.created_at)
    const currentDate = new Date(props.start_at)
    return attendanceDate.toDateString() == currentDate.toDateString() && item.is_event
  })
})
const submit = () => {
  isLoading.value = true;
  $attendance.manual(student.value.id, attendance.value).then(() => {
    isLoading.value = false;
    emits("update:showDialog", false);
  });
};
const remove = () => {
  isLoading.value = true;

  $attendance.manual_remove(student.value.id, attendance.value).then(() => {
    isLoading.value = false;
    emits("update:showDialog", false);
  });
}
const removeAttendee = () => {
  if(!interceptEvent.value){
    return
  }
  isLoading.value = true;
  $course.remove_attendee(interceptEvent.value.course_id, student.value.id).then((response) => {
    //@ts-ignore
    students.value = students.value.map(item => item.id == student.value.id ? {...item, attendances: item.attendances.filter(item => item.course_id != interceptEvent.value.course_id || !item.course_id)} : item)
    //@ts-ignore
    student.value.attendances = student.value.attendances.filter(item => item.course_id != interceptEvent.value.course_id || !item.course_id)

    emits('update:showDialog', false)

  });
}

</script>

<style scoped></style>
