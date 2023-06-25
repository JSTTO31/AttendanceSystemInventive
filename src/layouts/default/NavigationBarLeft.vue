<template>
  <v-navigation-drawer>
    <v-list class="pa-5">
      <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">
        Attendance Management
      </h5>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        @click="$router.push({ name: 'Home' })"
        :active="$route.name == 'Home'"
        title="Dashboard"
        prepend-icon="mdi-view-dashboard-outline"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        :to="{ name: 'IndexStudent' }"
        title="Students"
        prepend-icon="mdi-school"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        title="Add student"
        :to="{ name: 'CreateStudent' }"
        prepend-icon="mdi-plus"
      >
      </v-list-item>
    </v-list>
    <v-list class="pa-5">
      <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">
        Courses
      </h5>
      <!-- <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        title="Categories"
        :to="{name: 'IndexCategory'}"
        prepend-icon="mdi-shape-outline"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        title="Sub categories"
        :to="{name: 'IndexSubCategory'}"

        prepend-icon="mdi-file-tree"
      >
      </v-list-item> -->
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        title="View courses"
        :to="{name: 'IndexCourse'}"
        prepend-icon="mdi-book-open"
      >
      </v-list-item>
      <!-- <v-menu location="left" open-on-hover open-on-click>
        <template #activator="{props}">
        <v-list-item
          class="my-2 rounded-lg"
          color="primary"
          title="Add course"
          prepend-icon="mdi-plus"
          v-bind="props"
          style="user-select: none;"
          @click=""
        >
        </v-list-item>
      </template>
      <v-card width="250" class="rounded-lg pa-2">
        <v-list>
          <h4 class="px-4">
            Create new
          </h4>
          <v-list-item @click="showCategoryDialog = true" prepend-icon="mdi-plus">Category</v-list-item>
          <v-list-item @click="showSubCategoryDialog = true" prepend-icon="mdi-plus">Sub category</v-list-item>
          <v-list-item @click="" prepend-icon="mdi-plus">Course</v-list-item>
        </v-list>
      </v-card>
      </v-menu> -->
    </v-list>

    <category-dialog v-model:show-dialog="showCategoryDialog"></category-dialog>
    <SubCategoryDialog v-model:show-dialog="showSubCategoryDialog"></SubCategoryDialog>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import SubCategoryDialog from '../../components/SubCategoryDialog.vue'
import { ref } from 'vue';
import CategoryDialog from '../../components/CategoryDialog.vue'
const showCategoryDialog = ref(false)
const showSubCategoryDialog = ref(false)
</script>

<style scoped></style>
