<template>
  <tr>
    <td class="text-center">{{ sub_category.id }}</td>
    <td class="text-center">{{ sub_category.name }}</td>

    <td class="text-center">{{ sub_category.category_name }}</td>
    <td class="text-center">{{ new Date(sub_category.created_at).toDateString() }}</td>
    <td class="text-center">
      <v-btn icon="mdi-cog" variant="text" size="small" @click="showEditDialog = true"></v-btn>
      <v-btn icon="mdi-delete" variant="text" @click="showDeleteDialog = true" size="small"></v-btn>
    </td>
    <EditSubCategoryDialog v-model:show-dialog="showEditDialog" :sub_category="sub_category"></EditSubCategoryDialog>
    <DeleteSubCategoryDialogVue v-model="showDeleteDialog" :sub_category="sub_category"></DeleteSubCategoryDialogVue>
  </tr>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditSubCategoryDialog from '../components/EditSubCategoryDialog.vue'
import DeleteSubCategoryDialogVue from './DeleteSubCategoryDialog.vue';
const props = defineProps(['sub_category'])
const showDeleteDialog = ref(false)
const showEditDialog = ref(false)
</script>

<style scoped>

</style>
