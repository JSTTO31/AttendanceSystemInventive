<template>
  <v-container class=" px-8 h-100 d-flex flex-column">
    <v-row>
      <v-col cols="4">
        <v-card class="h-100 py-10 d-flex flex-column justify-center align-center pa-5 rounded-lg border" flat>
            <VProgressCircular :model-value="remainingPercentage" size="195" width="10" class="text-h2" color="primary">{{remainingPercentage}}%</VProgressCircular>
            <div class="px-5 mt-5 text-center">
              <h2 class="font-weight-medium">Remaining Students</h2>
              <h3 class="font-weight-light">All students remaining</h3>
            </div>
        </v-card>
      </v-col>
      <v-col cols="8">
          <v-card class="rounded-lg border pa-5" flat>
            <ChartBar :chart-data="chartData"></ChartBar>
          </v-card>
        </v-col>
    </v-row>
    <v-row class="h-100">
      <v-col cols="12">
        <v-card class="d-flex pb-5 flex-column rounded-lg border h-100" flat>
          <div class="d-flex pa-5 pb-2">
            <div class="w-33 font-weight-medium text-h6 d-flex align-center ">
              <v-text-field
                flat
                prepend-inner-icon="mdi-magnify"
                v-model="search"
                label="Find students..."
                variant="outlined"
                single-line
                density="compact"
                hide-details
                @keyup.enter="($event :any) => $router.push({query: {search: $event.target.value}})"
              ></v-text-field>
            </div>
            <v-spacer></v-spacer>
            <v-btn prepend-icon="mdi-plus" color="primary" class="text-capitalize" @click="$router.push({name: 'CreateStudent'})" flat>Add Student</v-btn>
          </div>
          <div class="d-flex pr-5 align-center">
            <v-tabs v-model="selectedTab" color="primary" class="mt-2 mt-md-0">
              <v-tab
                size="small"
                class="text-capitalize"
                value=""
                @click="router.push({ query: { filter: '' } })"
                >Ongoing</v-tab
              >
              <v-tab
                size="small"
                class="text-capitalize"
                value="completed"
                @click="router.push({ query: { filter: 'completed' } })"
                >Completed</v-tab
              >
              <v-tab
                size="small"
                class="text-capitalize"
                value="all_students"
                @click="router.push({ query: { filter: 'all_students' } })"
                >All students</v-tab
              >
            </v-tabs>
            <v-spacer></v-spacer>
            <span class="text-caption">Total of studens ({{ pageOptions.total }})</span>

          </div>
          <v-divider></v-divider>
          <v-table style="border-collapse: collapse;" striped hover>
            <tbody>
              <tr style="cursor: pointer;" v-for="student in students" :key="student.id" class="border-b" @click="$router.push({name: 'ShowStudent', params: {student_id: student.id}})">
                <td class="py-2">
                  <div class="d-flex">
                    <v-avatar class="mr-2" size="55"><v-img :src="student.image"></v-img></v-avatar>
                    <div class="d-flex flex-column ml-2 text-capitalize">
                      <span>{{student.first_name}} {{ student.last_name }}</span>
                      <span class="text-caption text-grey-darken-1"><v-icon class="mr-2">mdi-email-outline</v-icon>{{ student.email }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-center text-caption py-4">{{ student.position }}</td>
                <td class="text-center py-4">
                  <div class="d-flex flex-column ml-2 text-capitalize">
                    <span class="text-caption">
                     {{student.phone_number}}
                    </span>
                  </div>
                </td>
                <td  class="text-caption py-2 text-center text-capitalize">{{ student.gender }}</td>
                <td  class="text-caption py-2 text-center">{{ student.address }}</td>
              </tr>
            </tbody>
          </v-table>
          <div v-if="students.length < 1" class="h-100 d-flex align-center justify-center">
            No students
          </div>
          <v-spacer></v-spacer>
          <div
            v-if="Math.ceil(pageOptions.total / pageOptions.per_page) > 1"
            class="d-flex pa-2 px-5 align-center justify-between"
          >
            <div class="text-caption">Page {{ page }} / {{ Math.ceil(pageOptions.total / pageOptions.per_page) }}</div>
            <v-spacer></v-spacer>
            <v-pagination
            size="small"
              :total-visible="mobile ? 1 : 5"
              v-model="page"
              :length="Math.ceil(pageOptions.total / pageOptions.per_page)"
              color="primary"
            ></v-pagination>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useDisplay, useTheme } from "vuetify/lib/framework.mjs";
import ChartBar from "@/components/ChartBar.vue";
import { computed } from "vue";
const {mobile} = useDisplay()
const router = useRouter();
const route = useRoute();
const selectedTab = ref(route.query.filter || "");
const { students, pageOptions, total_remaining_students, total_students } = storeToRefs(useStudentStore());
const $student = useStudentStore();
const page = ref(parseInt(route.query.page?.toString() || "1"));
const search = ref("");
const {current} = useTheme()
const chartData : any = computed(() => ({
    labels: students.value.map(item => item.first_name.length > 10 ? item.first_name.substring(0, 10) + '...' : item.first_name),
    datasets: [
      {
        data: students.value.map(item => item.work_time_total?.toFixed(0) || 0),
        backgroundColor: [current.value.colors.primary, current.value.colors.primary, current.value.colors.primary],
        borderRadius: 5,
        barThickness: mobile.value ? 35 : 65,
      }
    ]
}))
const remainingPercentage = computed(() => Math.abs(100 -((total_students.value / total_remaining_students.value) * 100)).toFixed(0))


watch(
  () => page.value,
  () => {
    router.push({ query: { page: page.value } });
  }
);

onBeforeRouteUpdate((to, from, next) => {
  //@ts-ignore
  const query = to.fullPath.match(/\?.*/gi);
  if (query) {
    $student.getAll(query[0]).then(() => {
      return next();
    });

    return;
  }

  return next();
});
</script>

<style scoped></style>
