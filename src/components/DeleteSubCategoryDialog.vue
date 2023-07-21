<template>
   <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)" scrim="transparent" width="450">
    <v-card class="pa-2 rounded-lg" :disabled="isLoading">
      <v-card-text>
        <h4 class="mb-4 text-error d-flex align-center">
          <v-icon class="mr-2">mdi-trash-can</v-icon>
          Delete Sub Category</h4>
         <p>This will permanently delete the sub category <strong>{{ sub_category.name }}</strong>, do you want to delete it?</p>
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
import { useSubCategoryStore } from '@/stores/sub_category';
import { ref } from 'vue';
const props = defineProps(['showDialog', 'sub_category'])
const emits = defineEmits(['update:showDialog', 'delete'])
const isLoading = ref(false)
const submit = () => {
  isLoading.value = true;
  const $sub_category = useSubCategoryStore()
  $sub_category.delete(props.sub_category.category_id, props.sub_category.id).then(() => {
    isLoading.value = false
    emits('update:showDialog', false)
  })
}
</script>

<style scoped>

</style>
