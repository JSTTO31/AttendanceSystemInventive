<template>
  <v-card class="pa-5 rounded-0 mb-2" :loading="isLoading" :disabled="isLoading">
    <v-row>
      <v-col cols="2">
        <v-img :src="course.image"></v-img>
      </v-col>
      <v-col cols="10">
        <h5 class="d-flex">
          {{ course.sub_category.name }} 
          <v-spacer></v-spacer>
          <h3>
            <v-icon>mdi-calendar</v-icon>
            Day <span v-if="course.number_of_session > 1">1 -</span> {{ course.number_of_session }}
          </h3>
        </h5>
        <h2>{{ course.name }}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint similique alias hic cumque quam eligendi excepturi libero eius accusamus ea assumenda odio unde, deserunt ullam magni! Doloribus deserunt fugit voluptates.</p>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" prepend-icon="mdi-trash-can" @click="submit">Remove</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Course, useCourseStore } from '@/stores/course';
import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
const {student} = storeToRefs(useStudentStore())
const $course = useCourseStore()
const props = defineProps<{course: Course}>()
const isLoading = ref(false)
const submit = () => {
  isLoading.value = true
  $course.remove_attendee(props.course.id, student.value.id).then(() => {
    isLoading.value = false
  })
}
</script>

<style scoped>

</style>