<template>
  <v-col class="text-center pa-5" style="width: 1.714286%;">
    <v-icon v-if="!attendance" color="grey">mdi-reload</v-icon>
    <v-icon v-else-if="attendance.is_absent" color="error">mdi-close-circle</v-icon>
    <v-icon v-else-if="attendance.policy" color="warning">mdi-alert-circle</v-icon>
    <v-icon v-else color="success">mdi-check-circle</v-icon>
  </v-col>
</template>

<script setup lang="ts">
import { useAttendanceStore } from '@/stores/attendance';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const {weekly_attendances} = storeToRefs(useAttendanceStore())
const props = defineProps(['student', 'date'])
const attendance = computed(() => weekly_attendances.value.find(attendance => attendance.student_id == props.student.id && new Date(props.date).toDateString() == new Date(attendance.created_at).toDateString()))
</script>

<style scoped>

</style>
