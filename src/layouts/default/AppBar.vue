<template>
  <v-app-bar class="px-2 px-md-5" flat color="primary">
    <h3 class="text-md-h5 font-weight-medium" style="user-select: cursor;" @click="$router.push({name: 'Home'})">
      <v-icon class="mr-1">mdi-calendar</v-icon>
      eAttendance
    </h3>
    <v-spacer></v-spacer>
    <div v-if="$route.name != 'IndexStudent' && !mobile" class="w-50 ml-5">
      <v-text-field
      flat
        prepend-inner-icon="mdi-magnify"
        v-model="search"
        label="Find students..."
        variant="solo"
        single-line
        density="compact"
        hide-details
        @keyup.enter="findStudent"
      ></v-text-field>
    </div>
    <v-spacer></v-spacer>
    <v-menu>
      <template #activator="{props}">
        <v-btn v-bind="props" size="small" variant="elevated" icon="mdi-chevron-down"></v-btn>
      </template>
      <v-card width="260" class="rounded-lg pa-2">
        <v-list>
          <v-list-item class="rounded-lg my-1" prepend-icon="mdi-lock" @click="showChangePassword = true">Change Password</v-list-item>
          <v-list-item class="rounded-lg my-1" prepend-icon="mdi-logout" @click="$user.logout()">Sign out</v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <ChangePasswordDialog v-model:show-dialog="showChangePassword"></ChangePasswordDialog>
    <!-- <v-btn @click="$user.logout()" icon="mdi-logout" variant="text" v-if="mobile"></v-btn>
    <v-btn @click="$user.logout()" prepend-icon="mdi-logout" color="white" variant="elevated" v-if="!mobile">Sign out</v-btn> -->
  </v-app-bar>

</template>

<script lang="ts" setup>
import ChangePasswordDialog from "@/components/ChangePasswordDialog.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
const showChangePassword = ref(false)
const $user = useUserStore()
const { mobile} = useDisplay()
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
