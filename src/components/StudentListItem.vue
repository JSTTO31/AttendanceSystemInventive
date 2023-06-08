<template>
  <v-card
        class="d-flex align-center pa-2 border-b"
        flat
        :to="{name: 'ShowStudent', params: {student_id: student.id}}"
      >
        <v-row>
          <v-col class="d-flex align-center" cols="4">
            <v-avatar size="65">
              <v-img :src="student.image"></v-img>
            </v-avatar>
            <div class="ml-4">
              <h4>{{ student.first_name + " " + student.last_name }}</h4>
              <h5 class="font-weight-regular">{{ student.email }}</h5>
            </div>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2">Clock in:</span> 25
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2">Clock out:</span> 25
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2">Left:</span> 255h
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <v-chip color="warning"> Pending </v-chip>
          </v-col>
        </v-row>
      </v-card>
</template>

<script setup lang="ts">
import { Student } from '@/stores/student';

const props = defineProps<{student: Student}>()
</script>

<style scoped>

</style>
