<template>
  <v-container class="h-100" v-if="student">
    <v-row>
      <v-col cols="3">
        <v-avatar size="240" color="grey-lighten-4 rounded-xl">
          <v-img :src="student.image"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="px-5 pt-5">
        <v-card class="d-flex stretch mb-4" flat>
          <div class="mt-3 align-end w-100 d-flex">
            <div>
              <h1 class="">{{ student.first_name + " " + student.last_name }}</h1>
              <h4 class="font-weight-regular">OJT Student</h4>
            </div>
          </div>
          <v-menu location="bottom left" :close-on-content-click="false">
            <template #activator="{ props }">
              <v-btn class="mx-2" icon="mdi-dots-horizontal" v-bind="props"></v-btn>
            </template>
            <v-card width="325" class="rounded-lg pa-2 px-4 mr-5">
              <v-list>
                <h4>General options</h4>
                <v-list-item
                  @click="enter"
                  prepend-icon="mdi-login"
                  :disabled="
                    (student.attendance && student.attendance.time_in) ||
                    (student.attendance && student.attendance.is_absent)
                  "
                  >Enter</v-list-item
                >
                <v-list-item
                  @click="absent"
                  prepend-icon="mdi-close"
                  :disabled="
                    (student.attendance && student.attendance.time_in) ||
                    (student.attendance && student.attendance.is_absent)
                  "
                  >Absent</v-list-item
                >
                <v-list-item
                  @click="leave(student.id, student.attendance.id)"
                  prepend-icon="mdi-logout"
                  :disabled="
                    !student.attendance || (student.attendance &&
                      student.attendance.time_in &&
                      student.attendance.time_out) ||
                    (student.attendance && student.attendance.is_absent)
                  "
                  >Leave</v-list-item
                >
                <h4>Other</h4>
                <v-list-item prepend-icon="mdi-book-open-outline" @click="showManualAttendanceDialog = true"
                  >Manual Attendance</v-list-item
                >
                <v-list-item prepend-icon="mdi-trash-can-outline"
                  >Permanent Delete</v-list-item
                >
              </v-list>
            </v-card>
          </v-menu>
        </v-card>
        <VProgressLinear
          height="35"
          color="primary"
          :model-value="remainingPercent"
          class="bg-grey-lighten-3 text-subtitle-1 my-5 text-capitalize text-grey-darken-2"
          >Time Remaining {{ workTimeTotal() }}/550h</VProgressLinear
        >
        <v-row>
          <v-col>
            <v-card flat class="pa-5 align-center d-flex rounded-lg">
              <v-icon size="60">mdi-clock-in</v-icon>
              <div class="px-5">
                <h4>Time in</h4>
                <h3>{{ timeIn }}</h3>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card flat class="pa-5 align-center d-flex rounded-lg">
              <v-icon size="60">mdi-clock-out</v-icon>
              <div class="px-5">
                <h4>Time out</h4>
                <h3>{{ timeOut }}</h3>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card flat class="pa-5 align-center d-flex rounded-lg">
              <v-icon size="60">mdi-update</v-icon>
              <div class="px-5">
                <h4>Work time</h4>
                <h3 class="d-flex">
                  {{ workTime }}
                  <span
                    class="text-red text-subtitle-2 d-flex align-center pl-2"
                    v-if="
                      student.attendance &&
                      student.attendance.policy &&
                      student.attendance.time_out
                    "
                  >
                    -{{ parseInt(student.attendance.late_time).toFixed(2) || 0 }}h
                  </span>
                </h3>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <nav class="d-flex">
      <v-tabs class="mt-4">
        <v-tab
          color="primary"
          value="index"
          @click="$router.push({ name: 'ShowStudent.index' })"
          class="text-capitalize"
          >Overview</v-tab
        >
        <v-tab
          color="primary"
          value="information"
          @click="$router.push({ name: 'ShowStudent.information' })"
          class="text-capitalize"
          >Information</v-tab
        >
      </v-tabs>
    </nav>
    <div class="py-5">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback> loading... </template>
        </Suspense>
      </RouterView>
    </div>
    <ShowPolicyDialog
      @allow="enterWithPolicy"
      @deny="enter"
      v-model:show-policy-confirmation="showPolicyConfirmation"
      :is-loading="isLoading"
    ></ShowPolicyDialog>
    <ManualAttendanceDialog
      v-model:show-dialog="showManualAttendanceDialog"
    ></ManualAttendanceDialog>
  </v-container>
</template>

<script setup lang="ts">
import ManualAttendanceDialog from "@/components/ManualAttendanceDialog.vue";
import ShowPolicyDialog from "@/components/ShowPolicyDialog.vue";
import useStudent from "@/composables/useStudent";
import useAttendance from "@/composables/useAttedance";
import { storeToRefs } from "pinia";
import { useStudentStore } from "../../stores/student";
import { computed } from "vue";
import { useAttendanceStore } from "@/stores/attendance";
import { useRoute } from "vue-router";
import { ref } from "vue";
const $attendance = useAttendanceStore();
const { student, workTimeTotal } = storeToRefs(useStudentStore());
const { timeIn, timeOut, workTime } = useStudent(student);
const route = useRoute();
const showManualAttendanceDialog = ref(true);
const remainingPercent = computed(
  // @ts-ignore
  () => (workTimeTotal.value() / 550) * 100
);
$attendance.getAllStudentAttendance(parseInt(route.params.student_id.toString()));
const {
  enter,
  absent,
  leave,
  enterWithPolicy,
  isLoading,
  showPolicyConfirmation,
} = useAttendance(student.value);
</script>

<style scoped></style>
