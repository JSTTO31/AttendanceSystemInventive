<template>
  <v-container class="pa-5 pa-md-10">
    <h2 class="text-md-h4 font-weight-bold">Sub Categories</h2>
    <p class="text-md-subtitle-1 text-subtitle-2 mb-2 mb-md-0">Here's some list of sub categories</p>
    <v-card flat class="bg-transparent" :width="mobile ? 366 : 'auto'" :style="mobile ? 'overflow-x: scroll;' : ''">
      <v-card class="bg-transparent" flat :width="mobile ? 750 : 'auto'">
        <v-table hover class="mt-5 rounded-b-0">
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
        <v-card flat class="px-5 py-3 align-center rounded-t-0 d-flex" v-if="Math.ceil(paginationOptions.total / paginationOptions.per_page) > 1">
            {{ page }} / {{ Math.ceil(paginationOptions.total / paginationOptions.per_page) }}
            <v-spacer></v-spacer>
            <div class="d-flex">
              <v-btn flat class="rounded-lg ml-2" @click="page--" :disabled="page < 2" icon="mdi-chevron-left"></v-btn>
              <v-btn flat class="rounded-lg ml-2" @click="page++" :disabled="page >= Math.ceil(paginationOptions.total / paginationOptions.per_page)" icon="mdi-chevron-right"></v-btn>
            </div>
          </v-card>
      </v-card>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import SubCategoryTableRow  from '@/components/SubCategoryTableRow.vue'
import { useSubCategoryStore } from '../../stores/sub_category'
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const page = ref(parseInt(route.query.page?.toString() || '1'))
const {mobile} = useDisplay()
const $subCategory = useSubCategoryStore()
const {sub_categories, paginationOptions} = storeToRefs(useSubCategoryStore())
const totalPage = Math.ceil(paginationOptions.value.total / paginationOptions.value.per_page)
watch(() => page.value, () => {
  router.push({query: {page: page.value}})
})

$subCategory.getAll(page.value)

onBeforeRouteUpdate((to, from, next) =>{
  $subCategory.getAll(parseInt(to.query.page?.toString() || '1')).then(() => [
    next()
  ])

})
</script>

<style scoped>

</style>
