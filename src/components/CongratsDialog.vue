<template>
  <v-dialog width="650" :model-value="true"   style="z-index: 50055;" scrim="transparent">
    <v-card class="rounded-xl d-flex flex-column align-center pa-15" >
      <v-avatar class="mb-5" size="150">
        <v-img src="/src/assets/cracker.png"></v-img>
      </v-avatar>
      <h1 class="text-h4 mb-5">Congratulations!🎊</h1>
      <p class="text-h5 text-justify">Congratulations to <span id="randomName">{{ $route.query.name || 'John Doe' }}</span> for successfully completing their On-the-Job Training (OJT). We're proud of your achievements!</p>
    </v-card>
  </v-dialog>
  <ConfettiItem v-for="n in 150" :key="n"></ConfettiItem>

</template>

<script setup lang="ts">
import ConfettiItem from '@/components/ConfettiItem.vue'
</script>

<style scoped>

</style>
