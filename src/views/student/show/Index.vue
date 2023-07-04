<template>
  <v-container class="px-0" fluid>
    <v-row align-content="stretch">
      <v-col cols="8">
        <StudentLineChart
          :month="selectedMonth"
          v-if="student.attendances && student.attendances.length > 0"
        ></StudentLineChart>
        <v-card
          v-else
          class="pa-5 d-flex align-center justify-center rounded-lg border"
          flat
          height="450"
        >
          <v-avatar class="mr-4" size="60">
            <v-img src="/src/assets/data-quality.png"></v-img>
          </v-avatar>
          <h2 class="ml-2">No chart</h2>
        </v-card>
      </v-col>
      <v-col cols="4">
        <Calendar v-model:selected-month="selectedMonth"></Calendar>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-5">
        <div v-if="student.attendances && student.attendances.length > 0">
          <h3 class="mb-2">Attendance History</h3>
          <v-table hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time in</th>
                <th>Time out</th>
                <th>Work time</th>
              </tr>
            </thead>
            <tbody>
              <AttendanceListItem
                v-for="attendance in attendancesReverse.slice((page - 1) * perPage, page * perPage)"
                :key="attendance.id"
                :attendance="attendance"
              ></AttendanceListItem>
            </tbody>
          </v-table>
        </div>
        <div class="w-100 align-center mt-5 d-flex" v-if="page_total > 1">
          Page {{ page }} / {{ page_total }}
          <v-spacer></v-spacer>
          <v-pagination
            :length="page_total"
            color="primary"
            v-model="page"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import StudentLineChart from "@/components/StudentLineChart.vue";
import AttendanceListItem from "@/components/AttendanceListItem.vue";
import Calendar from "@/components/Calendar.vue";
import { useStudentStore } from "@/stores/student";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const now = new Date(); 
const selectedMonth = ref(now.getMonth())
const { student } = storeToRefs(useStudentStore());
const page = ref(1);
const perPage = 9;
let page_total = computed(() =>
  Math.ceil((student.value.attendances?.length || 0) / perPage)
);
//@ts-ignore
const attendancesReverse = computed(() =>
  student.value.attendances
    .slice()
    //@ts-ignore
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
);
// const weeks = useGroupByWeek(student.value.attendances);
</script>

<style scoped></style>
