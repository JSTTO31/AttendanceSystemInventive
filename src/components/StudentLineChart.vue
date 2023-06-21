<template>
  <v-card class="h-100 border pa-4" flat>
    <v-card-title> Weekly work time </v-card-title>
    <v-card-text>
      <LineChart style="height: 350px" class="pa-5"></LineChart>
    </v-card-text>
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
const now = computed(() => new Date());
const data = () => {
  let end = false
  let container = []
  let day = 1
  while(day != 31){
    let currentDate = new Date(now.value);
    currentDate.setDate(1)
    console.log(currentDate);
    
  }



  // return ({
  //   //@ts-ignore
  //   labels: container.map((item, index) => "Week " + (index + 1)),
  //   datasets: [
  //     {
  //       backgroundColor: "#2196F3",
  //       borderJoinStyle: "round",
  //       borderColor: "#2196F3",
  //       tension: 0.5,
  //       //@ts-ignore
  //       data: container.map(item => item.reduce((sum, item) => sum += item.work_time, 0)),
  //     },
  //   ]}
  // )
}


data()

// console.log(data);






</script>

<style scoped>

</style>
