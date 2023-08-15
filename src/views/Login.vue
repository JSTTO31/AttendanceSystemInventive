<template>
  <v-app>
    <v-layout class="h-100 w-100 d-flex pa-2 align-center justify-center bg-blue-darken-1">
        <v-card class="pa-5 py-10 pa-md-10" :class="mobile ? ' rounded-lg' : 'rounded-lg h-75 w-33'" :disabled="isLoading" elevation="5">
            <v-avatar class="mb-2 rounded-0 mx-auto" :size="46">
            <v-img src="/src/assets/schedule.png"></v-img>
          </v-avatar>
          <h1 class="text-md-h4 font-weight-medium">Hello! Welcome back</h1>
          <p class="mb-5 text-md-subtitle-2 font-weight-regular">
            Please log in to access your attendance records and manage
            your attendance effortlessly.
          </p>
          <v-form class="mt-5">
            <v-text-field
              class="mb-1"
              v-model="$v.email.$model"
              :error-messages="showError($v.email)"
              label="Email address"
              variant="outlined"
              single-line
              color="primary"
              @keyup.enter="submit"
              prepend-inner-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              :error-messages="showError($v.password)"
              v-model="$v.password.$model"
              label="Password"
              variant="outlined"
              single-line
              color="primary"
              @keyup.enter="submit"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="
                showPassword ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
            <v-spacer v-if="mobile"></v-spacer>
            <v-btn
              class="mt-5"
              @click="submit"
              block
              variant="elevated"
              color="primary"
              size="large"
              flat
              :loading="isLoading"
              >Login</v-btn
            >
          </v-form>
        </v-card>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import {  showError } from "../utils";
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { reactive } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
const {mobile} = useDisplay()
const $user = useUserStore();
const isLoading = ref(false)
const showPassword = ref(false);
const credentials = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required },
};
const $externalResults = ref({})
const $v = useVuelidate(rules, credentials, { $externalResults });

const submit = async () => {
  if(!await $v.value.$validate()){
    return;
  }

  $user.login(credentials).catch(error => {
    $externalResults.value = error.response.data.errors
  })

};
</script>

<style scoped>
.fullscreen{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
