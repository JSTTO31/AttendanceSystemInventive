<template>
  <v-container class=" pa-5">
    <h2 class="text-md-h4 font-weight-medium text-capitalize" style="text-transform: capitalize !important;">Attendance Overview</h2>
    <p class="text-subtitle-2 text-md-subtitle-1">Effortlessly manage attendance with our intuitive dashboard.</p>
    <v-container fluid class="px-0">
      <v-row align-content="stretch">
        <v-col cols="12" md="8" class="h-auto">
          <v-card flat class="border rounded-lg pa-5 py-8 d-flex justify-center flex-column align-center">
            <!-- <v-card-title class="text-left w-100">Students Remaining hours</v-card-title> -->
            <ChartBar :chart-data="chartData"></ChartBar>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" class="h-auto">
          <v-card flat  class="border text-center h-25 rounded-lg px-5 d-flex flex-column flex-md-row align-center  py-4">
            <v-icon v-if="!mobile" size="55" class="mr-md-5">mdi-school</v-icon>
            <div>
              <h4>Number of students</h4>
              <h1>{{ number_of_students }}</h1>
            </div>
          </v-card>
          <div class="h-75 pt-5">
            <v-card flat class="border h-100 rounded-lg pa-5 justify-center align-center d-flex">
              <VProgressCircular width="20" :model-value="(number_of_students - remaining) / remaining * 100" color="primary" size="225">
                <h1 class="d-flex text-h2 flex-column font-weight-medium align-center">
                  <span>{{ remaining }}</span>
                  <span class="text-subtitle-1 text-caption font-weight-medium">Remaining</span>
                </h1>
              </VProgressCircular>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card flat class="pa-5 rounded-lg border">
            <div class="d-flex align-center">
              <h4 class="mb-2 text-md-h6">Remaining students</h4>
              <v-spacer></v-spacer>
              <v-btn size="small" @click="$router.push({name: 'IndexStudent'})" flat color="transparent" append-icon="mdi-chevron-right">More students</v-btn>
            </div>
            <StudentListItem v-for="student in students" :key="student.id" :student="student"></StudentListItem>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
import StudentListItem from '@/components/StudentListItem.vue';
import {computed} from 'vue'
import ChartBar from '@/components/ChartBar.vue';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import { useDisplay, useTheme } from 'vuetify/lib/framework.mjs';
import { useRoute } from 'vue-router';
const route = useRoute()
const {mobile} = useDisplay()
const {current} = useTheme()
const {students, number_of_students, remaining} = storeToRefs(useAppStore())
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
</script>
