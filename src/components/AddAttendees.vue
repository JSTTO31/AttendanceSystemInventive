<template>
  <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)" width="600" :fullscreen="name == 'sm' || name=='xs'">
   <v-card class="pa-0 pa-md-2 rounded-lg d-flex flex-column" :disabled="isLoading">
    <v-card-text class="h-100 d-flex flex-column">
      <h2 class="mb-5 font-weight-medium d-flex align-center">
        <v-icon class="mr-2">mdi-account-plus</v-icon>Add Attendees
      </h2>
      <v-card color="transparent" flat height="350" style="overflow-y: auto;">
        <v-card class="px-2 mb-1" flat>
          <v-row>
            <v-col md="1" cols="2">
              <v-checkbox @click="selectAll" color="primary" hide-details></v-checkbox>
            </v-col>
            <v-col>   <v-text-field class="my-2" single-line hide-details variant="outlined" density="compact" label="Search students..." v-model="search"></v-text-field></v-col>
          </v-row>
        </v-card>
        <AddAttendeeStudentList v-model:selected-students="selectedStudents" v-for="student in searchedStudent" :key="student.id" :student="student"></AddAttendeeStudentList>
        <div v-if="searchedStudent.length < 1" class="h-100 d-flex align-center justify-center">
          <span class="d-flex align-center">
            <v-icon class="mr-2">mdi-school</v-icon>
            No students</span>
        </div>
      </v-card>
      <v-spacer></v-spacer>
      <div class="d-flex mt-5">
        <v-spacer class="d-block d-md-none"></v-spacer>
        <v-btn color="primary" @click="submit" class="text-capitalize" :disabled="selectedStudents.length < 1" :loading="isLoading">Add Attendee</v-btn>
        <v-btn flat class="mx-2 text-capitalize" @click="emits('update:showDialog', false)">Cancel</v-btn>
      </div>
    </v-card-text>
    <span style="position: absolute;top: 15px;right: 15px">
      <v-btn icon="mdi-close" @click="emits('update:showDialog', false)"></v-btn>
    </span>
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
import { useDisplay } from 'vuetify/lib/framework.mjs';
const {name} = useDisplay()
const $event = useEventStore()
const {students} = storeToRefs(useAppStore())
const props = defineProps(['showDialog', 'event'])
const emits = defineEmits(['update:showDialog'])
const selectedStudents : Ref<Student[]> = ref([])
const isSelectedAll = computed(() => selectedStudents.value == students.value)
const selectAll = () => {
  if(isSelectedAll.value){
    selectedStudents.value = []
    return
  }

  selectedStudents.value = students.value
}
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
