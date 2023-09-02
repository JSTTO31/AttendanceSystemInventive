<template>
  <v-main class="bg-blue-grey-lighten-5">
      <router-view v-slot="{Component}">
        <transition name="slide" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
  </v-main>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify/lib/framework.mjs';

const {current} = useTheme()
</script>

<style scoped>
.slide-enter-active, .slide-leave-active{
  transition: transform .15s ease-in-out, opacity .05s linear;
}
.slide-enter-from, .slide-leave-to{
  transform: translateX(-10%);
  opacity: 0;
}
</style>
