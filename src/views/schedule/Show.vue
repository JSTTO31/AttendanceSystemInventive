<template>
  <v-container class="px-2 px-md-5">
    <v-btn prepend-icon="mdi-arrow-left" variant="text" class="mb-2 text-capitalize" @click="$router.push({name: 'ScheduleIndex'})">Back to calendar</v-btn>
    <v-card class="pa-md-5 border rounded-lg" flat v-if="event">
      <v-card flat class="d-flex flex-column flex-md-row">
          <v-col cols="12" md="4">
            <img  src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4498362.jpg&fm=jpg" class="w-100"/>
          </v-col>
          <v-col cols="12" md="8" class="px-5">
            <v-chip :color="mode.color" variant="elevated" flat class="mb-2 rounded-lg">{{
              mode.label }}</v-chip>
            <h4 style="line-height: 1.2;font-family: serif !important;"
                class="font-weight-medium text-blue-grey-darken-3 text-h5">{{ event.title }}</h4>
            <p class="text-capitalize text-subtitle-2 font-weight-regular text-grey-darken-1 mt-3">{{ event.subtitle }}</p>
          </v-col>
      </v-card>
      <v-container fluid class="px-5 px-md-0">
            <v-row class="py-5">
                <v-col cols="12" md="6">
                    <v-card class="h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5" flat>
                        <div class="w-20 px-2">
                            <v-icon size="25">mdi-calendar</v-icon>
                        </div>
                        <div>
                            <h5 class="font-weight-black text-hoverable mr-2">
                                DATE
                            </h5>
                            <p class="text-caption">
                                September, 2023 <br>
                                5 (Wednesday) to 6 (thursday)
                            </p>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card class="h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5" flat>
                        <div class="w-20 px-2">
                            <v-icon size="25">mdi-clock</v-icon>
                        </div>
                        <div>
                            <h5 class="text-uppercase">
                                Time
                            </h5>
                            <h4 class="font-weight-regular text-caption mt-2">
                                4 (Friday) 9:00 am - 6 (Sunday) 7:00 pm
                            </h4>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card class="h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5" flat>
                        <div class="w-20 px-2">
                            <v-icon size="25">mdi-map-marker</v-icon>
                        </div>
                        <div>
                            <h5 class="text-uppercase">
                                Location
                            </h5>
                            <h4 class="font-weight-regular mt-2">
                                <h4 class="font-weight-regular">{{ event.location.name }}</h4>
                                <p class="text-caption">{{ event.location.address }}</p>
                            </h4>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card class="h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5" flat>
                        <div class="w-20 px-2">
                            <v-icon size="25">mdi-headphones</v-icon>
                        </div>
                        <div>
                            <h5 class="text-uppercase">
                                ORGANIZER
                            </h5>
                            <h4 class="font-weight-regular mt-2">
                                <h4 class="font-weight-regular">{{ event.organizer.name }}</h4>
                                <p class="text-caption">{{ event.organizer.general_contact_details }}</p>
                                <p class="text-caption">{{ event.organizer.physical_address }}</p>
                            </h4>
                        </div>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5" flat>
                        <div class="w-20 px-2">
                            <v-icon size="25">mdi-heart-pulse</v-icon>
                        </div>
                        <div>
                            <h5 class="text-uppercase">
                                HEALTH GUIDLINES
                            </h5>
                            <div class="d-flex flex-wrap mt-3">
                                <v-card flat
                                    class="d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center">
                                    <v-icon size="20">mdi-face-mask</v-icon>
                                    <h5 class="font-weight-regular ml-5">Face mask is required</h5>
                                </v-card>
                                <v-card flat
                                    class="d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center">
                                    <v-icon size="20">mdi-thermometer</v-icon>
                                    <h5 class="font-weight-regular ml-5">Temperature checked at entrance
                                    </h5>
                                </v-card>
                                <v-card flat
                                    class="d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center">
                                    <v-icon size="20">mdi-account-multiple-check</v-icon>
                                    <h5 class="font-weight-regular ml-5">Physical Distance Maintained</h5>
                                </v-card>
                                <v-card flat
                                    class="d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center">
                                    <v-icon size="20">mdi-home-plus</v-icon>
                                    <h5 class="font-weight-regular ml-5">Event area santized</h5>
                                </v-card>
                                <v-card flat
                                    class="d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center">
                                    <v-icon size="20">mdi-needle</v-icon>
                                    <h5 class="font-weight-regular ml-5">Vaccination required</h5>
                                </v-card>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
     <!-- <v-navigation-drawer :model-value="(!(name == 'xs' || name =='sm') || showAttendees) && mobile"  :width="(name == 'xs' || name =='sm')  ? 500:350"  flat location="right">
        <div class="pa-5 h-100 d-flex flex-column">
          <h1 class="mb-2 text-h6 font-weight-medium text-grey-darken-3">
            <v-icon class="mr-1">mdi-account</v-icon>
            Attendees</h1>
          <v-card class="pa-2 mb-2 rounded-lg bg-grey-lighten-3" flat @click="selectedAttendee = student" v-for="student in event.attendees" :key="student.id">
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
          <div v-if="event.attendees.length < 1" class="d-flex w-100 justify-center align-center text-center text-grey-darken-2">
           <h4 class="text-center"> No attendees</h4>
          </div>
          <v-spacer></v-spacer>
          <v-btn class="d-none d-md-flex" prepend-icon="mdi-plus" size="large" color="blue-darken-2" @click="showAddAttendeeDialog = true">Add Attendees</v-btn>
          <v-btn class="d-inline d-md-none d-flex" size="large" color="grey-lighten-4" @click="showAttendees = false">Close</v-btn>
        </div>
    </v-navigation-drawer> -->
    <AddAttendees v-model:show-dialog="showAddAttendeeDialog" :event="event"></AddAttendees>
    <RemoveAttendee v-model:attendee="selectedAttendee"></RemoveAttendee>
    <v-footer app class="py-5 d-flex flex-column" style="z-index: 100;" elevation="5">
      <v-card flat :height="showAttendees ? 500 : 0" style="transition: .1575s ease-in;" class="mb-2 w-100">
        <h3 class="mb-2">
          <v-icon>mdi-account</v-icon>
          Attendee List
        </h3>
        <v-card class="pa-2 mb-2 rounded-lg bg-grey-lighten-3" flat @click="selectedAttendee = student" v-for="student in event.attendees" :key="student.id">
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
      </v-card>
      <div class="w-100 d-flex">
        <v-spacer></v-spacer>
        <v-btn flat class="ml-2" color="primary" @click="showAddAttendeeDialog = true">Add attendees</v-btn>
        <v-btn flat class="ml-2" width="200"  prepend-icon="mdi-chevron-down" color="grey-lighten-5" v-if="!showAttendees" @click="showAttendees = true">Show Attendees</v-btn>
        <v-btn flat class="ml-2" width="200" prepend-icon="mdi-chevron-up" color="grey-lighten-5" v-else @click="showAttendees = false">Hide Attendees</v-btn>
      </div>
    </v-footer>
  </v-container>
</template>

<script setup lang="ts">
import RemoveAttendee from '@/components/RemoveAttendee.vue';
import AddAttendees from '@/components/AddAttendees.vue';
import { useAppStore } from '@/stores/app';
import { useEventStore } from '@/stores/events';
import { getMonth } from '@/utils';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';
import { Ref } from 'vue';
import { Student } from '@/stores/student';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { onBeforeRouteUpdate } from 'vue-router';
const {mobile} = useDisplay()
const {name} = useDisplay()
const selectedAttendee : Ref<Student> = ref({} as Student)
const showAttendees = ref(false)
const showAddAttendeeDialog = ref(false)
const {event, events} = storeToRefs(useEventStore())
const {students} = storeToRefs(useAppStore())
const mode = computed(() => {
    return {
        label: event.value.mode == 'physical' ? 'Physical Class' : event.value.mode == 'online' ? 'Online Class' : 'Physical and Online Class',
        color: event.value.mode == 'physical' ? 'red' : event.value.mode == 'online' ? 'green' : 'blue'
    }
})

const calendar = computed(() => {
    const start_date = new Date(event.value.date_time.event_date_start)
    const end_date = new Date(event.value.date_time.event_date_end)
    console.log(event.value.date_time.event_date_start);

    const month = getMonth(start_date.getMonth())

    return  month + ' ' + start_date.getDate()  + ', 2023' + ' | 4 Days'
})

const time = computed(() => {

    const start_date = new Date(event.value.date_time.event_date_start)
    const end_date = new Date(event.value.date_time.event_date_end)
    const month = getMonth(start_date.getMonth())

    return  '7 AM to 9 PM'
})

const description = computed(() => {
    return event.value.subtitle.length > 200 ? event.value.subtitle.substring(0, 200) + '...' : event.value.subtitle
})

onBeforeRouteUpdate((to, from, next) => {
  //@ts-ignore
  const exists = events.value.find(item => item.id == to.params.event_id)
  if(exists){
    //@ts-ignore
    event.value = exists
    return next()
  }

  return next({name: 'ScheduleIndex'})
})
</script>

<style scoped>

</style>
