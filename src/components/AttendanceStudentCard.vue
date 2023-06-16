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
          variant="text"
          @click.stop="enter"
          >Enter</v-btn
        >
        <v-btn
          prepend-icon="mdi-close"
          variant="text"
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
    <ShowPolicyDialogVue @allow="enterWithPolicy" @deny="enter" :is-loading="isLoading" v-model:show-policy-confirmation="showPolicyConfirmation" :student="student"></ShowPolicyDialogVue>
  </v-card>
</template>

<script setup lang="ts">
import ShowPolicyDialogVue from './ShowPolicyDialog.vue';
import useAttendance from '@/composables/useAttedance'
import { Student } from "@/stores/student";
const props = defineProps<{ student: Student; rail: boolean }>();
const {enter, absent, leave, enterWithPolicy, isLoading, showPolicyConfirmation} = useAttendance(props.student)
</script>

<style scoped></style>
