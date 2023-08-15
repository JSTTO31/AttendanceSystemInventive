<template>
  <v-app>
    <default-bar />
    <NavigationBarLeft></NavigationBarLeft>
    <NavigationBarRight></NavigationBarRight>
    <default-view />
    <!-- <LoadingOverlayVue :show="isLoading"></LoadingOverlayVue> -->
    <v-banner :class="mobile ? 'banner-mobile' : 'banner'" elevation="5" v-if="showNetworkError">
      <template #prepend>
        <v-icon size="35">mdi-server-network-off</v-icon>
      </template>
      <v-banner-text>
        Its seems the server is not working, please turn it on and refresh the page.
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
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import NavigationBarLeft from "./NavigationBarLeft.vue";
import NavigationBarRight from "./NavigationBarRight.vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/app";
import { ref } from "vue";
import { api } from "@/utils";
import { useDisplay } from "vuetify/lib/framework.mjs";
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
