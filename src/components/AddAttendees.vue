<template>
  <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)" width="650">
   <v-card class="pa-2 rounded-lg">
    <v-card-text>
      <h3>Add Attendees</h3>
      <v-text-field class="my-2" single-line hide-details variant="outlined" density="compact" label="Search students..." v-model="search"></v-text-field>
      <v-card color="transparent" flat height="350" style="overflow-y: scroll;">
        <AddAttendeeStudentList v-model:selected-students="selectedStudents" v-for="student in searchedStudent" :key="student.id" :student="student"></AddAttendeeStudentList>
        <div v-if="searchedStudent.length < 1" class="h-100 d-flex align-center justify-center">
          <span class="d-flex align-center">
            <v-icon class="mr-2">mdi-school</v-icon>
            No students</span>
        </div>
      </v-card>
      <div class="d-flex mt-5">
        <v-btn color="primary" @click="submit" :disabled="selectedStudents.length < 1">Add</v-btn>
        <v-btn flat class="mx-2" @click="emits('update:showDialog', false)">Cancel</v-btn>
        <v-spacer></v-spacer>
        <VueDatePicker
          v-model="date"
          class="w-50"
          :clearable="false"
          id="start"
          auto-apply
          placeholder="Start date"
          dark
        ></VueDatePicker>
      </div>
    </v-card-text>
   </v-card>
 </v-dialog>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import AddAttendeeStudentList from './AddAttendeeStudentList.vue';
import { Student, useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { computed, ref, Ref, onMounted } from 'vue';
import { useCourseStore } from "@/stores/course";
const $course = useCourseStore()
const {students} = storeToRefs(useStudentStore())
const props = defineProps(['showDialog', 'course'])
const emits = defineEmits(['update:showDialog'])
const selectedStudents : Ref<Student[]> = ref([])
const date = ref(new Date())
const search = ref('')
const searchedStudent = computed(() => students.value.filter(item =>
  item.first_name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
  item.last_name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
  !search.value))
const submit = () => {
  $course.add_attendee(props.course.id, selectedStudents.value[0].id, date.value)
}

onMounted(() => {
  console.log('triggered');
  
})
</script>

<style scoped>

</style>
