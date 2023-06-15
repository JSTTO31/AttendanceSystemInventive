<template>
  <v-card
    :key="student.email"
    class="d-flex flex-column justify-center align-center rounded-xl"
    :class="rail ? 'ma-1 my-5' : 'mb-5 pa-5 py-10'"
    @click="$router.push({ name: 'ShowStudent', params: { student_id: student.id } })"
    flat
  >
    <v-tooltip v-if="rail" activator="parent" location="start">{{
      student.first_name + " " + student.last_name
    }}</v-tooltip>
    <v-avatar :size="rail ? 40 : 125" class="bg-grey-lighten-4">
      <v-img :src="student.image"></v-img>
    </v-avatar>
    <v-card-text class="text-center" v-if="!rail">
      <h2>{{ `${student.first_name} ${student.last_name}` }}</h2>
      <h5 class="font-weight-regular">{{ student.email }}</h5>
    </v-card-text>
    <div v-if="!rail">
      <v-card-actions
        class="w-100 d-flex align-center justify-center"
        v-if="!student.attendance"
      >
        <v-btn
          prepend-icon="mdi-login"
          color="primary"
          variant="outlined"
          @click.stop="enter"
          >Enter</v-btn
        >
        <v-btn
          prepend-icon="mdi-close"
          variant="outlined"
          color="error"
          @click.stop="absent"
          >Absent</v-btn
        >
      </v-card-actions>
      <v-card-actions
        class="w-100 d-flex align-center px-12 justify-center"
        v-else-if="
          (student.attendance && student.attendance.is_absent) ||
          (!!student.attendance.time_in && !!student.attendance.time_out)
        "
      >
        <v-chip
          size="large"
          variant="text"
          color="primary"
          prepend-icon="mdi-check"
          class="w-100 text-capitalize"
          style="font-style: italic"
          >end proccess</v-chip
        >
      </v-card-actions>
      <v-card-actions v-else-if="!!student.attendance.time_in" class="w-100">
        <v-btn
          color="error"
          variant="elevated"
          @click.stop="leave(student.id, student.attendance.id)"
          prepend-icon="mdi-logout"
          block
          v-if="student.attendance.time_in"
          >Leave</v-btn
        >
      </v-card-actions>
      <v-card-actions v-else class="w-100 px-10"> </v-card-actions>
    </div>
    <v-overlay
      :model-value="isLoading"
      contained
      class="d-flex align-center justify-center"
      @click.stop=""
      scrim="grey-lighten-4"
      persistent
    >
      <v-progress-circular indeterminate color="primary" size="45"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="showPolicyConfirmation" persistent width="350">
      <v-card>
        <v-card-text>
          <h4 class="mb-3 text-warning d-flex align-center">
            <v-icon class="mr-1">mdi-information-outline</v-icon>Policy Alert
            <v-spacer></v-spacer>
          </h4>
          <h4 class="text-grey-darken-4">
            Do you want apply the policy on this student?
          </h4>
          <!-- <v-alert variant="tonal" type="info" class="mt-2" density="compact">
            This will show every 9:16 above.
          </v-alert> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="elevated"
            flat
            density="compact"
            color="primary"
            @click="enterWithPolicy"
            >Yes</v-btn
          >
          <v-btn variant="elevated" @click="enter" flat density="compact">No</v-btn>
        </v-card-actions>
        <v-btn
          icon="mdi-close"
          variant="text"
          class="ma-1"
          size="small"
          @click="showPolicyConfirmation = false"
          style="position: absolute; top: 0; right: 0"
        ></v-btn>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { useAttendanceStore } from "@/stores/attendance";
import { Student, useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const props = defineProps<{ student: Student; rail: boolean }>();
const $attendance = useAttendanceStore();
const isLoading = ref(false);
const showPolicyConfirmation = ref(false);
const enter = () => {
  const currentTime = new Date();
  const now = new Date();
  now.setHours(9);
  now.setMinutes(15);

  if (currentTime > now && !showPolicyConfirmation.value) {
    showPolicyConfirmation.value = true;

    return;
  }

  isLoading.value = true;
  $attendance.enter(props.student.id).then(() => {
    isLoading.value = false;
    showPolicyConfirmation.value = false;
  });
};
const leave = (student_id: number, attendance_id: number) => {
  isLoading.value = true;
  $attendance.leave(student_id, attendance_id).then(() => {
    isLoading.value = false;
  });
};
const absent = () => {
  isLoading.value = true;
  $attendance.absent(props.student.id).then(() => {
    isLoading.value = false;
  });
};
const enterWithPolicy = () => {
  isLoading.value = true;
  $attendance.enterWithPolicy(props.student.id).then(() => {
    isLoading.value = false;
    showPolicyConfirmation.value = false;
  });
};
</script>

<style scoped></style>
