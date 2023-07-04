<template>
  <h1 class="text-h4 font-weight-bold ">Courses</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  <v-row class="mt-5">
    <v-col v-for="category in categories" cols="4" :key="category.id">
      <v-hover v-slot="{isHovering, props}">
        <v-card :to="{name: 'CategoryCourse', params: {category_id: category.id}}" :elevation="isHovering ? 5 : 0"  v-bind="props" style="user-select: none;" class="d-flex flex-column border rounded-lg justify-center pa-10" >
          <h2>
            {{ category.name }}
          </h2>
          <v-list class="px-0">
            <v-list-item class="px-0" v-for="sub in category.sub_categories">{{ sub.name }}</v-list-item>
          </v-list>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
const {categories} = storeToRefs(useCategoryStore())
</script>

<style scoped>

</style>
