<template>
  <v-menu open-on-hover open-delay="500">
    <template #activator="{ props }">
      <v-card
        v-bind="{ ...props, ...$attrs }"
        flat
        :color="attributes(attendance).color"
        :variant="attributes(attendance).variant"
        class="mr-2  d-flex align-center justify-center"
        height="40"
        style="user-select: none"
        width="40"
        v-if="Array.isArray(student.attendances)"
        >{{ day }}</v-card
      >
    </template>
    <v-card width="380" class="pa-3 rounded-lg" style="user-select: none">
      <div>
        <div class="d-flex" v-if="attendances.length > 0" v-for="attendance in attendances">
          <v-col
            class="d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse"
          >
            Time in
            <span class="font-weight-medium">
              {{ timeIn(attendance) }}
            </span>
          </v-col>
          <v-col
            class="d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse"
            >Time out
            <span class="font-weight-medium">
              {{ timeOut(attendance) }}
            </span>
          </v-col>
          <v-col
            class="d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse"
            >Work time
            <span class="font-weight-medium">
              {{ workTime(attendance) }}
            </span>
          </v-col>
        </div>
        <div v-else class="d-flex">
          <v-col
            class="d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse"
          >
            Time in
            <span class="font-weight-medium">
              {{ timeIn(attendance) }}
            </span>
          </v-col>
          <v-col
            class="d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse"
            >Time out
            <span class="font-weight-medium">
              {{ timeOut(attendance) }}
            </span>
          </v-col>
          <v-col
            class="d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse"
            >Work time
            <span class="font-weight-medium">
              {{ workTime(attendance) }}
            </span>
          </v-col>
        </div>
      </div>
      <v-divider class="my-1"></v-divider>
      <div class="d-flex text-subtitle-2 align-center justify-sm-space-between">
        <span>
          <v-icon size="23">mdi-clock-outline</v-icon>
          {{ date(attendance) }}
        </span>
        <v-chip
          :color="
            status(attendance) == 'absent'
              ? 'error'
              : status(attendance) == 'present'
              ? 'primary'
              : status(attendance) == 'late'
              ? 'warning'
              : status(attendance) == 'event' ? 'green' : 'grey'
          "
          class="text-capitalize"
          size="small"
          >{{ status(attendance) }}</v-chip
        >
      </div>
    </v-card>
  </v-menu>
</template>
<script lang="ts">
export default {
  inheritAttrs: true,
};
</script>
<script setup lang="ts">
import { Attendance } from "@/stores/attendance";
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { computed } from "vue";
const { student, } = storeToRefs(useStudentStore());
const props = defineProps<{ day: number, month: number }>();
const attendances = computed(() => student.value.attendances.filter(
    (item) => new Date(item.created_at).getDate() == props.day && new Date(item.created_at).getMonth() == props.month
))
const attendance = computed(() =>{
  return student.value.attendances.find(
    (item) => new Date(item.created_at).getDate() == props.day && new Date(item.created_at).getMonth() == props.month
  )}
);

const date = computed(() => (attendance: Attendance | undefined) =>
  attendance ? new Date(attendance.created_at).toDateString() : "-- -- --"
);

const attributes: any = computed(() => (attendance: Attendance | undefined) => {
  if (attendance) {
    if (attendance.is_absent) {
      return { variant: "elevated", color: "error" };
    } else if (attendance.policy && attendance.time_out) {
      return { variant: "elevated", color: "warning" };
    }else if(attendance.is_event){
      return { variant: "elevated", color: "green" };
    }
    else if (!attendance.time_in || !attendance.time_out && !attendance.is_event) {
      return { variant: "outlined", color: "primary" };
    }  else {
      return { variant: "elevated", color: "primary" };
    }
  }
  return { variant: "outlined", color: "primary" };
});

const timeIn = computed(() => (attendance: Attendance | undefined) =>
  attendance && attendance.time_in
    ? new Date(attendance.time_in).toLocaleTimeString()
    : "--"
);
const timeOut = computed(() => (attendance: Attendance | undefined) =>
  attendance && attendance.time_out
    ? new Date(attendance.time_out).toLocaleTimeString()
    : "--"
);
const workTime = computed(() => (attendance: Attendance | undefined) =>
  attendance && attendance.time_in && attendance.time_out
    ? parseInt(attendance.work_time).toFixed(0) + "h"
    : "--"
);
const status = computed(() => (attendance: Attendance | undefined) =>
  attendance?.is_absent
    ? "absent"
    : attendance?.policy
    ? "late"
    : attendance?.time_in && attendance.time_out
    ? "present"
    : attendance?.is_event ? 'event' : "pending"
);


</script>

<style scoped></style>
