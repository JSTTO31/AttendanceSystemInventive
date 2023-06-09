<template>
  <v-container class="pa-10">
    <h1 class="text-h4 font-weight-bold text-grey-darken-4">Activities</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <v-card flat>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAttendanceStore } from '@/stores/attendance';
import { storeToRefs } from 'pinia';
const {attendances} = storeToRefs(useAttendanceStore())


</script>

<style scoped>

</style>
