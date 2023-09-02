<template>
  <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)" width="650">
   <v-card class="pa-2 rounded-lg" :disabled="isLoading">
    <v-card-text>
      <h2 class="mb-5 font-weight-medium d-flex align-center">
        <v-icon class="mr-2">mdi-account-plus</v-icon>Add Attendees
      </h2>
      <v-text-field class="my-2" single-line hide-details variant="outlined" density="compact" label="Search students..." v-model="search"></v-text-field>
      <v-card color="transparent" flat height="350" style="overflow-y: auto;">
        <AddAttendeeStudentList v-model:selected-students="selectedStudents" v-for="student in searchedStudent" :key="student.id" :student="student"></AddAttendeeStudentList>
        <div v-if="searchedStudent.length < 1" class="h-100 d-flex align-center justify-center">
          <span class="d-flex align-center">
            <v-icon class="mr-2">mdi-school</v-icon>
            No students</span>
        </div>
      </v-card>
      <div class="d-flex mt-5">
        <v-btn color="primary" @click="submit" :disabled="selectedStudents.length < 1" :loading="isLoading">Add</v-btn>
        <v-btn flat class="mx-2" @click="emits('update:showDialog', false)">Cancel</v-btn>
      </div>
    </v-card-text>
   </v-card>
 </v-dialog>
</template>

<script setup lang="ts">
import {useEventStore} from '@/stores/events'
import AddAttendeeStudentList from './AddAttendeeStudentList.vue';
import { Student } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { computed, ref, Ref } from 'vue';
import { useAppStore } from "@/stores/app";
const $event = useEventStore()
const {students} = storeToRefs(useAppStore())
const props = defineProps(['showDialog', 'event'])
const emits = defineEmits(['update:showDialog'])
const selectedStudents : Ref<Student[]> = ref([])
const search = ref('')
const searchedStudent = computed(() => students.value
  .filter(item => !props.event.attendees.some((attendee: Student) => attendee.id == item.id))
  .filter(item =>
  item.first_name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
  item.last_name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
  !search.value))
const isLoading = ref(false)
const submit = () => {
  isLoading.value = true
  $event.addAttendees(selectedStudents.value).then(() => {
    isLoading.value = false
    emits('update:showDialog', false)
  });
}

</script>

<style scoped>

</style>
