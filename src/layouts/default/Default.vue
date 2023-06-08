<template>
  <v-app>
    <default-bar />
    <NavigationBarLeft></NavigationBarLeft>
    <NavigationBarRight></NavigationBarRight>
    <default-view />
    <LoadingOverlayVue :show="isLoading"></LoadingOverlayVue>
  </v-app>
</template>

<script lang="ts" setup>
import LoadingOverlayVue from "@/components/LoadingOverlay.vue";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import NavigationBarLeft from "./NavigationBarLeft.vue";
import NavigationBarRight from "./NavigationBarRight.vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/app";
const {isLoading} = storeToRefs(useAppStore())
</script>
