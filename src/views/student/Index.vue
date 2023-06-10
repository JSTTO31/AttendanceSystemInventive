<template>
  <v-container class="pa-10">
    <h1 class="text-h4 font-weight-bold text-grey-darken-4">Students</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <div class="mt-4">
      <div class="w-100 d-flex align-center justify-space-between">
        <div class="w-50 d-flex align-center">
          <v-text-field density="compact" color="primary" hide-details variant="outlined" single-line  label="Find student..."></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <v-tabs color="primary">
          <v-tab class="text-capitalize">Ongoing</v-tab>
          <v-tab class="text-capitalize">Completed</v-tab>
          <v-tab class="text-capitalize">History</v-tab>
        </v-tabs>
      </div>
      <v-card flat class="mt-2 bg-blue py-2 mb-1">
        <v-row>
          <v-col class="d-flex align-center" cols="4">
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"><v-icon class="mr-2">mdi-clock-in</v-icon>Clock in</span>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"><v-icon class="mr-2">mdi-clock-out</v-icon>Clock out</span>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"><v-icon class="mr-2">mdi-update</v-icon>Work time</span>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"><v-icon class="mr-2">mdi-clock-fast</v-icon>Remaining</span>
          </v-col>
        </v-row>
      </v-card>
      <StudentListItemVue v-for="student in students" :key="student.id" :student="student"></StudentListItemVue>
      <div class="d-flex align-center mt-5">
        <v-spacer></v-spacer>
        <v-pagination length="5" color="primary"></v-pagination>
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
