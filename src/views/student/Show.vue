<template>
   <v-container class="h-100" v-if="student">
    <v-layout class="h-100 w-100">
      <v-navigation-drawer class="border-0 pt-15" width="350">
        <v-card class="d-flex flex-column align-center px-5 " flat>
          <v-avatar size="125" color="grey-lighten-4">
            <v-img :src="student.image"></v-img>
          </v-avatar>
          <div class="mt-3">
            <h3 class="text-center">{{ student.first_name + ' ' + student.last_name }}</h3>
            <h5 class="text-center font-weight-regular">{{ 'OJT Student'}}</h5>
          </div>
          <div class="w-100 mt-3">
            <h4 class="text-grey-darken-3 my-2">Student Details</h4>
            <div class="d-flex  text-caption my-2">
              <v-icon color="grey-darken-3">mdi-email</v-icon>
              <v-spacer></v-spacer>
              <p class="text-right">{{ student.email }}</p>
            </div>
            <div class="d-flex  text-caption my-2">
              <v-icon color="grey-darken-3">mdi-cellphone</v-icon>
              <v-spacer></v-spacer>
              <p class="text-right">0{{ student.phone_number }}</p>
            </div>
            <div class="d-flex  text-caption my-2">
              <v-icon color="grey-darken-3">mdi-map-marker</v-icon>
              <v-spacer></v-spacer>
              <p class="text-right">{{ student.address }}</p>
            </div>
            <div class="d-flex  text-caption my-2">
              <v-icon color="grey-darken-3">mdi-script</v-icon>
              <v-spacer></v-spacer>
              <p class="text-right">{{ student.course }}</p>
            </div>
            <div class="d-flex  text-caption my-2">
              <v-icon color="grey-darken-3">mdi-town-hall</v-icon>
              <v-spacer></v-spacer>
              <p class="text-right">{{ student.school_name }}</p>
            </div>
            <div class="d-flex  text-caption my-2">
              <v-icon color="grey-darken-3">mdi-calendar</v-icon>
              <v-spacer></v-spacer>
              <p class="text-right">{{ student.school_year }}</p>
            </div>
          </div>
          <div class="w-100 d-flex">
            <v-btn class="w-50" variant="outlined" color="primary" prepend-icon="mdi-cog">Edit</v-btn>
            &nbsp;
            <v-btn class="w-50" variant="outlined" color="error" prepend-icon="mdi-trash-can">Remove</v-btn>
          </div>
        </v-card>
      </v-navigation-drawer>
      <v-app-bar flat >
        <v-spacer></v-spacer>
        <v-btn-toggle density="compact" color="primary" class="rounded-pill">
          <v-btn class="text-capitalize" :to="{name: 'ShowStudent.attendance', params: {student_id: student.id}}">Attendance</v-btn>
          <v-btn class="text-capitalize">Courses</v-btn>
          <v-btn class="text-capitalize">Edit details</v-btn>
        </v-btn-toggle>
        <v-spacer></v-spacer>

      </v-app-bar>
      <v-main>
        <router-view></router-view>

      </v-main>
    </v-layout>
    </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useStudentStore} from '../../stores/student'
const {student} = storeToRefs(useStudentStore())
</script>

<style scoped>

</style>
