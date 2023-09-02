<template>
  <v-card class="pa-5 rounded-lg border-s-xl" @click="$router.push({name: 'ScheduleShow', params: {event_id: event.id}})" color="blue-lighten-1">
      <h4>{{ event.title }}
      </h4>
      <span class="text-caption">{{ new Date(event.date_time.event_date_start).toDateString() }}</span>
      <h5 class="mt-2 font-weight-normal">
          <v-icon>mdi-clock</v-icon>
          {{ convertToStandardTime(event.date_time.event_time_start.replace(':00', '')) }}
          {{ event.date_time.event_time_start == event.date_time.event_time_end ? '' : ' to ' + convertToStandardTime(event.date_time.event_time_end.replace(':00', '')) }}
      </h5>
  </v-card>

</template>

<script setup lang="ts">
import {convertToStandardTime} from '@/utils'
const props = defineProps(['event'])
</script>

<style lang="scss" scoped>

</style>
