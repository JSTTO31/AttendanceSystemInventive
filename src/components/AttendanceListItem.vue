<template>
    <tr>
      <td>
        {{ new Date(attendance.created_at).toDateString() }}
      </td>
      <td>
        {{ timeIn }}
      </td>
      <td>
        {{ timeOut }}
      </td>
      <td>
        {{ workTime}}
      </td>
    </tr>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import { Attendance } from '@/stores/attendance';
import { storeToRefs } from 'pinia';
import { useStudentStore } from '@/stores/student';
const {student} = storeToRefs(useStudentStore())
const props = defineProps<{attendance: Attendance}>()
const timeIn = computed(() => props.attendance && props.attendance.time_in ?  new Date(props.attendance.time_in).toLocaleTimeString() : '--')
const timeOut = computed(() => props.attendance && props.attendance.time_out ?  new Date(props.attendance.time_out).toLocaleTimeString() : '--')
const workTime = computed(() => props.attendance && props.attendance.time_in && props.attendance.time_out ? parseInt(props.attendance.work_time).toFixed(0) + 'h' : '--')
</script>

<style scoped>

</style>
