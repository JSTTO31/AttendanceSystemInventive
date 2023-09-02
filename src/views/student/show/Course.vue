<template>
  <div class="pt-15 d-flex justify-center" >
    <h3>No courses taken</h3>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
//@ts-ignore
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
