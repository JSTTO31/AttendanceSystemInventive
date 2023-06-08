<template>
  <v-navigation-drawer class="pa-5">
    <v-list>
      <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">
        Attendance Management
      </h5>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        @click="$router.push({ name: 'Home' })"
        :active="$route.name == 'Home'"
        title="Dashboard"
        prepend-icon="mdi-view-dashboard-outline"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        :to="{name: 'Activities'}"
        title="Activities"
        prepend-icon="mdi-chart-arc"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        :to="{ name: 'IndexStudent' }"
        title="Students"
        prepend-icon="mdi-school"
      >
      </v-list-item>
      <v-list-item
        class="my-2 rounded-lg"
        color="primary"
        title="Add student"
        :to="{ name: 'CreateStudent' }"
        prepend-icon="mdi-plus"
      >
      </v-list-item>
    </v-list>
    <v-list>
      <h5 class="font-weight-regular text-grey-darken-1 mb-2 text-uppercase">
        Courses
      </h5>
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
</template>

<script setup lang="ts"></script>

<style scoped></style>
