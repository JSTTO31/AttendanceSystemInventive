<template>
  <v-container class="pa-5">
    <h2 class="text-md-h4 font-weight-medium text-capitalize" style="text-transform: capitalize !important;">Students</h2>
    <p class="text-md-subtitle-1 text-subtitle-2">Here is the list of OJT students, and some details.</p>
    <div class="mt-4">
      <div class="w-100 mb-5 mb-md-0 d-flex flex-column flex-md-row" :class="!mobile ? 'align-center' : ''">
        <div class="w-50 d-flex align-center" :class="mobile ? 'w-75' : 'w-50'">
          <v-text-field
            density="compact"
            v-model="search"
            @keyup.enter="searchSubmit"
            color="primary"
            hide-details
            variant="outlined"
            single-line
            label="Find student..."
          ></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <v-tabs v-model="selectedTab" color="primary" class="mt-2 mt-md-0">
          <v-tab
            class="text-capitalize"
            value=""
            @click="router.push({ query: { filter: '' } })"
            >Ongoing</v-tab
          >
          <v-tab
            class="text-capitalize"
            value="completed"
            @click="router.push({ query: { filter: 'completed' } })"
            >Completed</v-tab
          >
          <v-tab
            class="text-capitalize"
            value="all_students"
            @click="router.push({ query: { filter: 'all_students' } })"
            >All students</v-tab
          >
        </v-tabs>
      </div>
      <v-card flat class="mt-2 bg-primary rounded-b-0 py-2" v-if="!mobile">
        <v-row>
          <v-col class="d-flex align-center" cols="4"> </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"
              ><v-icon class="mr-2">mdi-clock-in</v-icon>Clock in</span
            >
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"
              ><v-icon class="mr-2">mdi-clock-out</v-icon>Clock out</span
            >
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"
              ><v-icon class="mr-2">mdi-update</v-icon>Work time</span
            >
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"
              ><v-icon class="mr-2">mdi-clock-fast</v-icon>Remaining</span
            >
          </v-col>
        </v-row>
      </v-card>
      <div v-if="students.length < 1" class="w-100 d-flex pt-15">
        <v-avatar size="85" class="rounded-0 mx-auto my-15">
          <v-img src="/src/assets/no-task.png"></v-img>
        </v-avatar>
      </div>
      <StudentListItemVue
        v-for="student in students"
        :key="student.id"
        :student="student"
      ></StudentListItemVue>
      <div
        class="d-flex align-center justify-between mt-5"
      >
        <div>Page {{ page }} / {{ Math.ceil(pageOptions.total / pageOptions.per_page) }}</div>
        <v-spacer></v-spacer>
        <v-pagination
          :total-visible="mobile ? 1 : 5"
          v-model="page"
          :length="Math.ceil(pageOptions.total / pageOptions.per_page)"
          color="primary"
        ></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import StudentListItemVue from "@/components/StudentListItem.vue";
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
const {mobile} = useDisplay()
const router = useRouter();
const route = useRoute();
const selectedTab = ref(route.query.filter || "");
const { students, pageOptions } = storeToRefs(useStudentStore());
const $student = useStudentStore();
const page = ref(parseInt(route.query.page?.toString() || "1"));
const search = ref("");
const searchSubmit = () => {
  router.push({ query: { search: search.value } });
};

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
