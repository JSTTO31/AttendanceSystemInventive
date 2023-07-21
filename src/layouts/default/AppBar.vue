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
    <v-dialog width="450" v-model="showChangePassword">
      <v-card class="py-5 rounded-lg">
        <v-card-title class="px-6">Change Password</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field :error-messages="showError($v.old_password)" color="primary" v-model="$v.old_password.$model" label="Old Password" variant="outlined"></v-text-field>
            <v-text-field :error-messages="showError($v.new_password)" color="primary" v-model="$v.new_password.$model" label="New Password" variant="outlined"></v-text-field>
            <v-text-field :error-messages="showError($v.password_confirmation)" color="primary" v-model="$v.password_confirmation.$model" label="Password Confirmation" variant="outlined"></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="elevated" color="primary" @click="submit" flat>Save</v-btn>
              <v-btn @click="showChangePassword = false">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <v-btn @click="$user.logout()" icon="mdi-logout" variant="text" v-if="mobile"></v-btn>
    <v-btn @click="$user.logout()" prepend-icon="mdi-logout" color="white" variant="elevated" v-if="!mobile">Sign out</v-btn> -->
  </v-app-bar>

</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import useChangePasswordForm from "@/composables/useChangePasswordForm";
import { showError } from "@/utils";
const {password, showChangePassword, $v, submit} = useChangePasswordForm()
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
