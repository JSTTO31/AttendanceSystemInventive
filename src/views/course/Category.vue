<template>
  <h1 class="d-flex align-center">
    <v-icon @click="$router.push({name: 'IndexCourse'})">mdi-chevron-left</v-icon>
    {{ category.name }}</h1>
  <div class="d-flex align-center mt-3">
    <v-chip class="mx-1" variant="outlined" color="primary" @click="">All</v-chip>
    <v-chip class="mx-1" variant="outlined" color="primary" @click="" v-for="sub in category.sub_categories" :key="sub.id">{{ sub.name }}</v-chip>
  </div>
  <div class="h-75 d-flex flex-column align-center justify-center">
    <h3 class="mb-2">No course record</h3>
    <v-btn prepend-icon="mdi-plus" flat @click="showAddCourseDialog = true">Add course</v-btn>
  </div>
  {{ category.sub_categories }}
  <AddCourseDialog v-model:show-dialog="showAddCourseDialog"></AddCourseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddCourseDialog from '../../components/AddCourseDialog.vue'
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
const showAddCourseDialog = ref(false)
const {category} = storeToRefs(useCategoryStore())
</script>

<style scoped>

</style>
