<template>
  <v-card
    :key="student.email"
    class="d-flex flex-column justify-center align-center bg-transparent"
    :class="rail && !mobile ? 'ma-1 my-5' : 'mb-5 pa-5'"
    flat
    style="overflow: visible;"
    >
    <v-menu location="left center">
      <template #activator="{props}">
        <v-badge :icon="icon" offset-x="5" offset-y="5" :color="color" location="bottom right">
          <v-avatar v-bind="props" style="cursor: pointer;" :size="rail && !mobile ? 45 : 195"  class="bg-grey-lighten-4 border">
            <v-img :src="student.image"></v-img>
          </v-avatar>
        </v-badge>
      </template>
      <v-card width="280" class="mr-3 rounded-lg" >
        <v-card flat @click="$router.push({ name: 'ShowStudent', params: { student_id: student.id } })" class="d-flex pa-5 align-center">
          <v-badge :icon="icon" :color="color" location="bottom right" offset-x="5" offset-y="5">
            <v-avatar v-bind="props" style="cursor: pointer;" :size="60"  class="bg-grey-lighten-4 border">
              <v-img :src="student.image"></v-img>
            </v-avatar>
          </v-badge>
          <div class="ml-3">
            <h4 class="text-capitalize">{{ student.first_name }} {{ student.last_name }}</h4>
            <h6 class="font-weight-regular">{{ student.position }}</h6>
          </div>
        </v-card>
        <v-divider></v-divider>
        <div class="d-flex" v-if="!student.attendance">
          <v-btn size="small" class="w-50 pa-5 d-flex" flat prepend-icon="mdi-account-check" @click="enter">Present</v-btn>
          <v-btn size="small" class="w-50 pa-5 d-flex" flat prepend-icon="mdi-account-remove" @click="absent">Absent</v-btn>
        </div>
        <div class="d-flex" v-else-if="student.attendance && !student.attendance.time_out && !student.attendance.is_absent">
          <v-btn size="small" class="w-50 pa-5 d-flex" block flat prepend-icon="mdi-logout" @click="leave(student.id, student.attendance.id)">Leave</v-btn>
        </div>
        <div class="d-flex align-center justify-center pa-2 text-grey-darken-2" v-else>
          <span>No action needed</span>
        </div>
      </v-card>
    </v-menu>
    <v-card-text class="text-center" v-if="!rail || mobile">
      <h2 class="text-capitalize">{{ `${student.first_name} ${student.last_name}` }}</h2>
      <h4 class="font-weight-regular text-capitalize mt-2">{{ student.position }}</h4>
    </v-card-text>
    <div v-if="!rail || mobile">
      <v-card-actions
        class="w-100 d-flex align-center justify-center"
        v-if="!student.attendance"
      >
        <v-btn
          prepend-icon="mdi-login"
          color="primary"
          variant="elevated"
          rounded
          class="px-5"
          @click.stop="enter"
          >Enter</v-btn
        >
        <v-btn
          prepend-icon="mdi-close"
          variant="elevated"
          rounded
          class="px-5"
          color="transparent"
          flat
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
          rounded
          @click.stop="leave(student.id, student.attendance.id)"
          prepend-icon="mdi-logout"
          class="px-5"
          block
          v-if="student.attendance.time_in"
          >Leave</v-btn
        >
      </v-card-actions>
      <v-card-actions v-else class="w-100 px-10">
        <v-chip
          size="large"
          color="success"
          class="w-100 text-capitalize"
          prepend-icon="mdi-calendar"
          >In Event</v-chip
        >
      </v-card-actions>
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
import useAttendance from '@/composables/useAttedanceStudent'
import { Student } from "@/stores/student";
import { computed } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const {mobile} = useDisplay()
const props = defineProps<{ student: Student; rail: boolean }>();
const status = computed(() => {
    if(!props.student.attendance){
      return 'pending'
    }
      return props.student.attendance.is_absent ? 'absent' : props.student.attendance.late_time != null ? 'late' : props.student.attendance.is_event ? 'event' : 'present'
  })
const {enter, absent, leave, enterWithPolicy, isLoading, showPolicyConfirmation} = useAttendance(props.student)
const icon = computed(() => status.value == 'event' ? 'mdi-calendar' : status.value == 'absent' ? 'mdi-account-remove' : status.value == 'late' ? 'mdi-exclamation-thick' : status.value == 'present' ? 'mdi-account-check' : 'mdi-reload')
const color = computed(() => status.value == 'event' ? 'success' : status.value == 'absent' ? 'error' : status.value == 'late' ? 'warning' : status.value =='pending' ? 'grey' : 'blue')
</script>

<style scoped></style>
