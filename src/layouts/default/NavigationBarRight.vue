<template>
  <v-navigation-drawer
    location="right"
    width="380"
    class="pa-0"
    :rail="!mobile"
    expand-on-hover
    @mouseover="rail = false"
    @mouseleave="rail = true"
  >
    <v-layout class="h-100 pa-0 w-100">
      <v-app-bar flat class="border-b pa-0">
        <!-- <v-btn v-if="rail" icon="mdi-chevron-left" class="rounded-0" @click="rail = false"></v-btn>
        <v-btn v-else icon="mdi-chevron-right" class="rounded-0" @click="rail = true"></v-btn> -->
        <v-icon :class="current.dark ? 'text-white' : 'text-grey-darken-3'" class="mx-2" size="35" >mdi-school</v-icon>
        <h3 :class="current.dark ? 'text-white' : 'text-grey-darken-3'" class="ml-1" v-if="!rail || mobile">
        OJT Students</h3>
      </v-app-bar>
      <v-main :class="rail ? 'disable-scroll' : ''" id="nav-right" :style="false ? 'overflow-y: hidden !important' : 'overflow-y: scroll !important'"
>
        <div :class="rail && !mobile ? '' : 'pa-5'">
          <AttendanceStudentCardVue v-for="student in students" :key="student.id" :student="student" :rail="rail"></AttendanceStudentCardVue>
        </div>
      </v-main>
    </v-layout>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import AttendanceStudentCardVue from "@/components/AttendanceStudentCard.vue";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useDisplay, useTheme } from "vuetify/lib/framework.mjs";
const {mobile} = useDisplay()
const {current} = useTheme()
const { students } = storeToRefs(useAppStore());
const rail = ref(true)
onBeforeRouteUpdate((to, from, next) => {
  rail.value = true
  next()
})


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

.disable-scroll::-webkit-scrollbar{
  width: 3px !important;
}
</style>
