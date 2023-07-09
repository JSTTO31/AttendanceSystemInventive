<template>
  <v-container class="pa-5 pa-md-10">
    <h2 class="text-md-h4 font-weight-bold">Categories</h2>
    <p class="text-md-subtitle-1 text-subtitle-2 mb-2 mb-md-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <v-card :width="mobile ? 366 : 'auto'" :style="mobile ? 'overflow-x: scroll;' : ''">
      <v-card flat :width="mobile ? 550 : 'auto'">
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
      </v-card>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
//@ts-ignore
import CategoryTableRow from '../../components/CategoryTableRow'
import {ref, watch} from 'vue'
import {useCategoryStore} from '../../stores/category'
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const {mobile} = useDisplay()
const {categories} = storeToRefs(useCategoryStore())
const $category = useCategoryStore()
const selectedCategory = ref(null)
const showDelete =
$category.getAll()

</script>

<style scoped>

</style>
