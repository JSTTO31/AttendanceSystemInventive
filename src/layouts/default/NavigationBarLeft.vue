<template>
  <v-navigation-drawer width="280" floating v-if="!mobile">
    <div style="background-color: #000f1f;z-index: 2000;" class="h-100 pt-5 d-flex flex-column" id="nav">
      <h2 class="text-md-h5 pa-5 font-weight-bold d-flex justify-center" style="cursor: pointer;font-family: 'Poppins', sans-serif !important;font-weight: 600;" @click="$router.push({name: 'Home'})">
        <v-avatar class="mr-1 rounded-0 mb-3" size="50">
          <v-img src="/src/assets/eAttendance-logo.png"></v-img>
        </v-avatar>
        <div style="line-height: 1.3;" class="text-h5 ml-2 justify-center pb-2 font-weight-bold d-flex flex-column">
          <span class="text-white font-weight-medium">eAttendance</span>
          <v-card width="120" flat class="ml-5 bg-transparent">
            <v-img src="/src/assets/Inventive-logo white version.png"></v-img>
          </v-card>
        </div>
      </h2>
      <v-list class="pa-5">
        <v-list-item
          class="text-white my-2 rounded-lg"
          elevation="0"
          active-class="bg-primary"
          @click="$router.push({ name: 'Home' })"
          :active="$route.name == 'Home'"
          title="Dashboard"
          prepend-icon="mdi-view-dashboard-outline"
        >
        </v-list-item>
        <v-list-item
          active-class="bg-primary"
          class=" text-white my-2 rounded-lg"
          elevation="0"
          title="Attendance"
          :active="$route.name == 'attendanceIndex'"
          @click="$router.push({ name: 'attendanceIndex' })"
          prepend-icon="mdi-finance"
        >
        </v-list-item>
        <v-list-item
          active-class="bg-primary"
          class=" text-white my-2 rounded-lg"
          elevation="0"
          title="Schedule"
          prepend-icon="mdi-calendar-outline"
          :active="$route.name == 'ScheduleIndex'"
          @click="$router.push({ name: 'ScheduleIndex' })"
        >
        </v-list-item>
        <v-list-item
          active-class="bg-primary"
          class=" text-white my-2 rounded-lg"
          elevation="0"
          :to="{ name: 'IndexStudent' }"
          title="Students"
          prepend-icon="mdi-school"
        >
        </v-list-item>
        <v-list-item
          active-class="bg-primary"
          class=" text-white my-2 rounded-lg"
          elevation="0"
          title="Add student"
          :to="{ name: 'CreateStudent' }"
          prepend-icon="mdi-plus"
        >
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-list class="pa-5">
          <!-- <v-list-item>
          <v-switch prepend-icon="mdi-weather-night" hide-details v-model="currentMode" label="Dark mode"></v-switch>
        </v-list-item> -->
        <v-list-item
            @click="$user.logout()"
            class=" text-white rounded-lg"
            elevation="0"
            color="primary"
            title="Logout"
            prepend-icon="mdi-logout"
          >
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDisplay, useTheme } from 'vuetify/lib/framework.mjs';
import { useUserStore } from '@/stores/user';
const {mobile} = useDisplay()
const $user = useUserStore()
const theme = useTheme()
const currentMode = ref(theme.global.current.value.dark ? true : false)
const toggleTheme = () => {
  localStorage.setItem('currentTheme', theme.global.current.value.dark ? 'light' : 'dark')
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

watch(() => currentMode.value, () => {
  toggleTheme()
})
</script>

<style scoped>

</style>
