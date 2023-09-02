<template>
  <v-card class="h-100 border rounded-lg pa-md-4 pa-0" flat>
    <v-card-title> Weekly work time </v-card-title>
    <v-card-text class="pa-0">
      <LineChart style="height: 350px" :data="data()" class="pa-5"></LineChart>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import LineChart from "./LineChart.vue";
import { useStudentStore } from "@/stores/student";
import { useTheme } from "vuetify/lib/framework.mjs";
const props = defineProps(['month'])
const {current} = useTheme()
const { student } = storeToRefs(useStudentStore());
const data = () => {
  //@ts-ignore
  let attendances = student.value.attendances
    .slice()
    .filter(item => new Date(item.created_at).getMonth() == props.month)
    //@ts-ignore
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  let container: any = [];
  let weeks = [attendances[0]];
  //@ts-ignore
  if(attendances.length > 1){
    attendances.slice(1).forEach((item) => {
      let currentDay = new Date(item.created_at);
      let currentWeek = new Date(weeks[0].created_at);
      let startWeek = new Date(weeks[0].created_at);
      let lastWeek = new Date(weeks[0].created_at);
      let first = startWeek.getDate() - currentWeek.getDay();
      startWeek.setDate(first);
      lastWeek.setDate(first + 6);
      currentDay.setHours(0, 0, 0, 0);

      if (startWeek <= currentDay && lastWeek >= currentDay) {
        weeks.push(item);
      } else {
        container.push(weeks);
        weeks = [item];
      }
    });
  }

  if (weeks.length > 0) {
    container.push(weeks);
  }

  return {
    //@ts-ignore
    labels: container.map((item, index) => "Week " + (index + 1)),
    datasets: [
      {
        backgroundColor: current.value.colors.primary,
        borderJoinStyle: "round",
        borderColor: current.value.colors.primary,
        tension: 0.1,
        //@ts-ignore
        data: container.map((item) =>
          //@ts-ignore
          item.reduce((sum, item) => (sum += item?.work_time || 0), 0)
        ),
      },
    ],
  };
};
</script>

<style scoped></style>
