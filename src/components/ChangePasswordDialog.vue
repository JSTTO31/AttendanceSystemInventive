<template>
  <v-dialog :fullscreen="mobile"
  :width="mobile ? '100%' : 500"
  :model-value="showDialog" @click:outside="emits('update:showDialog', false)">
    <v-card class="py-5 rounded-lg" :disabled="isLoading">
      <v-card-title class="px-6">Change Password</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field class="mb-2" @keyup.enter="submit" :error-messages="showError($v.old_password)" color="primary" v-model="$v.old_password.$model" label="Old Password" variant="outlined"></v-text-field>
          <v-text-field class="mb-2" @keyup.enter="submit" :error-messages="showError($v.new_password)" color="primary" v-model="$v.new_password.$model" label="New Password" variant="outlined"></v-text-field>
          <v-text-field class="mb-2" @keyup.enter="submit" :error-messages="showError($v.password_confirmation)" color="primary" v-model="$v.password_confirmation.$model" label="Password Confirmation" variant="outlined"></v-text-field>
          <v-card-actions>
            <v-btn @click="clear">clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="elevated" color="primary" :loading="isLoading" @click="submit" flat>Save</v-btn>
            <v-btn @click="emits('update:showDialog', false)">Cancel</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
      <v-btn id="close" flat @click="emits('update:showDialog', false)" icon="mdi-close"></v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import useChangePasswordForm from '@/composables/useChangePasswordForm';
import { showError } from '@/utils';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const {mobile} = useDisplay()
const emits = defineEmits(['update:showDialog'])
const props = defineProps(['showDialog'])
const {password, $v, submit, clear, isLoading} = useChangePasswordForm()

</script>

<style scoped>
#close{
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
