<template>
  <v-card class="h-100 border pa-4" flat>
    <v-card-title> Weekly work time </v-card-title>
    <v-card-text>
      <LineChart style="height: 350px" class="pa-5"></LineChart>
    </v-card-text>
    {{data}}
    <pre>
      {{student.attendances}}
    </pre>
  </v-card>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import { storeToRefs } from 'pinia';
import LineChart from './LineChart.vue';
import { useStudentStore } from '@/stores/student';
const {student} = storeToRefs(useStudentStore());
const currentMonth = computed(() => new Date().getMonth());
const data = computed(() => {
  //@ts-ignore
  let attendances = student.value.attendances.slice().sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
  let container : any = []
  let weeks = [attendances[0]]
  //@ts-ignore
  attendances.slice(1).forEach(item => {
    let currentDay = new Date(item.created_at);
    let currentWeek = new Date(weeks[0].created_at)
    let startWeek = new Date(weeks[0].created_at);
    let lastWeek = new Date(weeks[0].created_at)
    startWeek.setDate(startWeek.getDate() - currentWeek.getDay());
    lastWeek.setDate(lastWeek.getDate() + currentWeek.getDay());

    if(startWeek <= currentDay && lastWeek >= currentDay){
      weeks.push(item)
    }else{
      container.push(weeks)
      weeks = [item]
    }

  })

  if(weeks.length > 0){
    container.push(weeks)
  }

  return ({
    //@ts-ignore
    labels: container.map((item, index) => "Week " + (index + 1)),
    datasets: [
      {
        backgroundColor: "#2196F3",
        borderJoinStyle: "round",
        borderColor: "#2196F3",
        tension: 0.5,
        //@ts-ignore
        data: container.map(item => item.reduce((sum, item) => sum += item.work_time, 0)),
      },
    ]}
  )
})





</script>

<style scoped>

</style>
