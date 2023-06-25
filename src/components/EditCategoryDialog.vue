<template>
  <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)"  width="450">
    <v-card class="pa-2 rounded-lg" :disabled="isLoading">
      <v-card-text>
        <h4 class="mb-4 d-flex align-center">
          <v-icon class="mr-2">mdi-cog</v-icon>Edit Category</h4>
        <v-text-field label="name" v-model="name" @keyup.enter="submit" single-line variant="outlined" color="primary"></v-text-field>
        <div class="pa-0 w-100 d-flex">
          <v-spacer></v-spacer>
          <v-btn color="success" variant="elevated" :disabled="name.length < 1" @click="submit" :loading="isLoading" >Update</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/category';
import { ref } from 'vue';
const props = defineProps(['showDialog', 'category'])
const emits = defineEmits(['update:showDialog'])
const name = ref(props.category.name)
const isLoading = ref(false)
const submit = () => {
  isLoading.value = true;
  const $category = useCategoryStore()
  $category.update(props.category.id, name.value).then(() => {
    isLoading.value = false;
    name.value = ""
    emits('update:showDialog', false)
  });
}
</script>

<style scoped>

</style>
