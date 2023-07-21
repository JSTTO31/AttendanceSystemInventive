<template>
   <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)" scrim="transparent" width="450">
    <v-card class="pa-2 rounded-lg" :disabled="isLoading">
      <v-card-text>
        <h4 class="mb-4 text-error d-flex align-center">
          <v-icon class="mr-2">mdi-trash-can</v-icon>
          Delete Category</h4>
         <p>This will permanently delete the category <strong>{{ category.name }}</strong>, do you want to delete it?</p>
        <div class="pa-0 w-100 d-flex mt-5">
          <v-spacer></v-spacer>
          <v-btn color="error" variant="elevated" @click="submit" :loading="isLoading">Delete</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/category';
import { ref } from 'vue';
const props = defineProps(['showDialog', 'category'])
const emits = defineEmits(['update:showDialog', 'delete'])
const name = ref('')
const isLoading = ref(false)
const submit = () => {
  isLoading.value = true;
  const $category = useCategoryStore()
  $category.delete(props.category.id).then(() => {
    isLoading.value = false
    emits('update:showDialog', false)
  })
}
</script>

<style scoped>

</style>
