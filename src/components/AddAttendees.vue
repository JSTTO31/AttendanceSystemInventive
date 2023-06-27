<template>
  <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)" width="650">
   <v-card class="pa-2 rounded-lg">
    <v-card-text>
      <h3>Add Attendees</h3>
      <v-text-field class="my-2" single-line hide-details variant="outlined" density="compact" label="Search students..."></v-text-field>
      <v-card color="transparent" flat height="350" style="overflow-y: scroll;">
        <div v-if="!isLoading">
          {{ selectedStudents }}
          <v-card @click="selectedStudents.add(student.id)" class="pa-2 mb-1" flat :key="student.id" v-for="student in students">
            <v-row>
              <v-col cols="1">
                <v-checkbox v-model="selectedStudents" :value="student" hide-details></v-checkbox>
              </v-col>
              <v-col cols="1" class="d-flex align-center">
                <v-avatar class="bg-grey-lighten-2" size="45">
                  <v-img :src="student.image"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="d-flex align-center pl-5">
                <div>
                  <h5>{{ student.first_name }} {{ student.last_name }}</h5>
                  <h6>{{ student.email }}</h6>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <div v-else class="h-100 w-100 d-flex align-center justify-center">
          <v-progress-circular color="primary" indeterminate size="55"></v-progress-circular>
        </div>    
      </v-card>  
      <div class="d-flex mt-5">
        <v-btn color="primary">Add</v-btn>
        <v-btn flat class="mx-2" @click="emits('update:showDialog', false)">Cancel</v-btn>
      </div>
    </v-card-text>
   </v-card>
 </v-dialog>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const {students} = storeToRefs(useStudentStore())
const props = defineProps(['showDialog'])
const emits = defineEmits(['update:showDialog'])
const $student = useStudentStore()
const isLoading = ref(false)
const selectedStudents = ref(new Set()) 
// const addStudent = 

if(students.value.length < 1){
  isLoading.value = true
  $student.getAll().then(() => isLoading.value = false)
}
</script>

<style scoped>

</style>
