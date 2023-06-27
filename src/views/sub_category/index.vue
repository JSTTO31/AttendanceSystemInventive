<template>
  <v-container class="pa-10">
    <h1 class="text-h4 font-weight-bold">Sub Categories</h1>
    <p class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <v-table hover class="mt-5">
      <thead>
        <tr>
          <th class="text-center">
            ID
          </th>
          <th class="text-center">
            Name
          </th>
          <th class="text-center">
            Category
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
          <SubCategoryTableRow v-for="sub_category in sub_categories" :key="sub_category.id" :sub_category="sub_category"></SubCategoryTableRow>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import SubCategoryTableRow  from '../../components/SubCategoryTableRow'
import { useSubCategoryStore } from '../../stores/sub_category'
import { storeToRefs } from 'pinia';
const $subCategory = useSubCategoryStore()
const {sub_categories} = storeToRefs(useSubCategoryStore())

$subCategory.getAll()
</script>

<style scoped>

</style>
