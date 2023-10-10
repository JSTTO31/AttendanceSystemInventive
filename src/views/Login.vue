<template>
  <v-app>
    <v-layout class="h-100 w-100 d-flex pa-2 align-center justify-center" style="background-color: #000f1f;">
        <v-card class="pa-5 pa-md-10 pb-md-15 text-white rounded-lg" style="background-color: #01172f;" :class="mobile ? ' rounded-lg' : 'rounded-lg'" :disabled="isLoading" elevation="5" width="450">
          <h2 class="text-md-h5 pa-5 font-weight-bold d-flex justify-center" style="cursor: pointer;font-family: 'Poppins', sans-serif !important;font-weight: 600;" @click="$router.push({name: 'Home'})">
            <v-avatar class="mr-1 rounded-0 mb-3" size="50">
              <v-img src="/src/assets/eAttendance-logo.png"></v-img>
            </v-avatar>
            <div style="line-height: 1.3;" class="text-h5 ml-2 justify-center pb-2 font-weight-bold d-flex flex-column">
              <span class="text-white font-weight-medium">eAttendance</span>
            </div>
          </h2>
          <v-form class="mt-5">
            <v-text-field
              class="mb-1"
              v-model="$v.email.$model"
              :error-messages="showError($v.email)"
              label="Email address"
              variant="outlined"
              color="primary"
              single-line
              @keyup.enter="submit"
              prepend-inner-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              :error-messages="showError($v.password)"
              v-model="$v.password.$model"
              label="Password"
              variant="outlined"
              color="primary"
              single-line
              @keyup.enter="submit"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="
                showPassword ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
            <v-spacer v-if="mobile"></v-spacer>
            <v-hover v-slot="{isHovering, props}">
              <v-btn
                v-bind="props"
                class="mt-5"
                @click="submit"
                block
                :variant="isHovering ? 'elevated' : 'outlined'"
                color="primary"
                size="large"
                flat
                :style="{boxShadow: isHovering ? '0 0 25px 5px #615dec' : 'none'}"
                :loading="isLoading"
                >Login</v-btn
              >
            </v-hover>
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
