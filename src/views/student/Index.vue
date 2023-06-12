<template>
  <v-container class="pa-10">
    <h1 class="text-h4 font-weight-bold text-grey-darken-4">Students</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <div class="mt-4">
      <div class="w-100 d-flex align-center justify-space-between">
        <div class="w-50 d-flex align-center">
          <v-text-field density="compact" v-model="search" @keyup.enter="searchSubmit" color="primary" hide-details variant="outlined" single-line  label="Find student..."></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <v-tabs v-model="selectedTab" color="primary">
          <v-tab class="text-capitalize" value="" @click="router.push({query: {filter: ''}})">Ongoing</v-tab>
          <v-tab class="text-capitalize" value="completed" @click="router.push({query: {filter: 'completed'}})">Completed</v-tab>
          <v-tab class="text-capitalize" value="all_students" @click="router.push({query: {filter: 'all_students'}})">All students</v-tab>
        </v-tabs>
      </div>
      <v-card flat class="mt-2 bg-blue py-2 mb-1">
        <v-row>
          <v-col class="d-flex align-center" cols="4">
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"><v-icon class="mr-2">mdi-clock-in</v-icon>Clock in</span>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"><v-icon class="mr-2">mdi-clock-out</v-icon>Clock out</span>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"><v-icon class="mr-2">mdi-update</v-icon>Work time</span>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="2">
            <span class="font-weight-medium mr-2"><v-icon class="mr-2">mdi-clock-fast</v-icon>Remaining</span>
          </v-col>
        </v-row>
      </v-card>
      <StudentListItemVue v-for="student in students" :key="student.id" :student="student"></StudentListItemVue>
      <div class="d-flex align-center mt-5" v-if="Math.ceil(pageOptions.total / pageOptions.per_page) > 1">
        <div>
          Page {{page}} / {{ pageOptions.total / pageOptions.per_page }}
        </div>
        <v-spacer></v-spacer>
          <v-pagination  v-model="page" :length="Math.ceil(pageOptions.total / pageOptions.per_page)" color="primary"></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import StudentListItemVue from "@/components/StudentListItem.vue";
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
const selectedTab = ref(route.query.filter || '')
const { students, pageOptions } = storeToRefs(useStudentStore());
const $student = useStudentStore()
const page = ref(parseInt(route.query.page?.toString() || '1'))
const search = ref('')
const searchSubmit = () => {
  router.push({query: {search: search.value}})
}

watch(() => page.value, () => {
  router.push({query: {page: page.value}})
})


onBeforeRouteUpdate((to, from, next) => {
  //@ts-ignore
  const query = to.fullPath.match(/\?.*/ig)
  if(!!query)
  {
  console.log('triggered');
    console.log(query[0]);
    
    $student.getAll(query[0]).then(() => {
      return next()
    })

    return
  }
  

  return next()
})
</script>

<style scoped></style>
