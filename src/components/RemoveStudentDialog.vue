<template>
    <v-dialog :model-value="showRemoveStudent" width="450" scrim="transparent" @click:outside="emits('update:showRemoveStudent', false)">
      <v-card :loading="isLoading" :disabled="isLoading">
        <v-card-text>
          <h4 class="mb-3 text-error d-flex align-center">
            <v-icon class="mr-1">mdi-trash-can</v-icon>Remove Student
            <v-spacer></v-spacer>
          </h4>
          <h4 class="font-weight-regular">
            Are you sure you want to delete this student <strong>{{student.first_name + ' ' + student.last_name}}</strong>
          </h4>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="elevated" class="text-capitalize"
            flat
            density="compact"
            color="primary"
            @click="removeStudent"
            >Yes, Remove it</v-btn
          >
          <v-btn variant="elevated" class="text-capitalize" flat density="compact" @click="emits('update:showRemoveStudent', false)">No, Don't remove it</v-btn>
        </v-card-actions>
        <v-btn
          @click="emits('update:showRemoveStudent', false)"
          icon="mdi-close"
          variant="text"
          class="ma-1"
          size="small"
          style="position: absolute; top: 0; right: 0"
        ></v-btn>
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps(['showRemoveStudent'])
const emits = defineEmits(['update:showRemoveStudent'])
const {student} = storeToRefs(useStudentStore())
const isLoading = ref(false)
const removeStudent = () => {
  const $student = useStudentStore()
  isLoading.value = true
  $student.remove(student.value.id).then(() => {
  router.push({name: 'IndexStudent'})

  })
}
</script>

<style scoped>

</style>
