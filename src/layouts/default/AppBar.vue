<template>
  <v-app-bar class="px-5" flat color="primary">
    <h1>
      <v-icon class="mr-1" size="45">mdi-calendar</v-icon>
      eAttendance
    </h1>
    <div class="w-25 ml-5">
      <v-text-field
        label="find students..."
        variant="solo"
        single-line
        density="compact"
        hide-details
      ></v-text-field>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <v-avatar size="45">
        <v-img src="https://www.w3schools.com/w3css/img_avatar3.png"></v-img>
      </v-avatar>
      <div>
        <h5 class="ml-3 font-weight-bold">{{ user.name }}</h5>
        <h6 class="ml-3 font-weight-regular">{{ "administrator" }}</h6>
      </div>
      <v-btn size="small" class="ml-5" icon="mdi-chevron-down"></v-btn>
    </div>
  </v-app-bar>
  <v-navigation-drawer class="pa-5">
    <v-list>
      <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">
        Attendance Management
      </h5>
      <v-list-item
        class="my-2 rounded-lg"
        active
        color="primary"
        @click.prevent=""
        title="Dashboard"
        prepend-icon="mdi-view-dashboard-outline"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        @click.prevent=""
        title="Activities"
        prepend-icon="mdi-chart-arc"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        @click.prevent=""
        title="Students"
        prepend-icon="mdi-school"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        @click.prevent=""
        title="Add student"
        prepend-icon="mdi-plus"
      >
      </v-list-item>
    </v-list>
    <v-list>
      <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">Courses</h5>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        @click.prevent=""
        title="View courses"
        prepend-icon="mdi-book-open"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        @click.prevent=""
        title="Add course"
        prepend-icon="mdi-plus"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer location="right" width="350">
    <v-layout class="h-100">
      <v-app-bar flat class="border-b">
        <v-btn class="rounded-0" flat icon="mdi-chevron-right"></v-btn>
        <h3 class="text-grey-darken-3 ml-3">OJT Students</h3>
      </v-app-bar>
      <v-main class="pb-15" id="nav-right" style="overflow-y: scroll">
        <div class="px-5">
          <v-card
            v-for="user in exampleUser"
            :key="user.email"
            class="d-flex flex-column justify-center align-center pa-5 rounded-xl mb-5 py-10"
            @click.prevent=""
            flat
          >
            <v-avatar size="125">
              <v-img :src="user.image"></v-img>
            </v-avatar>
            <v-card-text class="text-center">
              <h2>{{ user.name }}</h2>
              <h5>{{ user.email }}</h5>
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

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useUserStore());

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
  width: 5px;
}
#nav-right::-webkit-scrollbar-thumb {
  background-color: transparent;
}

#nav-right:hover::-webkit-scrollbar-thumb {
  background-color: rgb(206, 206, 206);
  border-radius: 50px;
}
</style>
