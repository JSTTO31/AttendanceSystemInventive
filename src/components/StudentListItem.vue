<template>
  <v-card
    class=" pa-3 rounded-b-0 mt-0 border-b"
    flat
    :to="{ name: 'ShowStudent', params: { student_id: student.id } }"
  >
    <v-row>
      <v-col class="d-flex align-center" cols="12" md="4">
        <v-avatar size="65" class="bg-grey-lighten-3">
          <v-img :src="student.image"></v-img>
        </v-avatar>
        <div class="ml-4 w-100 align-center d-flex">
          <div>
            <h4 style="text-transform: capitalize !important;">{{ student.first_name + " " + student.last_name }}</h4>
            <h5 class="font-weight-regular text-capitalize">{{ student.position }}</h5>
          </div>
          <v-spacer></v-spacer>
          <h4 v-if="mobile" class="mr-5 font-weight-bold text-capitalize">{{ parseInt(student.remaining).toFixed(0) + "h" }}</h4>
        </div>
      </v-col>
        <v-col class="d-flex align-center justify-center " md="2" cols="4">
         {{ timeIn }}
        </v-col>
        <v-col class="d-flex align-center justify-center " md="2" cols="4">
          {{ timeOut }}
        </v-col>
        <v-col class="d-flex align-center justify-center " md="2" cols="4">
          {{ workTime }}
        </v-col>
        <v-col class="d-flex align-center justify-center " md="2" v-if="!mobile" cols="3">
          {{ parseInt(student.remaining).toFixed(0) + "h" }}
        </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { Student } from "@/stores/student";
import { computed } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
const {mobile} = useDisplay()
const props = defineProps<{ student: Student }>();
const timeIn = computed(() =>
  props.student.attendance && props.student.attendance.time_in
    ? new Date(props.student.attendance.time_in).toLocaleTimeString()
    : "--"
);
const timeOut = computed(() =>
  props.student.attendance && props.student.attendance.time_out
    ? new Date(props.student.attendance.time_out).toLocaleTimeString()
    : "--"
);
const workTime = computed(() =>
  props.student.attendance &&
  props.student.attendance.time_in &&
  props.student.attendance.time_out
    ? parseInt(props.student.attendance.work_time).toFixed(0) + "h"
    : "--"
);
</script>

<style scoped></style>
