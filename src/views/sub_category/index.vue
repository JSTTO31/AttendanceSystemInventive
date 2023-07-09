<template>
  <v-container class="pa-5 pa-md-10">
    <h2 class="text-md-h4 font-weight-bold">Sub Categories</h2>
    <p class="text-md-subtitle-1 text-subtitle-2 mb-2 mb-md-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <v-card :width="mobile ? 366 : 'auto'" :style="mobile ? 'overflow-x: scroll;' : ''">
      <v-card flat :width="mobile ? 750 : 'auto'">
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
      </v-card>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import SubCategoryTableRow  from '../../components/SubCategoryTableRow'
import { useSubCategoryStore } from '../../stores/sub_category'
import { storeToRefs } from 'pinia';
const {mobile} = useDisplay()
const $subCategory = useSubCategoryStore()
const {sub_categories} = storeToRefs(useSubCategoryStore())

$subCategory.getAll()
</script>

<style scoped>

</style>
