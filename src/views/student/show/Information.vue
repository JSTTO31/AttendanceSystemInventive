<template>
 <v-card class="bg-transparent" flat :disabled="isLoading">
    <v-row>
      <v-col>
        <v-card class="pa-5 rounded-lg border" flat>
          <h3 class="mb-5 d-flex align-center">Basic Information
            <v-spacer></v-spacer>
            <v-btn icon="mdi-pencil" variant="text" v-if="!editMode" @click="editMode = true"></v-btn>
            <v-btn icon="mdi-close" variant="text" v-else @click="editMode = false"></v-btn>
          </h3>
          <v-row>
            <v-col :cols="mobile ? 12 : 6">
              <label class="mb-2">First name</label>
              <v-text-field
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                v-model="$v.first_name.$model"
                :error-messages="showError($v.first_name)"
                label="First name"
                variant="outlined"
                type="text"
                single-line
                color="primary"
                prepend-inner-icon="mdi-account"
                class="mt-3"
              ></v-text-field>
            </v-col>
            <v-col :cols="mobile ? 12 : 6">
              <label class="mb-2">Last name</label>
              <v-text-field
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                v-model="$v.last_name.$model"
                :error-messages="showError($v.last_name)"
                label="Last name"
                variant="outlined"
                type="text"
                single-line
                color="primary"
                prepend-inner-icon="mdi-account"
                class="mt-3"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label class="mb-2">Email address</label>
              <v-text-field
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                v-model="$v.email.$model"
                :error-messages="showError($v.email)"
                label="Email address"
                variant="outlined"
                color="primary"
                single-line
                class="mt-2"
                prepend-inner-icon="mdi-mail"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label class="mb-2">Gender</label>
              <v-select
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                v-model="$v.gender.$model"
                :error-messages="showError($v.gender)"
                label="Gender"
                prepend-inner-icon="mdi-gender-male-female"
                class="text-capitalize mt-2"
                variant="outlined"
                :items="['male', 'female']"
                color="primary"
                single-line
              ></v-select>
            </v-col>
            <v-col>
              <label class="mb-2">Mobile</label>
              <v-text-field
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                v-model="$v.phone_number.$model"
                :error-messages="showError($v.phone_number)"
                label="Phone number"
                variant="outlined"
                color="primary"
                class="mt-2"
                maxlength="11"
                single-line
              >
                <template #prepend-inner>+63</template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label class="mb-2">Address</label>
              <v-text-field
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                v-model="$v.address.$model"
                :error-messages="showError($v.address)"
                label="Home address"
                variant="outlined"
                color="primary"
                single-line
                class="mt-2"
                prepend-inner-icon="mdi-navigation"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="pa-5 rounded-lg mt-5 border" flat>
          <h3 class="mb-5">School Information</h3>
          <v-row>
            <v-col>
              <label class="mb-2">School name</label>
              <v-text-field
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                v-model="$v.school_name.$model"
                :error-messages="showError($v.school_name)"
                label="School name"
                variant="outlined"
                prepend-inner-icon="mdi-town-hall"
                single-line
                class="mt-2"
                color="primary"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label class="mb-2">School Year</label>
              <v-text-field
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                label="School Year"
                variant="outlined"
                color="primary"
                class="mt-2"
                single-line
                v-model="$v.school_year.$model"
                :error-messages="showError($v.school_year)"
              >
                <template #prepend-inner>SY</template>
              </v-text-field>
            </v-col>
            <v-col>
              <label class="mb-2">Course</label>
              <v-text-field
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                v-model="$v.course.$model"
                :error-messages="showError($v.course)"
                label="Course"
                variant="outlined"
                color="primary"
                single-line
                class="mt-2"
                prepend-inner-icon="mdi-school"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="pa-5 rounded-lg mt-5 border" flat>
          <h3 class="mb-5">Other</h3>
          <v-row>
            <v-col>
              <label class="mb-2">Position</label>
              <v-select
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                v-model="$v.position.$model"
                :error-messages="showError($v.position)"
                label="Position"
                variant="outlined"
                color="primary"
                single-line
                :items="['Graphic Designer', 'Video Editor', 'Web Developer']"
                class="mt-2"
                prepend-inner-icon="mdi-purse"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label class="mb-2">Time to render</label>
              <v-text-field
                :readonly="!editMode"
                :density="mobile ? 'compact' : 'default'"
                label="Time to render"
                variant="outlined"
                color="primary"
                class="mt-2"
                single-line
                prepend-inner-icon="mdi-timelapse"
                v-model="$v.remaining.$model"
                :error-messages="showError($v.remaining)"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex align-center pt-5">
      <v-btn class="mr-2" @click="submit" :disabled="!$v.$anyDirty" color="primary" flat>Save changes</v-btn>
      <v-btn class="mr-2" @click="reset" flat>Clear</v-btn>
    </div>
    <LoadingOverlay :show="isLoading"></LoadingOverlay>
 </v-card>
</template>

<script setup lang="ts">
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { showError } from '@/utils';
import useStudentEdit from '@/composables/useStudentEdit';
import { ref } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { watch } from 'vue';
const editMode = ref(false)
const {mobile} = useDisplay()
const {student, $v, reset} = useStudentEdit()
const isLoading = ref(false)
const submit = () => {
  if($v.value.$invalid){
    $v.value.$touch()
    return;
  }
  isLoading.value = true
  const $student = useStudentStore()
  $student.edit(student).then(() => {
    isLoading.value = false;
  })
}

watch(() => editMode.value, () => {
  if(!editMode.value){
    reset()
  }
})

</script>

<style scoped>

</style>
