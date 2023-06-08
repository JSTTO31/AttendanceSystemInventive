<template>
  <v-navigation-drawer
    v-if="!$route.name?.toString().includes('Student')"
    location="right"
    width="350"
    class="pa-0"
    :rail="rail"

  >
    <v-layout class="h-100 pa-0 w-100">
      <v-app-bar flat class="border-b pa-0">
        <v-btn v-if="rail" icon="mdi-chevron-left" class="rounded-0" @click="rail = false"></v-btn>
        <v-btn v-else icon="mdi-chevron-right" class="rounded-0" @click="rail = true"></v-btn>
        <h3 class="text-grey-darken-3 ml-3">OJT Students</h3>
      </v-app-bar>
      <v-main id="nav-right" :style="rail ? 'overflow-y: hidden !important' : 'overflow-y: scroll !important'"
>
        <div :class="rail ? '' : 'px-5 pt-5'">
          <AttendanceStudentCardVue v-for="student in students" :key="student.id" :student="student" :rail="rail"></AttendanceStudentCardVue>
        </div>
      </v-main>
    </v-layout>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import AttendanceStudentCardVue from "@/components/AttendanceStudentCard.vue";
import { useAppStore } from "@/stores/app";
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const { students } = storeToRefs(useAppStore());
const rail = ref(true)
</script>

<style scoped>
#nav-right::-webkit-scrollbar {
  background-color: transparent;
  width: 10px;
}
#nav-right::-webkit-scrollbar-thumb {
  background-color: transparent;
}

#nav-right:hover::-webkit-scrollbar-thumb {
  background-color: rgb(128, 128, 128);
  border-radius: 50px;
}
</style>
