<template>
  <v-card class="pa-2 rounded-lg" v-if="!isLoading">
    <v-card-text>
      <h3>Add Attendees</h3>
      <v-text-field class="my-2" single-line hide-details variant="outlined" density="compact" label="Search students..." v-model="search"></v-text-field>
      <v-card color="transparent" flat height="400" style="overflow-y: scroll;">
        <AddAttendeeStudentList v-model:selected-students="selectedStudents" v-for="student in searchedStudent" :key="student.id" :student="student"></AddAttendeeStudentList>
        <div v-if="searchedStudent.length < 1" class="h-100 d-flex align-center justify-center">
          <span class="d-flex align-center">
            <v-icon class="mr-2">mdi-school</v-icon>
            No students</span>
        </div>
      </v-card>
      <div class="d-flex mt-5">
        <v-btn color="primary" @click="submit" :disabled="selectedStudents.length < 1">Add</v-btn>
        <v-btn flat class="mx-2" @click="$router.push({name: 'CategoryCourse', params: {category_id: $route.params.category_id}})">Cancel</v-btn>
        <v-spacer></v-spacer>
        <VueDatePicker
          v-model="date"
          class="w-50"
          :clearable="false"
          id="start"
          auto-apply
          placeholder="Start date"
          :dark="current.dark"
        ></VueDatePicker>
      </div>
    </v-card-text>
    <span style="position:absolute;top: 5px;right: 5px">
      <v-btn icon="mdi-close" flat @click="$router.push({name: 'CategoryCourse', params: {category_id: $route.params.category_id}})"></v-btn>
    </span>
   </v-card>
   <v-card v-else height="500" @click.capture elevation="0">
    <v-card height="150" width="450" flat class="my-auto mx-auto d-flex align-center">
      <v-container>
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <v-col
            class="text-subtitle-1 text-center"
            cols="12"
          >
            Loading
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="deep-purple-accent-4"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
   </v-card>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import AddAttendeeStudentList from '../../components/AddAttendeeStudentList.vue';
import { Student, useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { computed, ref, Ref } from 'vue';
import { useCourseStore } from "@/stores/course";
import { useRoute, useRouter } from "vue-router";
import { useTheme } from "vuetify/lib/framework.mjs";
const $student = useStudentStore();
const $course = useCourseStore()
const {students} = storeToRefs(useStudentStore())
const props = defineProps(['course'])
const selectedStudents : Ref<Student[]> = ref([])
const {current} = useTheme()
const date = ref(new Date())
const search = ref('')
const isLoading = ref(false)
const router = useRouter()
const route = useRoute()
const searchedStudent = computed(() => students.value.filter(item =>
  item.first_name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
  item.last_name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
  !search.value))
const submit = () => {
  isLoading.value = true
  const container : any = []
  selectedStudents.value.forEach(student => {
    container.push(
      $course.add_attendee(props.course.id, student.id, date.value)
    )
  })

  return Promise.all(container).then(() => {
    router.push({name: 'CategoryCourse', params: {category_id: route.params.category_id}, query: {success: 'true', message: 'Successfully Added!'}})
  })
}

$student.getAll('?course_id=' + route.params.course_id)
</script>

<style scoped>

</style>
