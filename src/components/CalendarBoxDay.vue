<template>
  <v-menu open-on-hover open-delay="500">
    <template #activator="{ props }">
      <v-card
        v-bind="{ ...props, ...$attrs }"
        flat
        :color="attributes.color"
        :variant="attributes.variant"
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
        <div class="d-flex">
          <v-col
            class="d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse"
          >
            Time in
            <span class="font-weight-medium">
              {{ timeIn }}
            </span>
          </v-col>
          <v-col
            class="d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse"
            >Time out
            <span class="font-weight-medium">
              {{ timeOut }}
            </span>
          </v-col>
          <v-col
            class="d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse"
            >Work time
            <span class="font-weight-medium">
              {{ workTime }}
            </span>
          </v-col>
        </div>
      </div>
      <v-divider class="my-1"></v-divider>
      <div class="d-flex text-subtitle-2 align-center justify-sm-space-between">
        <span>
          <v-icon size="23">mdi-clock-outline</v-icon>
          {{ date }}
        </span>
        <v-chip
          :color="
            status == 'absent'
              ? 'error'
              : status == 'present'
              ? 'primary'
              : status == 'late'
              ? 'warning'
              : status == 'event' ? 'green' : 'grey'
          "
          class="text-capitalize"
          size="small"
          >{{ status }}</v-chip
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
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { computed } from "vue";

const { student, } = storeToRefs(useStudentStore());
const props = defineProps<{ day: number, month: number }>();
const attendance = computed(() =>{
  return student.value.attendances.find(
    (item) => new Date(item.created_at).getDate() == props.day && new Date(item.created_at).getMonth() == props.month
  )}
);
const date = computed(() =>
  attendance.value ? new Date(attendance.value.created_at).toDateString() : "-- -- --"
);
const attributes: any = computed(() => {
  if (attendance.value) {
    if (attendance.value.is_absent) {
      return { variant: "elevated", color: "error" };
    } else if (attendance.value.policy && attendance.value.time_out) {
      return { variant: "elevated", color: "warning" };
    }else if(attendance.value.is_event){
      return { variant: "elevated", color: "green" };
    }
    else if (!attendance.value.time_in || !attendance.value.time_out && !attendance.value.is_event) {
      return { variant: "outlined", color: "primary" };
    }  else {
      return { variant: "elevated", color: "primary" };
    }
  }
  return { variant: "outlined", color: "primary" };
});

const timeIn = computed(() =>
  attendance.value && attendance.value.time_in
    ? new Date(attendance.value.time_in).toLocaleTimeString()
    : "--"
);
const timeOut = computed(() =>
  attendance.value && attendance.value.time_out
    ? new Date(attendance.value.time_out).toLocaleTimeString()
    : "--"
);
const workTime = computed(() =>
  attendance.value && attendance.value.time_in && attendance.value.time_out
    ? parseInt(attendance.value.work_time).toFixed(0) + "h"
    : "--"
);
const status = computed(() =>
  attendance.value?.is_absent
    ? "absent"
    : attendance.value?.policy
    ? "late"
    : attendance.value?.time_in && attendance.value.time_out
    ? "present"
    : attendance.value?.is_event ? 'event' : "pending"
);

</script>

<style scoped></style>
