<template>
  <v-container class="pa-10">
    <h1 class="text-h4 font-weight-bold text-grey-darken-4">Students</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <div class="mt-4">
      <div class="w-100 pb-2 d-flex align-center justify-space-between">
        <h3 class="font-weight-medium text-grey-darken-3">Students list</h3>
        <v-tabs color="primary">
          <v-tab class="text-capitalize">Ongoing</v-tab>
          <v-tab class="text-capitalize">Completed</v-tab>
          <v-tab class="text-capitalize">History</v-tab>
        </v-tabs>
      </div>
      <StudentListItemVue v-for="student in students" :student="student"></StudentListItemVue>
      <div class="d-flex align-center mt-5">
        <v-spacer></v-spacer>
        <v-pagination length="5"></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import StudentListItemVue from "@/components/StudentListItem.vue";
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";

const { students } = storeToRefs(useStudentStore());
</script>

<style scoped></style>
