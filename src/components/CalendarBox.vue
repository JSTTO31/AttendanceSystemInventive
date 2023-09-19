<template>
  <div style="width: 14.28571428571429% !important;"  class="rounded-0 px-1 bg-transparent">
       <v-menu v-model="activator" location="center" :activator-props="{class: activator ? 'bg-primary text-white' : ''}" style="z-index: 5010;">
          <template #activator="{props}">
              <v-card flat class="rounded-lg" v-bind="props" :class="!largeDevice && events.length > 0 ? 'bg-blue' : new Date().toDateString() == new Date(date).toDateString() ? 'bg-primary' : 'bg-white'" :height="largeDevice ?  105 : 50" @click="showEventsDialog = true" :variant="currentMonth != date.getMonth() ? 'tonal' : 'text'">
                <div v-if="largeDevice">
                  <h4 class="py-1 px-2 font-weight-medium text-caption">
                    {{ date.getDate().toString().padStart(2, '0')  }}
                </h4>
                <div class="d-flex flex-wrap px-2 ">
                        <v-avatar :key="event.id" size="x-small" class="mb-1 mr-1" color="blue" variant="elevated" flat  v-for="event in events.slice(0, 3)">
                          <img src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4498362.jpg&fm=jpg" class="w-100 h-100" />
                        </v-avatar>
                  </div>
                </div>
                <div v-else class="h-100 w-100 d-flex align-center justify-center">
                  <h4 class="font-weight-regular">{{  date.getDate().toString().padStart(2, '0')  }}</h4>
                </div>
            </v-card>
          </template>
          <v-card width="350" height="350" class="rounded-lg pa-5 d-flex flex-column" style="z-index: 55510;">
            <div class="mb-2">
              <h3 class="text-grey-darken-3">{{ new Date(date).toDateString() }}</h3>
            </div>
            <div class="h-100" v-if="events.length > 0">
              <v-card v-for="event in events" flat @click="$router.push({name: 'ScheduleShow', params: {event_id: event.id}})"  style="border-color: #615dec !important" class="pa-4 bg-grey-lighten-5 border-s-lg rounded-0 mb-2" :key="event.id">
                <h5 class="text-subtitle-1 font-weight-medium">{{ event.title }}</h5>
                <h6 class="text-caption">{{ new Date(event.date_time.event_date_start).toDateString() }} | {{ event.date_time.event_time_start.replace(':00', '') }}{{ event.date_time.event_time_start == event.date_time.event_time_end ? '' : ' - ' + event.date_time.event_time_end.replace(':00', '') }}</h6>
              </v-card>
            </div>
            <div class="pb-5 font-weight-medium text-grey-darken-3 h-100 w-100 d-flex align-center justify-center" v-else>
              No Events
            </div>
          </v-card>
       </v-menu>
   </div>
   <!-- <v-dialog v-model="showEventsDialog" transition="dialog-bottom-transition" :fullscreen="!largeDevice"  width="650" >
       <v-card class="pa-5 pa-md-8 rounded-lg">
           <h2 class="d-flex text-md-h4 font-weight-medium flex-md-row flex-column align-start align-md-end mb-4">
               Event list
               <v-spacer></v-spacer>
               <h4 class="d-flex mb-2 text-subtitle-2 align-center font-weight-regular">
                  <v-icon class="mr-2">mdi-calendar</v-icon>{{ date.toDateString() }}
              </h4>
           </h2>
           <EventCard class="mb-3" :key="event.id" v-for="event in events" :event="event"></EventCard>
           <div class="h-100 w-100 d-flex align-center justify-center font-weight-medium text-h6 pb-15" v-if="events.length < 1">No Events</div>
           <v-spacer></v-spacer>
           <v-btn class="bg-grey-lighten-3 d-block d-md-none" @click="showEventsDialog = false">Close</v-btn>
       </v-card>
   </v-dialog> -->
</template>

<script setup lang="ts">
import { Event } from '@/stores/events';
import { ref } from 'vue';
import { computed } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const activator = ref(false)
const {name} = useDisplay()
const largeDevice = computed(() => name.value == 'lg' || name.value == 'md' || name.value == 'xl' || name.value == 'xxl')
const showEventsDialog = ref(false)
const props = defineProps(['events', 'date', 'currentMonth'])
const events = computed(() => props.events.filter((event: Event) => {
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
