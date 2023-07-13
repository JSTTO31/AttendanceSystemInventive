<template>
  <v-container class="h-100 pb-15 pb-md-5" style="overflow-x: hidden;" v-if="student">
    <v-row>
      <v-col cols="3" class="d-flex align-end" v-if="!mobile">
          <ImageCard height="250" :url="student.image" class="rounded-xl bg-grey-lighten-3 w-100" v-model:image="image" :key="student.id"></ImageCard>
      </v-col>
      <v-col class="px-5 pt-5">
        <v-card class="d-flex stretch mb-4 bg-transparent" flat>
          <ImageCard v-if="mobile" height="125" :url="student.image" class="rounded-lg bg-grey-lighten-3 w-75" v-model:image="image" :key="student.id"></ImageCard>
          <div class="mt-3 px-5 px-md-0 align-end w-100 d-flex">
            <div>
              <h1 class="text-md-h3 font-weight-medium " style="text-transform: capitalize !important;">{{ student.first_name + " " + student.last_name }}</h1>
              <h5 class="font-weight-regular text-md-subtitle-1 text-capitalize">{{student.position}}</h5>
            </div>
          </div>
          <v-menu location="bottom left" :close-on-content-click="false">
            <template #activator="{ props }">
              <v-btn v-if="!mobile" :size="mobile ? 'small' : 'default'" class="mx-2" icon="mdi-dots-horizontal" v-bind="props"></v-btn>
            </template>
            <v-card width="325" class="rounded-lg pa-2 px-4 mr-5">
              <v-list>
                <h4>General options</h4>
                <v-list-item
                  @click="enter"
                  prepend-icon="mdi-login"
                  :disabled="
                    (student.attendance && !!student.attendance.time_in) ||
                    (student.attendance && !!student.attendance.is_absent) ||
                    (student.attendance && !!student.attendance.is_event)
                  "
                  >Enter</v-list-item
                >
                <v-list-item
                  @click="absent"
                  prepend-icon="mdi-close"
                  :disabled="
                    (student.attendance && !!student.attendance.time_in) ||
                    (student.attendance && !!student.attendance.is_absent) ||
                    (student.attendance && !!student.attendance.is_event)
                  "
                  >Absent</v-list-item
                >
                <v-list-item
                  @click="leave(student.id, student.attendance.id)"
                  prepend-icon="mdi-logout"
                  :disabled="
                    !student.attendance ||
                    (student.attendance &&
                      !!student.attendance.time_in &&
                      !!student.attendance.time_out) ||
                    (student.attendance && !!student.attendance.is_absent) ||
                    (student.attendance && !!student.attendance.is_event)

                  "
                  >Leave</v-list-item
                >
                <h4>Other</h4>
                <v-list-item
                  prepend-icon="mdi-book-open-outline"
                  @click="showManualAttendanceDialog = true"
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
          height="37"
          :color="remainingPercent >= 100 ? 'secondary' : 'primary'"
          :model-value="remainingPercent"
          class="bg-blue-grey-lighten-1 text-subtitle-1 my-5 text-capitalize font-weight-medium"
          >
            <span v-if="remainingPercent <= 100">Time Remaining {{ workTimeTotal() }}/550h</span>
            <span v-else>
              Completed
            </span>
          </VProgressLinear
        >
        <v-row v-if="!mobile">
          <v-col>
            <v-card flat class="pa-5 bg-transparent align-center d-flex rounded-lg">
              <v-icon size="60">mdi-clock-in</v-icon>
              <div class="px-5">
                <h4>Time in</h4>
                <h3>{{ timeIn }}</h3>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card flat class="pa-5 bg-transparent align-center d-flex rounded-lg">
              <v-icon size="60">mdi-clock-out</v-icon>
              <div class="px-5">
                <h4>Time out</h4>
                <h3>{{ timeOut }}</h3>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card flat class="pa-5 bg-transparent align-center d-flex rounded-lg">
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
                    -{{ parseFloat(student.attendance.late_time).toFixed(2) || 0 }}h
                  </span>
                </h3>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <nav class="d-flex">
      <v-tabs class="mt-1 mt-md-4">
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
        <v-tab
          color="primary"
          value="Courses"
          @click="$router.push({ name: 'ShowStudent.courses' })"
          class="text-capitalize"
          >Courses</v-tab
        >
      </v-tabs>
    </nav>
   <div class="py-5">
      <RouterView v-if="student" v-slot="{ Component }">
        <component :is="Component"></component>
      </RouterView>
    </div>
    <ShowPolicyDialog
      @allow="enterWithPolicy"
      @deny="enter"
      v-model:show-policy-confirmation="showPolicyConfirmation"
      :is-loading="isLoading"
    ></ShowPolicyDialog>
    <!-- <ManualAttendanceDialog
      :start_at="now"
      key="now"
      v-model:show-dialog="showManualAttendanceDialog"
    ></ManualAttendanceDialog> -->
    <v-dialog v-model="showApplyImageDialog" width="300" persistent  scrim="transparent">
      <v-card class="pa-5 rounded-lg">
        <v-card-text class="text-center">
          Do you want to apply it?
          <v-card-actions class="d-flex justify-center mt-1">
            <v-btn size="small" color="primary" @click="applyImage">Apply</v-btn>
            <v-btn size="small" class="" @click="cancelImage">Cancel</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
    <mobileAttendanceActions @manual="showManualAttendanceDialog = true" @enter="enter" @absent="absent" @leave="leave(student.id, student.attendance.id)"></mobileAttendanceActions>
  </v-container>
</template>

<script setup lang="ts">
import mobileAttendanceActions from '@/components/MobileAttendanceActions.vue'
import ImageCard from "@/components/ImageCard.vue";
import ManualAttendanceDialog from "@/components/ManualAttendanceDialog.vue";
import ShowPolicyDialog from "@/components/ShowPolicyDialog.vue";
import useStudent from "@/composables/useStudent";
import useChangeProfile from "@/composables/useChangeProfile";
import useAttendance from "@/composables/useAttedance";
import { storeToRefs } from "pinia";
import { useStudentStore } from "../../stores/student";
import { computed } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
const now = new Date()
const {mobile} = useDisplay()
const $student = useStudentStore()
const showManualAttendanceDialog = ref(false)
const { student, workTimeTotal } = storeToRefs(useStudentStore());
const { timeIn, timeOut, workTime } = useStudent(student);
const {applyImage, cancelImage, image, showApplyImageDialog} = useChangeProfile()
const remainingPercent = computed(
  // @ts-ignore
  () => ((student.value.work_time_total / student.value.remaining) * 100 )
);
const {
  enter,
  absent,
  leave,
  enterWithPolicy,
  isLoading,
  showPolicyConfirmation,
} = useAttendance(student.value);


onBeforeRouteUpdate((to, from, next) => {
  if(to.params.student_id != from.params.student_id){
    $student.get(to.params.student_id)
  }
  next()
})
</script>

<style scoped></style>
