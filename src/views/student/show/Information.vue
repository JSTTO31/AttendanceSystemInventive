<template>
 <v-card class="pa-5" style="padding-right: 250px !important" :disabled="isLoading">
    <div class="d-flex align-center justify-space-between">
      <h2 class="mb-5">Student information</h2>
      <v-spacer></v-spacer>
      <v-btn v-if="!editMode" @click="editMode = true" prepend-icon="mdi-pencil" color="success" flat>Edit</v-btn>
      <div v-else>
        <v-btn class="ml-2" @click="submit" color="primary" flat>Save</v-btn>
        <v-btn class="ml-2" @click="cancel" flat>Cancel</v-btn>
      </div>
    </div>
    <v-row>
      <v-col cols="3">Profile Image</v-col>
      <v-col>
        <ImageCard :disabled="!editMode" v-model:image="student.image" @update="$v.image.$touch()" :url="student.url"></ImageCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div>
          <label for="" class="mb-5">First name</label>
          <v-text-field :readonly="!editMode" class="mt-2"  v-model="$v.first_name.$model"
            :error-messages="showError($v.first_name)" density="compact" single-line color="primary" variant="underlined" label="First name"></v-text-field>
        </div>
      </v-col>
      <v-col>
        <div>
          <label for="" class="mb-5">Last name</label>
          <v-text-field :readonly="!editMode" class="mt-2"  v-model="$v.last_name.$model"
            :error-messages="showError($v.last_name)" density="compact" single-line color="primary" variant="underlined" label="Last name"></v-text-field>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div>
          <label for="" class="mb-5">Email address</label>
          <v-text-field :readonly="!editMode" class="mt-2"  v-model="$v.email.$model"
            :error-messages="showError($v.email)" density="compact" single-line color="primary" variant="underlined" label="Email address"></v-text-field>
        </div>
      </v-col>
    </v-row>
     <v-row>
      <v-col>
        <div>
          <label for="" class="mb-5">Gender</label>
          <v-select :readonly="!editMode" class="mt-2"  v-model="$v.gender.$model"
            :error-messages="showError($v.gender)" density="compact" single-line color="primary" variant="underlined" label="Gender"></v-select>
        </div>
      </v-col>
      <v-col>
        <div>
          <label for="" class="mb-5">Course</label>
          <v-select :readonly="!editMode" class="mt-2"  v-model="$v.course.$model"
            :error-messages="showError($v.course)" density="compact" single-line color="primary" variant="underlined" label="Course"></v-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
        <v-col>
          <v-text-field :readonly="!editMode"
            v-model="$v.phone_number.$model"
            :error-messages="showError($v.phone_number)"
            label="Phone number"
            variant="underlined"
            color="primary"
          >
            <template #prepend-inner>+63</template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field :readonly="!editMode"
            v-model="$v.school_name.$model"
            :error-messages="showError($v.school_name)"
            label="School name"
            variant="underlined"
            color="primary"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field :readonly="!editMode"
            label="School Year"
            variant="underlined"
            color="primary"
            v-model="$v.school_year.$model"
            :error-messages="showError($v.school_year)"
          >
            <template #prepend-inner>SY</template>
          </v-text-field>
        </v-col>
      </v-row>
      <LoadingOverlay :show="isLoading"></LoadingOverlay>
 </v-card>
</template>

<script setup lang="ts">
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import ImageCard from '@/components/ImageCard.vue'
import { showError } from '@/utils';
import useStudentEdit from '@/composables/useStudentEdit';
import { ref } from 'vue';
import { useStudentStore } from '@/stores/student';
const editMode = ref(false)
const {student, $v, reset} = useStudentEdit()
const isLoading = ref(false)
const submit = () => {
  if($v.value.$invalid){
    $v.value.$touch()
    return;
  }  
  isLoading.value = true
  const $student = useStudentStore()
  const container : any = []
  if($v.value.image.$dirty && $v.value.image){
    container.push($student.changeProfile(student.image))
  }

  $student.edit(student).then(() => {
    isLoading.value = false;
    editMode.value = false
  })
}

const cancel = () => {
  $v.value.$reset()
  reset()
  editMode.value = false
}
</script>

<style scoped>

</style>
