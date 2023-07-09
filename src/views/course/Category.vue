<template>
  <h3 class="d-flex align-center text-md-h4 font-weight-medium">
    <v-icon @click="$router.push({name: 'IndexCourse'})">mdi-chevron-left</v-icon>
    {{ category.name }}
    <v-spacer></v-spacer>
    <v-btn :size="mobile ? 'x-small' : 'default'" color="primary" prepend-icon="mdi-plus" flat @click="showAddCourseDialog = true">Add course</v-btn>
  </h3>
  <div class="d-flex align-center mt-3">
    <v-tabs density="compact" hide-slider>
      <v-tab class="rounded-pill mx-1" :variant="selectedSubCategory == 0 ? 'elevated' : 'outlined'" color="primary" @click="selectedSubCategory = 0">All</v-tab>
      <v-tab class="rounded-pill mx-1" :variant="selectedSubCategory == sub.id ? 'elevated' : 'outlined'" color="primary" @click="selectedSubCategory = sub.id" v-for="sub in category.sub_categories" :key="sub.id">{{ sub.name }}</v-tab>
    </v-tabs>
  </div>
  <div class="mt-5">
    <v-row>
        <v-col :cols="mobile ? 6 : 3" :key="course.id" v-for="course in courses">
          <CourseCard :course="course" :key="course.id"></CourseCard>
        </v-col>
    </v-row>
  </div>
  <div class="h-75 d-flex flex-column align-center justify-center" v-if="courses.length < 1">
    <h3 class="mb-2">No course record</h3>
    <v-btn prepend-icon="mdi-plus" flat @click="showAddCourseDialog = true">Add course</v-btn>
  </div>
  <v-dialog :fullscreen="mobile" width="650" persistent :model-value="$route.name == 'AddAttendeesCourse'">
    <router-view></router-view>
  </v-dialog>
  <AddCourseDialog v-model:show-dialog="showAddCourseDialog"></AddCourseDialog>
</template>

<script setup lang="ts">
import AddCourseDialog from '@/components/AddCourseDialog.vue';
import CourseCard from '../../components/CourseCard.vue'
import { ref } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const {mobile} = useDisplay()
const showAddCourseDialog = ref(false)
const {category} = storeToRefs(useCategoryStore())
const selectedSubCategory = ref(0);
const courses = computed(() => {
  if(selectedSubCategory.value > 0){
    //@ts-ignore
    return category.value.sub_categories.find(item => item.id == selectedSubCategory.value).courses
  }else{
    const container : any = [];
    category.value.sub_categories.map(item => container.push(...item.courses))
    return container
  }
})
</script>

<style scoped>

</style>
