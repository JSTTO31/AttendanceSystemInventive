<template>
  <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)"  width="450">
    <v-card class="pa-2 rounded-lg" :disabled="isLoading">
      <v-card-text>
        <h3 class="mb-4">Create Sub Category</h3>
        <h4 class="text-grey-darken-3 mb-4">Sub Category name</h4>
        <v-text-field label="name" v-model="name" @keyup.enter="submit" single-line variant="outlined" color="primary"></v-text-field>
        <h4 class="text-grey-darken-3 mb-4">Category list</h4>
        <v-radio-group v-model="category_id" inline>
          <v-radio :label="category.name" color="primary" v-for="category in categories" :value="category.id"></v-radio>
        </v-radio-group>
        <div class="pa-0 w-100 d-flex">
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="elevated" :disabled="name.length < 1 && !!category_id" @click="submit" :loading="isLoading">Create</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useCategoryStore} from '../stores/category'
import {useSubCategoryStore} from '../stores/sub_category'
import { storeToRefs } from 'pinia';
const props = defineProps(['showDialog'])
const emits = defineEmits(['update:showDialog'])
const $category = useCategoryStore()
const $sub_category = useSubCategoryStore()
const {categories} = storeToRefs(useCategoryStore())
const name = ref('')
const category_id = ref(null)
const isLoading = ref(false)
const submit = () => {
  if(!category_id.value || !name.value){
    return
  }
  isLoading.value = true;
  $sub_category.store(category_id.value, name.value).then(() => {
    isLoading.value = false;
    emits('update:showDialog', false)
  })
}

$category.getAll();
</script>

<style scoped>

</style>
