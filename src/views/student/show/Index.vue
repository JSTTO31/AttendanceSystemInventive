<template>
  <v-container class="px-0" fluid>
    <v-row align-content="stretch">
      <v-col :cols="mobile ? 12 : 8">
        <StudentLineChart
          style="height: 50px"
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
      <v-col :cols="mobile ? 12 : 4">
        <Calendar v-model:selected-month="selectedMonth"></Calendar>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <a download="file" id="link"></a>
        <div v-if="student.attendances && student.attendances.length > 0">
          <v-card style="overflow-x: auto;" class="border rounded-lg d-flex flex-column" flat>
            <v-table hover striped>
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
            <div div class="w-100 align-center mt-5  px-5 pb-5 d-flex" v-if="page_total > 1">
                Page {{ page }} / {{ page_total }}
                <v-spacer></v-spacer>
                <v-pagination
                  :length="page_total"
                  color="primary"
                  :total-visible="mobile ? 1 : 5"
                  v-model="page"
                ></v-pagination>
              </div>
          </v-card>
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
import { useDisplay } from "vuetify/lib/framework.mjs";
const {mobile} = useDisplay()
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


</script>

<style scoped></style>
