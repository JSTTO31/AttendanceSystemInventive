<template>
  <v-dialog  width="450" :model-value="Object.keys(attendee).length > 0" @click:outside="emits('update:attendee', {} as Student)" :disabled="isLoading">
    <v-card class="rounded-lg">
      <v-card-text class="pa-5">
        <h3 class="mb-2">Do you want to remove it?</h3>
        <p class="text-grey-darken-3">
          To remove <b>{{ attendee.first_name }}</b> as an attendee from the event, please click on the 'Remove Attendee' button
        </p>
      </v-card-text>
      <v-card-actions class="mt-5 bg-grey-lighten-4">
        <v-spacer></v-spacer>
        <v-btn variant="elevated" color="error" size="small" @click="submit" :loading="isLoading">Remove Attendee</v-btn>
        <v-btn variant="elevated" color="white" size="small" @click="emits('update:attendee', {})">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useEventStore } from '@/stores/events';
import { Student } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const props = defineProps<{attendee: Student}>()
const emits = defineEmits(['update:attendee'])
const $event = useEventStore()
const {event} = storeToRefs(useEventStore())
const isLoading = ref(false)
const submit = () => {
  isLoading.value = true;
  $event.removeAttendee(event.value.id, props.attendee.id).then(() => {
    isLoading.value = false;
    emits('update:attendee', {})
  })
}
</script>

<style scoped>

</style>
