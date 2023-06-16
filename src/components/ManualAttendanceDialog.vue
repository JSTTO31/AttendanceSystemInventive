<template>
  <v-dialog
    :model-value="showDialog"
    width="450"
    class="pb-15"
    @click:outside="emits('update:showDialog', false)"
  >
    <div class="rounded-lg bg-white pa-5">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-book-open-outline</v-icon>
        Manual Attendance</v-card-title
      >
      <v-card-text class="mt-3">
        <v-row>
          <v-col>
            <div>
              <label for="from">Time in:</label>
              <VueDatePicker
                v-model="timeIn"
                id="from"
                :flow="['month', 'year', 'time']"
                partial-flow
              ></VueDatePicker>
            </div>
          </v-col>
          <v-col>
            <div>
              <label for="to">Time out:</label>
              <VueDatePicker
                v-model="timeOut"
                id="to"
                :flow="['month', 'year', 'time']"
                partial-flow
              ></VueDatePicker>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">Save</v-btn>
        <v-btn>No</v-btn>
      </v-card-actions>
      <v-btn
        icon="mdi-close"
        variant="text"
        class="ma-1"
        size="small"
        @click="emits('update:showDialog', false)"
        style="position: absolute; top: 0; right: 0"
      ></v-btn>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
const props = defineProps(["showDialog"]);
const emits = defineEmits(["update:showDialog"]);
const timeIn = ref();
const timeOut = ref();
</script>

<style scoped></style>
