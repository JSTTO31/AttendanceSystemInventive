<template>
  <div class="h-100">
    <Teleport to="#teleport" v-if="teleportIsMounted">
      <v-navigation-drawer width="310" location="left" >
        <div>
          <v-card class="rounded-0 border-b pb-5" flat key="nav">
            <h1 class="text-center py-2 bg-primary text-h6 font-weight-bold">{{ getMonth(now.getMonth()) }}</h1>
            <div class="py-5">
              <h1 class="text-h1 text-center font-weight-regular">{{ now.getDate().toString().padStart(2, '0') }}</h1>
              <h1 class="text-center text-h6 font-weight-bold">{{ getDay(now.getDate()) }}</h1>
            </div>
          </v-card>
        <div>
          <v-card
            v-for="event in events" flat
            @click="$router.push({name: 'ScheduleShow', params: {event_id: event.id}})" style="border-color: #615dec !important" class="pa-4 bg-grey-lighten-5 rounded-0" :class="$route.params.event_id && parseInt($route.params.event_id.toString()) == event.id ? 'border-e-lg' : ''" :key="event.id"

            >
            <h5 class="text-subtitle-1 font-weight-medium">{{ event.title }}</h5>
            <h6 class="text-caption">{{ new Date(event.date_time.event_date_start).toDateString() }} | {{ event.date_time.event_time_start.replace(':00', '') }}{{ event.date_time.event_time_start == event.date_time.event_time_end ? '' : ' - ' + event.date_time.event_time_end.replace(':00', '') }}</h6>
          </v-card>
        </div>
        </div>
      </v-navigation-drawer>
    </Teleport>
    <RouterView v-slot="{Component}">
      <Transition name="slide"  mode="out-in">
        <component :is="Component" :key="event"></component>
      </Transition>
    </RouterView>
  </div>
</template>
<script lang="ts" setup>
import { useEventStore } from '@/stores/events';
import { getDay, getMonth } from '@/utils';
import { storeToRefs } from 'pinia';
import { ref, inject } from 'vue';
const now = new Date()
const $event = useEventStore()
const {events, event} = storeToRefs($event)
const teleportIsMounted = inject('teleport-is-mounted')
</script>
<style>
.slide-enter-active, .slide-leave-active{
  transition: transform .15s ease-in-out, opacity .15s linear;
}
.slide-enter-from, .slide-leave-to{
  transform: scale(.9);
  opacity: 0;
}</style>

