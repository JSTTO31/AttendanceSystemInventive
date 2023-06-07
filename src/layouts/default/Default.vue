<template>
  <v-app>
    <default-bar />
    <NavigationBarLeft></NavigationBarLeft>
    <NavigationBarRight></NavigationBarRight>
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import NavigationBarLeft from "./NavigationBarLeft.vue";
import NavigationBarRight from "./NavigationBarRight.vue";
</script>
