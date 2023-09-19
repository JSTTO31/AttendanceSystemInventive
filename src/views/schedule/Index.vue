<template>
  <v-container class="d-flex flex-column h-100 px-2 px-md-8 pa-2 py-5 pb-15">
    <v-row>
      <v-col v-if="mobile">
        <v-card class="rounded-lg border" flat key="nav">
          <h1 class="text-center py-2 bg-primary text-h6 font-weight-bold">{{ getMonth(now.getMonth()) }}</h1>
          <div class="py-5">
            <h1 class="text-h1 text-center font-weight-regular">{{ now.getDate().toString().padStart(2, '0') }}</h1>
            <h1 class="text-center text-h6 font-weight-bold">{{ getDay(now.getDate()) }}</h1>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="12">
          <h2 class="d-flex align-center text-md-h5 mb-2 font-weight-medium text-grey-darken-3 px-1">
            <v-btn icon="mdi-chevron-left" class="d-block d-md-none rounded"  flat variant="text" @click="currentMonth--"></v-btn>
            <v-spacer class="d-block d-md-none"></v-spacer>
            {{ month }}, {{ fullYear }}
            <v-spacer></v-spacer>
            <v-btn icon="mdi-chevron-left" class="ml-2 rounded d-none d-md-block"  flat variant="text" @click="currentMonth--"></v-btn>
            <v-btn icon="mdi-chevron-right" class="ml-2 rounded"  flat variant="text" @click="currentMonth++"></v-btn>
          </h2>
          <div class="d-flex flex-wrap h-100">
            <CalendarBox v-for="date in dates" :key="date.toDateString()" :date="new Date(date)" :events="events" :current-month="(new Date(now.getFullYear(), currentMonth)).getMonth()"></CalendarBox>
          </div>
          <!-- <v-card class="h-100 d-flex flex-column rounded-lg border" flat>
            <h2 class="d-flex align-center text-md-h5 font-weight-medium text-grey-darken-3 pa-5 px-2 px-md-5">
              <v-btn icon="mdi-chevron-left" class="d-block d-md-none rounded"  flat variant="text" @click="currentMonth--"></v-btn>
              <v-spacer class="d-block d-md-none"></v-spacer>
              {{ getMonth(currentMonth) }}, {{ new Date().getFullYear() }}
              <v-spacer></v-spacer>
              <v-btn icon="mdi-chevron-left" class="ml-2 rounded d-none d-md-block"  flat variant="text" @click="currentMonth--"></v-btn>
              <v-btn icon="mdi-chevron-right" class="ml-2 rounded"  flat variant="text" @click="currentMonth++"></v-btn>
            </h2>
            <v-card class="d-flex flex-column rounded-0 h-100 px-0 px-md-5 pb-5" flat>
              <div class="d-flex bg-white">
                <div style="width: 14.28571428571429% !important;background-color: #000f1f;"  class="rounded-0 text-caption text-white font-weight-bold text-center pa-2" v-for="n in 7" :key="n">
                  <span class="d-none d-md-block">{{ getDay(n-1) }}</span>
                  <span class="d-block d-md-none">{{ getDay(n-1)[0] }}</span>
                </div>
              </div>
            </v-card>
          </v-card> -->
      </v-col>
      <v-col cols="12" v-if="mobile">
        <h3 class="text-grey-darken-3 mb-4 mt-15">Upcoming Events</h3>
        <!-- <EventCard class="mb-3" v-for="event in events" :event="event" :key="event.id"></EventCard> -->
        <v-card v-for="event in events" flat @click="$router.push({name: 'ScheduleShow', params: {event_id: event.id}})" style="border-color: #615dec !important" class="pa-4 bg-grey-lighten-5 border-s-lg rounded-0 mb-2" :key="event.id">
          <h5 class="text-subtitle-1 font-weight-medium">{{ event.title }}</h5>
          <h6 class="text-caption">{{ new Date(event.date_time.event_date_start).toDateString() }} | {{ event.date_time.event_time_start.replace(':00', '') }}{{ event.date_time.event_time_start == event.date_time.event_time_end ? '' : ' - ' + event.date_time.event_time_end.replace(':00', '') }}</h6>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import CalendarBox from '@/components/CalendarBox.vue';
import { useEventStore } from '@/stores/events';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { getAllDayInMonth, getDay, getMonth } from '@/utils';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const {mobile} = useDisplay()
const {events,} = storeToRefs(useEventStore())
const $event = useEventStore()
const currentMonth = ref(new Date().getMonth())
const now = new Date();
const month = computed(() => getMonth((new Date(now.getFullYear(), currentMonth.value)).getMonth()))
const fullYear = computed(() => new Date(now.getFullYear(), currentMonth.value).getFullYear())
const dates = computed(() => getAllDayInMonth(currentMonth.value))
</script>

<style scoped>

</style>
