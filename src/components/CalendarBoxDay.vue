<template>
  <v-menu open-on-hover>
    <template #activator="{props}">
      <v-card v-bind="props"  flat :color="attributes.color" :variant="attributes.variant"  class="mr-2 my-2 d-flex align-center justify-center"  height="40" style="user-select: none" width="40">{{ day }}</v-card>
    </template>
    <v-card width="380" class="pa-3 rounded-lg" style="user-select: none">
       <div>
        <div class="d-flex">
          <v-col class=" d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse">
            Time in
            <span class="font-weight-medium">
              {{ timeIn }}
            </span>
          </v-col>
          <v-col class=" d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse">Time out
            <span class="font-weight-medium">
              {{ timeOut }}
            </span>
          </v-col>
          <v-col class=" d-flex align-center justify-end font-weight-regular flex-column flex-column-reverse">Work time
            <span class="font-weight-medium">
              {{ workTime }}
            </span>
          </v-col>
        </div>
       </div>
       <v-divider class="my-1"></v-divider>
       <div class="d-flex text-subtitle-2 align-center justify-sm-space-between">
        <span>
          <v-icon size="23">mdi-clock-outline</v-icon>
          {{ new Date().toDateString() }}
        </span>
        <v-chip :color="status == 'absent' ? 'error' : status == 'present' ? 'primary' : status == 'late' ? 'warning' : 'grey'" class="text-capitalize" size="small" >{{ status }}</v-chip>
       </div>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const {student} = storeToRefs(useStudentStore())
const props = defineProps<{day: number, status: string}>()
const attendance = computed(() => student.value.attendances.find((item) => new Date(item.created_at).getDate() == props.day))
const attributes : any = computed(() => {
  if(attendance.value){
    if(attendance.value.is_absent){
      return {variant: 'elevated', color: 'error'}
    }else if(attendance.value.policy){
      return {variant: 'elevated', color: 'warning'}

    }else if(!attendance.value.time_in || !attendance.value.time_out){
      return {variant: 'outlined', color: 'primary'}
    }else{
      return {variant: 'elevated', color: 'primary'}
    }
  }
  return {variant: 'outlined', color: 'primary'}
})

const timeIn = computed(() => attendance.value && attendance.value.time_in ?  new Date(attendance.value.time_in).toLocaleTimeString() : '--')
const timeOut = computed(() => attendance.value && attendance.value.time_out ?  new Date(attendance.value.time_out).toLocaleTimeString() : '--')
const workTime = computed(() => attendance.value && attendance.value.time_in && attendance.value.time_out ? parseInt(attendance.value.work_time).toFixed(0) + 'h' : '--')
const status = computed(() => attendance.value?.is_absent ? 'absent' : attendance.value?.policy ? 'late' : attendance.value?.time_in && attendance.value.time_out ? 'present' : 'pending'  )
</script>

<style scoped>

</style>
