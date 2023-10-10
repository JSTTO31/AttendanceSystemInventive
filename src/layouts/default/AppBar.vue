<template>
  <v-app-bar class="px-0 px-md-4 pr-0 pr-md-10 border-b" :flat="flat" :color="mobile ? '#000f1f' : 'white'">
    <div class="text-h5 px-5 w-100 font-weight-medium text-md-h4" v-if="!mobile">
      {{ $route.meta.title || 'App Title' }}
    </div>
    <v-app-bar-title v-else class="d-flex" @click="$router.push({name: 'Home'})" style="cursor: pointer;font-family: 'Poppins', sans-serif !important;font-weight: 600;">
     <div class="d-flex align-center pt-2">
        <v-avatar class="mr-1 rounded-0 mb-3" size="35">
          <v-img src="/src/assets/eAttendance-logo.png"></v-img>
        </v-avatar>
        <div style="line-height: 1.3;" class="text-h5 ml-2 justify-center pb-2 font-weight-bold d-flex flex-column">
          <span class="text-white font-weight-medium">eAttendance</span>
        </div>
     </div>
    </v-app-bar-title>
    <v-spacer class="d-none d-md-block"></v-spacer>
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
    <v-badge color="red" content="2"  class=" mr-5">
      <v-icon>mdi-bell</v-icon>
    </v-badge>
    <v-badge color="red" content="2"  class=" mr-5">
      <v-icon>mdi-message-text</v-icon>
    </v-badge>
    <v-divider vertical class="mr-2 d-none d-md-block" inset></v-divider>
    <v-menu>
      <template #activator="{props}">
        <v-btn v-if="!mobile" v-bind="props" flat variant="elevated" class="mr-n1 border" icon="mdi-chevron-down"></v-btn>
      </template>
      <v-card width="260" class="rounded-lg pa-2">
        <v-list>
          <v-list-item class="rounded-lg my-1" prepend-icon="mdi-lock" @click="showChangePassword = true">Change Password</v-list-item>
          <v-list-item class="rounded-lg my-1" prepend-icon="mdi-logout" @click="$user.logout()">Sign out</v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <v-btn v-if="mobile" @click="emits('update:showMenu', !showMenu)" flat icon="mdi-menu" color="white"></v-btn>
    <ChangePasswordDialog v-model:show-dialog="showChangePassword"></ChangePasswordDialog>
  </v-app-bar>

</template>

<script lang="ts" setup>
import ChangePasswordDialog from "@/components/ChangePasswordDialog.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
const props = defineProps(['showMenu'])
const emits = defineEmits(['update:showMenu'])
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
