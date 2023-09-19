<template>
   <v-card flat class="py-0" style="overflow: visible;">
      <VProgressLinear
      height="40"
      :color="remainingPercent >= 100 ? 'secondary' : 'primary'"
      :model-value="remainingPercent"
      class="bg-blue-grey-lighten-1 text-subtitle-1 text-capitalize font-weight-medium"
      >
        <span v-if="remainingPercent < 100">{{ work_time_total.output }}/{{student.remaining}}</span>
        <span v-else>
          <v-icon>mdi-check</v-icon>Completed
        </span>
      </VProgressLinear
    >
        <span style="position: absolute;top: 0px;right: -0;">
          <v-btn class="rounded-0" flat size="small" icon="mdi-swap-horizontal" @click="remainingMode = !remainingMode"></v-btn>
        </span>
    </v-card>
</template>

<script setup lang="ts">
import useStudent from '@/composables/useStudent';
import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
const {student} = storeToRefs(useStudentStore())
const {remainingPercent, work_time_total, remainingMode} = useStudent(student)
</script>

<style scoped>

</style>
