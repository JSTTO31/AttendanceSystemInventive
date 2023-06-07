<template>
  <v-navigation-drawer
    v-if="!$route.name?.toString().includes('Student')"
    location="right"
    width="350"
  >
    <v-layout class="h-100">
      <v-app-bar flat class="border-b">
        <v-btn class="rounded-0" flat icon="mdi-chevron-right"></v-btn>
        <h3 class="text-grey-darken-3 ml-3">OJT Students</h3>
      </v-app-bar>
      <v-main id="nav-right" style="overflow-y: scroll">
        <div class="px-5 pt-5">
          <v-card
            v-for="user in students"
            :key="user.email"
            class="d-flex flex-column justify-center align-center pa-5 rounded-xl mb-5 py-10"
            @click.prevent=""
            flat
          >
            <v-avatar size="125" class="bg-grey-lighten-4">
              <v-img :src="user.image"></v-img>
            </v-avatar>
            <v-card-text class="text-center">
              <h2>{{ `${user.first_name} ${user.last_name}` }}</h2>
              <h5 class="font-weight-regular">{{ user.email }}</h5>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="outlined">Present</v-btn>
              <v-btn variant="outlined" color="error">Absent</v-btn>
            </v-card-actions>
            <span></span>
          </v-card>
        </div>
      </v-main>
    </v-layout>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";

const { students } = storeToRefs(useStudentStore());
const exampleUser = [
  {
    name: "John Doe",
    email: "johndoe@example.example",
    image: "https://www.w3schools.com/w3images/avatar6.png",
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.example",
    image: "https://www.w3schools.com/howto/img_avatar2.png",
  },
  {
    name: "Jean Doe",
    email: "jeandoe@example.example",
    image: "https://www.w3schools.com/howto/img_avatar.png",
  },
];
</script>

<style scoped>
#nav-right::-webkit-scrollbar {
  background-color: transparent;
  width: 10px;
}
#nav-right::-webkit-scrollbar-thumb {
  background-color: transparent;
}

#nav-right:hover::-webkit-scrollbar-thumb {
  background-color: rgb(128, 128, 128);
  border-radius: 50px;
}
</style>
