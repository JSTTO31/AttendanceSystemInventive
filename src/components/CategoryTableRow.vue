<template>
  <tr>
    <td class="text-center">{{ category.id }}</td>
    <td class="text-center">{{ category.name }}</td>
    <td class="text-center">{{ new Date(category.created_at).toDateString() }}</td>
    <td class="text-center">
      <v-btn icon="mdi-cog" variant="text" size="small" @click="showEditCategoryDialog = true"></v-btn>
      <v-btn icon="mdi-delete" variant="text" size="small" @click="showDeleteCategoryDialog = true"></v-btn>
    </td>
  <DeleteCategoryDialog v-model:show-dialog="showDeleteCategoryDialog" :category="category"></DeleteCategoryDialog>
  <EditCategoryDialog v-model:show-dialog="showEditCategoryDialog" :category="category"></EditCategoryDialog>
  </tr>
</template>

<script setup lang="ts">
import DeleteCategoryDialog from '../components/DeleteCategoryDialog.vue'
import EditCategoryDialog from '../components/EditCategoryDialog.vue'
import {ref} from 'vue'
const props = defineProps(['category'])
const showDeleteCategoryDialog = ref(false)
const showEditCategoryDialog = ref(false)
const isLoading = ref(false)

</script>

<style scoped>

</style>