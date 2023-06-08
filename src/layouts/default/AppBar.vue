<template>
  <v-app-bar class="px-5" flat color="primary">
    <h2>
      <v-icon class="mr-1" size="35">mdi-calendar</v-icon>
      eAttendance
    </h2>
    <div class="w-25 ml-5">
      <v-text-field
        label="find students..."
        variant="solo"
        single-line
        density="compact"
        hide-details
      ></v-text-field>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <v-avatar size="45">
        <v-img src="https://www.w3schools.com/w3css/img_avatar3.png"></v-img>
      </v-avatar>
      <div>
        <h5 class="ml-3 font-weight-bold">Joshua Sotto</h5>
        <h6 class="ml-3 font-weight-regular">{{ "administrator" }}</h6>
      </div>
      <v-btn size="small" class="ml-5" icon="mdi-chevron-down"></v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAttendanceStore } from "@/stores/attendance";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useUserStore());


</script>

<style scoped></style>
