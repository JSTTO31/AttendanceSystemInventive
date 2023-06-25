<template>
  <v-container class="pa-10">
    <h1 class="text-h4 font-weight-bold text-grey-darken-4">Categories</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <v-table hover>
      <thead>
        <tr>
          <th class="text-center">
            ID
          </th>
          <th class="text-center">
            Name
          </th>
          <th class="text-center">
           Date
          </th>
          <th class="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <CategoryTableRow v-for="category in categories" :category="category"></CategoryTableRow>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import CategoryTableRow from '../../components/CategoryTableRow'
import {ref, watch} from 'vue'
import {useCategoryStore} from '../../stores/category'
import { storeToRefs } from 'pinia';
const {categories} = storeToRefs(useCategoryStore())
const $category = useCategoryStore()
const selectedCategory = ref(null)
const showDelete =
$category.getAll()

</script>

<style scoped>

</style>
