<template>
  <v-card flat>
    <LineChart style="height: 200px;" :data="data"></LineChart>
  </v-card>
</template>

<script setup lang="ts">
import LineChart from '@/components/LineChart.vue'
import { useAttendanceStore } from '@/stores/attendance';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const {weekly_attendances} = storeToRefs(useAttendanceStore())
const data = computed(() => {
  const start = new Date()
  start.setDate(start.getDate() - start.getDay());
  const end = new Date()
  const container = []

  while(start <= end){
      const count = weekly_attendances.value.filter(attendance => new Date(attendance.created_at).toDateString() == new Date(start).toDateString() && attendance.work_time).length
      container.push(count)
      start.setDate(start.getDate() + 1)
  }

  return {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      data: container,
      backgroundColor: '#615dec',
      borderColor: '#615dec',
      tension: 0.1,
      borderJoinStyle: "round",
    }
  ],
}
})
</script>

<style scoped>

</style>
