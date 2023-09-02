<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts" setup>
import { useEventStore } from '@/stores/events';

const $event = useEventStore()
$event.getEvents()
</script>
<style></style>

