<template>
  <v-app-bar class="px-5" flat color="primary">
    <h2>
      <v-icon class="mr-1" size="35">mdi-calendar</v-icon>
      eAttendance
    </h2>
    <div class="w-25 ml-5">
      <v-text-field
        label="find students..."
        variant="solo"
        single-line
        density="compact"
        hide-details
      ></v-text-field>
    </div>
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-plus" color="white" class="text-capitalize mr-5" @click="$router.push({name: 'CreateStudent'})">Add student</v-btn>
    <div class="d-flex align-center">
      <v-avatar size="45">
        <v-img src="https://www.w3schools.com/w3css/img_avatar3.png"></v-img>
      </v-avatar>
      <div>
        <h5 class="ml-3 font-weight-bold">Joshua Sotto</h5>
        <h6 class="ml-3 font-weight-regular">{{ "administrator" }}</h6>
      </div>
      <v-btn size="small" class="ml-5" icon="mdi-chevron-down"></v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAttendanceStore } from "@/stores/attendance";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
const { user } = storeToRefs(useUserStore());
const search = ref('')
const router = useRouter()
const findStudent = () => {
  if(!search.value){
    return
  }
  router.push({name: 'IndexStudent', query: {search: search.value}})
}

</script>

<style scoped></style>
