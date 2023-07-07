<template>
  <v-app>
    <v-layout class="h-100 w-100 bg-blue-darken-1">
      <v-main>
        <v-container class="" :style="!mobile ? 'padding: 145px 350px 50px' : ''">
          <v-row>
            <v-col class="px-5">
              <v-card class="pa-5 rounded-lg" :disabled="isLoading" elevation="5">
                <h2>Attendance System Login</h2>
                <p>
                  Please log in to access your attendance records and manage
                  your attendance effortlessly.
                </p>
                <v-form class="mt-5">
                  <v-text-field
                    v-model="$v.email.$model"
                    :error-messages="showError($v.email)"
                    label="Email address"
                    color="primary"
                    @keyup.enter="submit"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    :error-messages="showError($v.password)"
                    v-model="$v.password.$model"
                    label="Password"
                    color="primary"
                    @keyup.enter="submit"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="
                      showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append-inner="showPassword = !showPassword"
                  ></v-text-field>
                  <v-btn
                    class="mt-5"
                    @click="submit"
                    block
                    color="primary"
                    size="large"
                    flat
                    :loading="isLoading"
                    >Login</v-btn
                  >
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { showError } from "../utils";
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

const $v = useVuelidate(rules, credentials);

const submit = () => {
  if ($v.value.$invalid) {
    $v.value.$touch();
    return;
  }
  isLoading.value = true
  $user.login(credentials).then(() => window.location.reload());
};
</script>

<style scoped></style>
