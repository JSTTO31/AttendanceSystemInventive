<template>
  <v-dialog
    :model-value="showDialog"
    :width="mobile ? 'auto' : 500"
    :fullscreen="mobile"
    @click:outside="emits('update:showDialog', false)"
  >
    <v-card v-if="!interceptEvent" :disabled="isLoading" style="overflow: visible !important;" class="pa-5 rounded-lg" >
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
      <v-menu :close-on-content-click="false" location="bottom right">
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
    <v-card v-else :disabled="isLoading" class="rounded-lg">
      <v-card-text>
        <v-card-title class="d-flex px-0 align-center">
        Event Intercept</v-card-title
      >
          <p>
            It's seems the selected date has event, you can't modify this attendance unless you remove it. Do you want to remove it?
          </p>
      </v-card-text>
      <v-card-actions class="bg-grey-lighten-4">
        <v-spacer></v-spacer>
        <v-btn size="small" variant="elevated" color="primary" @click="removeAttendee" :loading="isLoading">Remove</v-btn>
        <v-btn size="small" variant="elevated" @click="emits('update:showDialog', false)">no</v-btn>
      </v-card-actions>
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
import useStudent from "@/composables/useStudent";
import { useAppStore } from "@/stores/app";
import { useAttendanceStore } from "@/stores/attendance";
import { useEventStore } from "@/stores/events";
import { useStudentStore } from "@/stores/student";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useDisplay, useTheme } from "vuetify/lib/framework.mjs";
const router=  useRouter()
const $event = useEventStore()
const {mobile} = useDisplay()
const {current} = useTheme()
const { student, students } = storeToRefs(useStudentStore());
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
     //@ts-ignore
    const event_date_start = new Date(item.event?.date_time.event_date_start || 0)
    event_date_start.setHours(0)
    event_date_start.setMinutes(0)
    event_date_start.setSeconds(0)
    event_date_start.setMilliseconds(0)
    //@ts-ignore
    const event_date_end = new Date(item.event?.date_time.event_date_end || 0)
    event_date_end.setHours(0)
    event_date_end.setMinutes(0)
    event_date_end.setSeconds(0)
    event_date_end.setMilliseconds(0)
    const date = new Date(props.start_at)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return (item.is_event && event_date_start.getTime() <= date.getTime() && event_date_end.getTime() >= date.getTime())
  })
})


const submit = () => {
  isLoading.value = true;
  $attendance.manual(student.value.id, attendance.value).then(() => {
    isLoading.value = false;
    emits("update:showDialog", false);
      const {students} = storeToRefs(useAppStore())
      const exists = students.value.find(item => item.id == student.value.id)
      if(exists){
        const studentRef = ref(exists)
        const {work_time_total} = useStudent(studentRef)
        if(work_time_total.value.hours >= parseInt(student.value.remaining)){
          router.push({query: {type: 'completed', name: student.value.first_name + ' ' + student.value.last_name}})
        }
      }
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
  //@ts-ignore
  $event.removeAttendee(interceptEvent.value.event.id, student.value.id).then((response) => {
    emits('update:showDialog', false)
    setTimeout(() => {
      //@ts-ignore
      students.value = students.value.map(item => item.id == student.value.id ? {...item, attendances: item.attendances.filter(item => item.event_id != interceptEvent.value.event_id || !item.event_id)} : item)
      //@ts-ignore
      student.value.attendances = student.value.attendances.filter(item => item.event_id != interceptEvent.value.event_id || !item.event_id)
    }, 500);
  });
}

</script>

<style scoped></style>
