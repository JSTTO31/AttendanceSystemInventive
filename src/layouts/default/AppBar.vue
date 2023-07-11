<template>
  <v-app-bar class="px-2 px-md-5" flat color="primary">
    <h3 class="text-md-h5 font-weight-medium" style="user-select: cursor;" @click="$router.push({name: 'Home'})">
      <v-icon class="mr-1">mdi-calendar</v-icon>
      eAttendance
    </h3>
    <div v-if="$route.name != 'IndexStudent' && !mobile" class="w-25 ml-5">
      <v-text-field
        v-model="search"
        label="find students..."
        variant="solo"
        single-line
        density="compact"
        hide-details
        @keyup.enter="findStudent"
      ></v-text-field>
    </div>
    <v-spacer></v-spacer>
    <v-btn @click="$user.logout()" icon="mdi-logout" variant="text" v-if="mobile"></v-btn>
    <v-btn @click="$user.logout()" prepend-icon="mdi-logout" color="white" variant="elevated" v-if="!mobile">Sign out</v-btn>
    <!--
    <div class="d-flex align-center">
      <v-avatar size="45">
        <v-img src="https://www.w3schools.com/w3css/img_avatar3.png"></v-img>
      </v-avatar>
      <div>
        <h5 class="ml-3 font-weight-bold">Joshua Sotto</h5>
        <h6 class="ml-3 font-weight-regular">{{ "administrator" }}</h6>
      </div>
      <v-btn size="small" class="ml-5" icon="mdi-chevron-down"></v-btn>
    </div> -->
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAttendanceStore } from "@/stores/attendance";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
const $user = useUserStore()
const { mobile} = useDisplay()
const { user } = storeToRefs(useUserStore());
const search = ref('')
const router = useRouter()
const findStudent = () => {
  if(!search.value){
    return
  }
  router.push({name: 'IndexStudent', query: {search: search.value}})
}


onBeforeRouteUpdate((to, from, next) => {
  if(search.value){
    search.value = ''
  }

  next()

})

</script>

<style scoped></style>
