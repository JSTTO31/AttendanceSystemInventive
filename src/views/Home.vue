<template>
  <v-container class="pa-md-10 pa-5">
    <h2 class="text-md-h4 font-weight-bold">Hello! Welcome to your dashboard</h2>
    <p class="text-subtitle-2 text-md-subtitle-1">Effortlessly manage attendance with our intuitive dashboard.</p>
    <v-container fluid class="px-0">
      <v-row>
        <v-col cols="12" md="8">
          <v-card flat class="border rounded-lg pa-5 py-8 d-flex justify-center flex-column align-center">
            <!-- <v-card-title class="text-left w-100">Students Remaining hours</v-card-title> -->
            <ChartBar :chart-data="chartData"></ChartBar>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat  class="border text-center rounded-lg px-5 d-flex flex-column flex-md-row align-center  py-4">
            <v-icon v-if="!mobile" size="55" class="mr-md-5">mdi-school</v-icon>
            <div>
              <h4>Number of students</h4>
              <h1>{{ number_of_students }}</h1>
            </div>
          </v-card>
          <v-card flat class="border rounded-lg pa-5 justify-center d-flex mt-4">
            <VProgressCircular width="20" :model-value="(number_of_students - remaining) / remaining * 100" color="primary" size="199">
              <h1 class="d-flex text-h3 flex-column align-center">
                <span>{{ remaining }}</span>
                <span class="text-subtitle-1 text-caption font-weight-medium">Remaining</span>
              </h1>
            </VProgressCircular>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
      <v-col>
        <h4 class="mb-2 text-md-h6">Remaining students</h4>
        <StudentListItem v-for="student in students" :key="student.id" :student="student"></StudentListItem>
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
const {mobile} = useDisplay()
const {current} = useTheme()
const {students, number_of_students, remaining} = storeToRefs(useAppStore())
const chartData : any = computed(() => ({
    labels: students.value.map(item => item.first_name),
    datasets: [
      {
        data: students.value.map(item => item.work_time_total?.toFixed(0) || 0),
        backgroundColor: [current.value.colors.primary, current.value.colors.primary, current.value.colors.primary],
        borderRadius: 5,
        barThickness: mobile.value ? 35 : 55,
      }
    ]
}))
</script>
