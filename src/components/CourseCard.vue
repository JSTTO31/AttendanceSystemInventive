<template>
  <v-hover v-slot="{props, isHovering}">
    <v-card class="my-2 rounded-0" :elevation="isHovering ? 0 : 5" v-bind="props">
      <v-img :src="course.image"></v-img>
      <v-card-text>
        <v-chip class="mb-2 pa-0" :size="mobile ? 'small' : 'default'" variant="text">{{ course.sub_category.name }}</v-chip>
        <h3 class="text-capitalize text-md-h6 font-weight-medium">{{ course.name }}</h3>
        <p class="my-2">{{ course.description }}</p>
        <div class="d-flex flex-column flex-md-row mt-2">
          <h5 class="text-subtitle-md-1">
            <v-icon>mdi-calendar</v-icon>
            Day <span v-if="course.number_of_session > 1">1 -</span> {{ course.number_of_session }}
          </h5>
          <v-spacer></v-spacer>
          <v-chip v-if="false">+{{ course.sub_category_id }}</v-chip>
          <span class="mt-2 mt-md-0 text-grey-darken-2">No attendees</span>
        </div>
      </v-card-text>
      <span id="menu-button">
        <v-menu location="bottom right">
          <template #activator="{props}">
            <v-btn icon="mdi-dots-vertical" variant="text" size="small" class="ma-1" color="white" v-bind="props"></v-btn>
          </template>
          <v-card width="200">
            <v-list>
              <v-list-item @click="$router.push({name: 'AddAttendeesCourse', params: {course_id: course.id, sub_category_id: course.sub_category_id}})" prepend-icon="mdi-plus">Add attendees</v-list-item>
              <v-list-item @click="showEditDialog = true" prepend-icon="mdi-pencil">Edit</v-list-item>
              <v-list-item @click="showDeleteDialog = true" prepend-icon="mdi-trash-can">Delete</v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </span>
      <div class="px-5 pb-5">
      </div>
      <!-- <v-overlay :model-value="isHovering" contained class="d-flex align-center justify-center">
          <v-btn block class="rounded-0 my-2" @click="$router.push({name: 'AddAttendeesCourse', params: {course_id: course.id, sub_category_id: course.sub_category_id}})" prepend-icon="mdi-plus">Add attendees</v-btn>
          <v-btn block class="rounded-0 my-2" @click="showEditDialog = true" prepend-icon="mdi-pencil">Edit</v-btn>
          <v-btn block class="rounded-0 my-2" @click="showDeleteDialog = true" prepend-icon="mdi-trash-can">Delete</v-btn>
      </v-overlay> -->
      <DeleteCourseDialog v-model:show-dialog="showDeleteDialog" :course="course"></DeleteCourseDialog>
      <EditCategoryDialog v-model:show-dialog="showEditDialog" :course="course"></EditCategoryDialog>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import EditCategoryDialog from './EditCourseDialog.vue'
import { ref } from 'vue';
import DeleteCourseDialog from '../components/DeleteCourseDialog.vue'
import { Course } from '@/stores/course';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const showDeleteDialog = ref(false)
const showEditDialog = ref(false)
const props = defineProps<{course: Course}>()
const {mobile} = useDisplay()
</script>

<style scoped>
#menu-button{
  position: absolute;
  top: 0;
  right: 0
}
</style>
