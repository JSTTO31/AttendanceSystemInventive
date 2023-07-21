<template>
  <Transition>
    <v-card v-if="mobile && student" class="rounded-t-xl" height="520" elevation="5" id="main">
      <div class="d-flex justify-space-around pt-8 align-center">
        <h4>
          <v-icon>mdi-login</v-icon>
          {{ timeIn }}
        </h4>
        <h4>
          <v-icon>mdi-logout</v-icon>
          {{ timeOut }}
        </h4>
        <h4>
          <v-icon>mdi-update</v-icon>
          {{ workTime }}
        </h4>
      </div>
      <span id="toggle-button">
        <v-icon @click="show = !show">mdi-drag-horizontal-variant</v-icon>
      </span>
      <v-divider class="mt-5"></v-divider>
      <v-list v-if="show" class="pa-5">
        <h4>General options</h4>
        <v-list-item
          @click="emits('enter')"
          prepend-icon="mdi-login"
          :disabled="
            (student.attendance && !!student.attendance.time_in) ||
            (student.attendance && !!student.attendance.is_absent) ||
            (student.attendance && !!student.attendance.is_event)
          "
          >Enter</v-list-item
        >
        <v-list-item
          @click="emits('absent')"
          prepend-icon="mdi-close"
          :disabled="
            (student.attendance && !!student.attendance.time_in) ||
            (student.attendance && !!student.attendance.is_absent) ||
            (student.attendance && !!student.attendance.is_event)
          "
          >Absent</v-list-item
        >
        <v-list-item
          @click="emits('leave')"
          prepend-icon="mdi-logout"
          :disabled="
            !student.attendance ||
            (student.attendance &&
              !!student.attendance.time_in &&
              !!student.attendance.time_out) ||
            (student.attendance && !!student.attendance.is_absent) ||
            (student.attendance && !!student.attendance.is_event)

          "
          >Leave</v-list-item
        >
        <v-list-item  :disabled="!student.attendance || student.attendance && !student.attendance.time_in || !student.attendance.time_out" prepend-icon="mdi-repeat"
          @click="emits('re-enter')">Re-enter</v-list-item
        >
        <v-list-item @click="emits('remove')" prepend-icon="mdi-cancel"
          >Remove</v-list-item
        >
        <h4>Other</h4>
        <v-list-item
          @click="emits('manual')"
          prepend-icon="mdi-book-open-outline"
          >Manual Attendance</v-list-item
        >
        <v-list-item :disabled="mobile" prepend-icon="mdi-trash-can-outline"
          >Permanent Delete</v-list-item
        >
      </v-list>
    </v-card>
  </Transition>
</template>

<script setup lang="ts">
import useStudent from '@/composables/useStudent';
import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const emits = defineEmits(['enter', 'absent', 'leave', 'manual', 'remove', 're-enter'])
const show = ref(false)
const {student} = storeToRefs(useStudentStore())
const {timeIn, timeOut, workTime, status,} = useStudent(student)
const {mobile} = useDisplay()

watch(() => show.value, () => {
  const main = document.getElementById('main')
  if(main){
    if(show.value){
        main.style.transform = 'translateY(0)'
    }else{
        main.style.transform = 'translateY(85%)'
    }
  }
})

</script>

<style scoped>
#toggle-button{
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
}
#main{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
  transform: translateY(85%);
  transition: .1567s ease-in-out;
}

</style>
