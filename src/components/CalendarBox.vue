<template>
  <div style="width: 14.28571428571429% !important;"  class="rounded-0 border pa-0">
       <v-card flat  class="rounded-0" height="100" @click="showEventsDialog = true" :variant="currentMonth != date.getMonth() ? 'plain' : 'text'">
           <h4 class="py-1 px-2 font-weight-medium text-caption">
               {{ date.getDate().toString().padStart(2, '0')  }}
           </h4>
           <div class="d-flex flex-wrap px-2">
                  <v-chip :key="event.id" size="x-small" class="mb-1 mr-1" color="blue" variant="elevated" flat  v-for="event in events.slice(0, 3)">{{ event.title }} </v-chip>
            </div>
       </v-card>
   </div>
   <v-dialog v-model="showEventsDialog" transition="dialog-bottom-transition"  width="650" >
       <v-card class="pa-8  rounded-xl">
           <h1 class="d-flex align-end mb-4">
               Event list
               <v-spacer></v-spacer>
               <h4 class="d-flex mb-2 text-subtitle-2 align-center font-weight-regular">
                  <v-icon class="mr-2">mdi-calendar</v-icon>{{ date.toDateString() }}
              </h4>
           </h1>
           <EventCard class="mb-3" :key="event.id" v-for="event in events" :event="event"></EventCard>
       </v-card>
   </v-dialog>
</template>

<script setup lang="ts">
import { getMonth } from '@/utils';
import EventCard from './EventCard.vue';
import { ref } from 'vue';
import { computed } from 'vue';
const showEventsDialog = ref(false)
const props = defineProps(['events', 'date', 'currentMonth'])
const events = computed(() => props.events.filter(event => {
   const start_date = new Date(event.date_time.event_date_start);
   const end_date = new Date(event.date_time.event_date_end);
   start_date.setHours(0);
   start_date.setMinutes(0);
   start_date.setMilliseconds(0);
   end_date.setHours(0);
   end_date.setMinutes(0);
   end_date.setMilliseconds(0);
   return start_date <= props.date && end_date >= props.date
}))
</script>

<style lang="scss" scoped>

</style>
