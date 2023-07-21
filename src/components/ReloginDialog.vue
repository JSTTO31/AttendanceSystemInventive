<template>
  <v-dialog :model-value="showReloginDialog" width="450" scrim="transparent" @click:outside="emits('update:showReloginDialog', false)">
    <v-card :loading="isLoading" :disabled="isLoading">
        <v-card-text>
          <h4 class="mb-3 text-primary d-flex align-center">
            <v-icon class="mr-1">mdi-information-outline</v-icon>Relogin student
            <v-spacer></v-spacer>
          </h4>
          <h4 class="font-weight-regular">
            This action will create another attendance in same day, do you still want to proceed?
          </h4>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="elevated" class="text-capitalize"
            flat
            density="compact"
            color="primary"
            @click="relogin"
            >Yes</v-btn
          >
          <v-btn variant="elevated" class="text-capitalize" flat density="compact" @click="emits('update:showReloginDialog', false)">No</v-btn>
        </v-card-actions>
        <v-btn
          @click="emits('update:showReloginDialog', false)"
          icon="mdi-close"
          variant="text"
          class="ma-1"
          size="small"
          style="position: absolute; top: 0; right: 0"
        ></v-btn>
      </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {useStudentStore} from '@/stores/student'
import { useAttendanceStore } from '@/stores/attendance';
import { storeToRefs } from 'pinia';
import {ref} from 'vue'
const {student} = storeToRefs(useStudentStore())
const props = defineProps(['showReloginDialog', 'attendance_id'])
const emits = defineEmits(['update:showReloginDialog'])
const isLoading = ref(false)
const relogin = () => {
  const $attendance = useAttendanceStore()
  isLoading.value = true
  $attendance.relogin(student.value.id, props.attendance_id).then(() => {
    emits('update:showReloginDialog', false)
    isLoading.value = false
  })
}
</script>

<style scoped>

</style>
