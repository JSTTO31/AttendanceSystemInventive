<template>
  <v-app style="margin: 0px !important">
    <NavigationBarLeft></NavigationBarLeft>
    <NavigationBarRight></NavigationBarRight>
    <default-bar v-model:show-menu="showMenu" />
    <v-card style="z-index: 500;" flat @vue:mounted="teleportIsMounted = true" id="teleport">
    </v-card>
    <default-view />
    <v-navigation-drawer style="z-index: 5000;"  class="w-100" v-model="showMenu" v-if="mobile">
      <v-list class=" d-flex flex-column">
          <h1 class="pa-2 px-5">Menu List</h1>
          <v-list-item
            class="py-5 rounded-0"
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
            class=" py-5 rounded-0"
            elevation="0"
            title="Attendance"
            :active="$route.name == 'attendanceIndex'"
            @click="$router.push({ name: 'attendanceIndex' })"
            prepend-icon="mdi-finance"
          >
          </v-list-item>
          <v-list-item
            active-class="bg-primary"
            class=" py-5 rounded-0"
            elevation="0"
            title="Schedule"
            prepend-icon="mdi-calendar-outline"
            :active="$route.name == 'ScheduleIndex'"
            @click="$router.push({ name: 'ScheduleIndex' })"
          >
          </v-list-item>
          <v-list-item
            active-class="bg-primary"
            class=" py-5 rounded-0"
            elevation="0"
            :to="{ name: 'IndexStudent' }"
            title="Students"
            prepend-icon="mdi-school"
          >
          </v-list-item>
          <v-list-item
            active-class="bg-primary"
            class=" py-5 rounded-0"
            elevation="0"
            title="Add student"
            :to="{ name: 'CreateStudent' }"
            prepend-icon="mdi-plus"
          >
          </v-list-item>
          <v-list-item
              class="my-2 rounded-0"
              elevation="0"
              color="primary"
              title="Logout"
              prepend-icon="mdi-logout"
              @click="$user.logout()"
            >
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-banner :class="mobile ? 'banner-mobile' : 'banner'" elevation="5" v-if="showNetworkError" style="z-index: 5000;">
      <template #prepend>
        <v-icon size="35">mdi-server-network-off</v-icon>
      </template>
      <v-banner-text>
        Its seems the server is not working properly, please turn it on and refresh the page.
      </v-banner-text>
      <v-banner-actions>
        <v-btn @click="reload" color="primary">Refresh</v-btn>
        <v-btn @click="showNetworkError = false">Dismiss</v-btn>
      </v-banner-actions>
    </v-banner>
    <v-dialog width="300" :model-value="!!$route.query?.success || false" @click="$router.push({query: {}})">
      <v-card color="success" variant="elevated" class="d-flex rounded-lg pa-10 align-center justify-center flex-column">
          <v-icon size="70">mdi-check-circle-outline</v-icon>
          <h2 class="font-weight-regular text-center mt-3 text-wrap">{{ $route.query.message }}</h2>
      </v-card>
    </v-dialog>
    <v-dialog width="300" :model-value="!!$route.query?.error || false" @click="$router.push({query: {}})">
      <v-card color="error" variant="elevated" class="d-flex rounded-lg py-10 align-center justify-center flex-column">
          <v-icon size="70">mdi-cancel</v-icon>
          <h2 class="font-weight-regular mt-3 text-wrap text-center">{{ $route.query.message }}</h2>
      </v-card>
    </v-dialog>
    <CongratsDialog v-if="$route.query.type == 'completed' && $route.query.name"></CongratsDialog>
  </v-app>
</template>

<script lang="ts" setup>
import CongratsDialog from "@/components/CongratsDialog.vue";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import NavigationBarLeft from "./NavigationBarLeft.vue";
import NavigationBarRight from "./NavigationBarRight.vue";
import { ref, provide } from "vue";
import { api } from "@/utils";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
const teleportIsMounted = ref(false)
provide('teleport-is-mounted', teleportIsMounted)
const showMenu = ref(false)
const $user = useUserStore()
const {mobile} = useDisplay()
const showNetworkError = ref(false)
const reload = () => window.location.reload()
//@ts-ignore
api.interceptors.response.use(response => {
  return response
}, error => {
  if(error.message == 'Network Error'){
    showNetworkError.value = true
  }
  return Promise.reject(error)
})
</script>
<style scoped>
.banner{
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 2000;
  width: 450px;
}
.banner-mobile{
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2000;
  width: 100%;
}
</style>
