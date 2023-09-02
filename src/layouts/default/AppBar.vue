<template>
  <v-app-bar class="px-8 border-b" :flat="flat">
    <h1 class="mr-8">
      {{ $route.meta.title || 'App Title' }}</h1>
    <v-spacer></v-spacer>
    <div v-if="!mobile" class="w-33  mr-5">
      <v-text-field
        flat
        prepend-inner-icon="mdi-magnify"
        v-model="search"
        label="Find students..."
        variant="solo-filled"
        single-line
        density="compact"
        hide-details
        @keyup.enter="findStudent"
      ></v-text-field>
    </div>
    <!-- <v-badge color="red" content="2"  class=" mr-5">
      <v-icon>mdi-bell</v-icon>
    </v-badge>
    <v-badge color="red" content="2"  class=" mr-5">
      <v-icon>mdi-message-text</v-icon>
    </v-badge> -->
    <v-divider vertical class="mr-2" inset></v-divider>
    <v-menu>
      <template #activator="{props}">
        <v-btn v-bind="props" flat variant="elevated" class="mr-n1 border" icon="mdi-chevron-down"></v-btn>
      </template>
      <v-card width="260" class="rounded-lg pa-2">
        <v-list>
          <v-list-item class="rounded-lg my-1" prepend-icon="mdi-lock" @click="showChangePassword = true">Change Password</v-list-item>
          <v-list-item class="rounded-lg my-1" prepend-icon="mdi-logout" @click="$user.logout()">Sign out</v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <ChangePasswordDialog v-model:show-dialog="showChangePassword"></ChangePasswordDialog>
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
const flat = ref(true)
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


window.addEventListener('scroll', () => {
  if(scrollY > 10){
    flat.value = false
  }else{
    flat.value = true
  }
})

</script>

<style scoped></style>
