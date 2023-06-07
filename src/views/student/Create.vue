<template>
  <v-container class="pa-10" style="padding-right: 250px !important">
    <h1 class="text-h4 font-weight-bold text-grey-darken-4">Create Student</h1>
    <p>Designed a student form to gather key details.</p>
    <v-form class="mt-5">
      <v-row>
        <v-col>
          <v-text-field
            v-model="$v.first_name.$model"
            :error-messages="showError($v.first_name)"
            label="First name"
            variant="underlined"
            color="primary"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="$v.last_name.$model"
            :error-messages="showError($v.last_name)"
            label="Last name"
            variant="underlined"
            color="primary"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="$v.email.$model"
            :error-messages="showError($v.email)"
            label="Email address"
            variant="underlined"
            color="primary"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="$v.gender.$model"
            :error-messages="showError($v.gender)"
            label="Gender"
            class="text-capitalize"
            variant="underlined"
            :items="['male', 'female']"
            color="primary"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="$v.course.$model"
            :error-messages="showError($v.course)"
            label="Course"
            variant="underlined"
            color="primary"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
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
          <v-text-field
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
          <v-text-field
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
      <div class="w-100 d-flex align-center mt-4">
        <v-btn flat>Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submit">Create</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import useStudentForm from "@/composables/useStudentForm";
import { showError } from "@/utils";

const { student, $v, submit } = useStudentForm();
</script>

<style scoped></style>
