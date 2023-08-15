<template>
  <v-navigation-drawer floating width="300">
    <div class="h-100" id="nav">
      <v-list class="pa-5" >
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
      <v-divider></v-divider>
      <v-list class="pa-5">
        <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">
          Courses
        </h5>
        <v-list-item
          class="my-2 rounded-lg"
          color="primary"
          title="View courses"
          :to="{name: 'IndexCourse'}"
          prepend-icon="mdi-book-open"
        >
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list class="pa-5">
        <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">
          Course Category
        </h5>
        <v-list-item
          class="my-2 rounded-lg"
          color="primary"
          title="Categories"
          :to="{name: 'IndexCategory'}"
          prepend-icon="mdi-shape-outline"
        ></v-list-item>
        <v-list-item @click="showCategoryDialog = true" prepend-icon="mdi-plus">Category</v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list class="pa-5">
        <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">
          Sub Category
        </h5>
        <v-list-item
          class="my-2 rounded-lg"
          color="primary"
          title="Sub categories"
          :to="{name: 'IndexSubCategory'}"
          prepend-icon="mdi-file-tree"
        >
        </v-list-item>
        <v-list-item @click="showSubCategoryDialog = true" prepend-icon="mdi-plus">Sub category</v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list class="pa-5">
        <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">
          Others
        </h5>
          <v-switch prepend-icon="mdi-weather-night" v-model="currentMode" label="Dark mode"></v-switch>
      </v-list>
    </div>
    <category-dialog v-model:show-dialog="showCategoryDialog"></category-dialog>
    <SubCategoryDialog v-model:show-dialog="showSubCategoryDialog"></SubCategoryDialog>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import SubCategoryDialog from '../../components/SubCategoryDialog.vue'
import { ref, watch } from 'vue';
import CategoryDialog from '../../components/CategoryDialog.vue'
import { useTheme } from 'vuetify/lib/framework.mjs';
const showCategoryDialog = ref(false)
const showSubCategoryDialog = ref(false)
const theme = useTheme()
const currentMode = ref(theme.global.current.value.dark ? true : false)
const toggleTheme = () => {
  localStorage.setItem('currentTheme', theme.global.current.value.dark ? 'light' : 'dark')
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

watch(() => currentMode.value, () => {
  toggleTheme()
})
</script>

<style scoped>
#nav{
  overflow-y: hidden;
}

#nav:hover{
  overflow-y: scroll;
}
</style>
