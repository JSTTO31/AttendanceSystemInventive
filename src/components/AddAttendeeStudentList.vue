<template>
   <v-card class="pa-2 mb-1" flat @click="check">
    <v-row>
      <v-col md="1" cols="2">
        <v-checkbox color="primary" :model-value="selectedStudents" @change="check" :value="student" hide-details></v-checkbox>
      </v-col>
      <v-col md="1" cols="2" class="d-flex align-center">
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
</template>

<script setup lang="ts">
import { Student } from '@/stores/student';
import { computed } from 'vue';
const props = defineProps<{student: Student, selectedStudents: Student[]}>()
const emits = defineEmits(['update:selectedStudents'])
const isChecked = computed(() => props.selectedStudents.some(item => item.id == props.student.id))
const check = () => {
  if(!isChecked.value){
    let newSelectedStudent = props.selectedStudents.slice()
    newSelectedStudent.push(props.student)
    emits('update:selectedStudents', newSelectedStudent)
  }else{
    let newSelectedStudent = props.selectedStudents.slice()
    newSelectedStudent = newSelectedStudent.filter(item => item.id != props.student.id)
    emits('update:selectedStudents', newSelectedStudent)
  }
}

</script>

<style scoped>

</style>
