<template>
  <v-dialog :model-value="showDialog" @click:outside="emits('update:showDialog', false)" width="650">
   <v-card class="pa-2 rounded-lg" :disabled="isLoading">
      <v-card-text>
        <h3 class="d-flex align-center mb-5">
          <v-icon class="mr-2">mdi-plus</v-icon>
          New Course
          <v-spacer></v-spacer>
        </h3>
        <v-row>
          <v-col cols="4">
            <div>
              <h5 class="mb-2">Course Image</h5>
              <div class="">
                <ImageCard v-model:image="$v.image.$model" :url="edit.url"></ImageCard>
                <v-list>
                  <v-list-item class="text-error text-caption">
                    {{showError($v.image)}}
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-col>
          <v-col cols="8">
            <div>
            <h5 class="mb-2">
              Course name
            </h5>
            <v-text-field v-model="$v.name.$model" :error-messages="showError($v.name)" type="text" color="primary" variant="outlined" single-line density="compact" class="mt-2"  label="Name"></v-text-field>
          </div>
          <div>
            <h5>
              Course description
            </h5>
              <v-textarea v-model="$v.description.$model" rows="1" auto-grow color="primary" variant="outlined" single-line density="compact" class="mt-2"  label="Description"></v-textarea>
            </div>
            <div>
              <h5>Select number of session</h5>
              <div class="d-flex flex-wrap mt-2">
                <v-select v-model="$v.number_of_session.$model"  color="primary" :items="[1, 2, 3, 4, 5]" variant="outlined" single-line density="compact" class="mt-2"  label="Select"></v-select>
              </div>
            </div>
            <div>
              <h5>Select Sub Category</h5>
              <div class="d-flex flex-wrap mt-2">
                <v-btn @click="$v.sub_category_id.$model = sub.id" class="rounded-0 mr-1 mt-1" size="small" v-for="sub in category.sub_categories"
                :variant="$v.sub_category_id.$model == sub.id ? 'elevated' : 'outlined'" color="primary">
                {{ sub.name }}
              </v-btn>
              </div>
          </div>
          </v-col>
        </v-row>
        <div class="d-flex mt-5">
          <v-btn class="mr-1" color="primary" @click="submit" :loading="isLoading">Save</v-btn>
          <v-btn class="mr-1" variant="text" @click="emits('update:showDialog', false)">Cancel</v-btn>
        </div>
      </v-card-text>
   </v-card>
 </v-dialog>
</template>

<script setup lang="ts">
import useCourseEdit from '../composables/useCourseEdit'
import {useCourseStore} from '../stores/course'
import ImageCard from './ImageCard.vue'
import { showError } from '@/utils';
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';
import { ref } from 'vue';
const props = defineProps(['showDialog', 'course'])
const {edit, $v} = useCourseEdit(props.course)
const emits = defineEmits(['update:showDialog'])
const {category} = storeToRefs(useCategoryStore())
const isLoading = ref(false)
const submit = () => {
  if($v.value.$invalid){
    $v.value.$touch()
    return
  }
  isLoading.value = true
  const $course = useCourseStore()
  
  //@ts-ignore
  if(edit.image && edit.image.type && edit.image.type.includes('image'))
  {
    $course.changeImage(props.course.sub_category_id, props.course.id, edit.image).then(() => {
      if($v.value.name.$dirty || $v.value.sub_category_id.$dirty || $v.value.description.$diry || $v.value.     number_of_session.$dirty){
        $course.update(props.course.sub_category_id, props.course.id, edit).then(() => {
          isLoading.value = false;
          emits('update:showDialog', false)
        });
        return
      }

       isLoading.value = false;
       emits('update:showDialog', false)
    })
    return
  }

  $course.update(props.course.sub_category_id, props.course.id, edit).then(() => {
    isLoading.value = false;
    emits('update:showDialog', false)
  });
 
}
onMounted(() => {
  $v.value.sub_category_id.$model = category.value.sub_categories[0].id || -1
})


</script>

<style scoped>

</style>
