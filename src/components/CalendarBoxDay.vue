<template>
  <v-card variant="outlined" @click="" class="mr-2 my-2 d-flex align-center justify-center"  height="51" color="primary" width="51">{{ day }}</v-card>
</template>

<script setup lang="ts">
const props = defineProps<{day: number}>()
</script>

<style scoped>

</style>