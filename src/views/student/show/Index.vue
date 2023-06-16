<template>
  <v-container class="px-0" fluid>
    <v-row>
      <v-col>
        <v-card class="h-100 border pa-4" flat>
          <v-card-title> Weekly work time </v-card-title>
          <v-card-text>
            <LineChart style="height: 350px" class="pa-5"></LineChart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <Calendar></Calendar>
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
                v-for="attendance in student.attendances.slice(page - 1 * perPage)"
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
import LineChart from "@/components/LineChart.vue";
import AttendanceListItem from "@/components/AttendanceListItem.vue";
import Calendar from "@/components/Calendar.vue";
import { useAttendanceStore } from "@/stores/attendance";
import { useStudentStore } from "@/stores/student";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import useGroupByWeek from "@/composables/useGroupByWeek";
const { student } = storeToRefs(useStudentStore());
const $attendance = useAttendanceStore();
// const props = defineProps(['student_id'])
const route = useRoute();
$attendance.getAllStudentAttendance(parseInt(route.params.student_id.toString()));
const page = ref(1);
const perPage = 10;
let page_total = computed(() =>
  Math.ceil((student.value.attendances?.length || 0) / perPage)
);
// const weeks = useGroupByWeek(student.value.attendances);
</script>

<style scoped></style>
