<template>
  <v-container class="d-flex flex-column h-100">
    <v-row>
      <v-col cols="8">
            <v-card class="h-100 d-flex flex-column rounded-lg border" flat>
              <h2 class="d-flex align-center text-grey-darken-3 pa-5">
                {{ getMonth(currentMonth) }}, {{ new Date().getFullYear() }}
                <v-spacer></v-spacer>
                <v-btn icon="mdi-chevron-left" class="ml-2 rounded"  flat variant="text" @click="currentMonth--"></v-btn>
                <v-btn icon="mdi-chevron-right" class="ml-2 rounded"  flat variant="text" @click="currentMonth++"></v-btn>
              </h2>
              <v-card class="d-flex flex-column rounded-lg h-100 px-5 pb-5" flat>
                <div class="d-flex bg-white">
                  <div style="width: 14.28571428571429% !important;background-color: #000f1f;"  class="rounded-0 text-caption text-white font-weight-bold text-center pa-2" v-for="n in 7" :key="n">
                    {{ getDay(n-1) }}
                  </div>
                </div>
                <div class="d-flex flex-wrap bg-white h-100">
                  <CalendarBox v-for="date in dates" :key="date.toDateString()" :date="new Date(date)" :events="events" :current-month="currentMonth"></CalendarBox>
                </div>
              </v-card>
            </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="h-100 pa-5 rounded-lg" flat>
          <h2 class="text-grey-darken-3 mb-4">Upcoming Events</h2>
          <EventCard class="mb-3" v-for="event in events" :event="event" :key="event.id"></EventCard>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-navigation-drawer  width="350"  flat location="right">
      <div class="pa-5 h-100 d-flex flex-column">
        <h1 class="mb-2 text-h6 font-weight-medium text-grey-darken-3">Event Attendees</h1>
        <v-card class="pa-2 mb-2 rounded-lg bg-grey-lighten-3" flat @click.prevent="" v-for="student in students" :key="student.id">
          <template #prepend>
            <v-avatar size="50">
              <v-img :src="student.image"></v-img>
            </v-avatar>
          </template>
          <template #title>
            <h6 class="text-capitalize">{{ student.first_name }} {{ student.last_name }}</h6>
          </template>
          <template #subtitle>
            <h5 class="text-capitalize font-weight-regular">{{ student.position }}</h5>
          </template>
        </v-card>
        <v-spacer></v-spacer>
        <v-btn prepend-icon="mdi-plus" size="large" color="blue-darken-2">Add Attendees</v-btn>
      </div>
  </v-navigation-drawer> -->
  </v-container>
</template>

<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import CalendarBox from '@/components/CalendarBox.vue';
import { useEventStore } from '@/stores/events';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { getAllDayInMonth, getDay, getMonth } from '@/utils';
const {events} = storeToRefs(useEventStore())
const $event = useEventStore()
$event.getEvents()
const currentMonth = ref(new Date().getMonth())
const dates = computed(() => getAllDayInMonth(currentMonth.value))
</script>

<style scoped>

</style>
