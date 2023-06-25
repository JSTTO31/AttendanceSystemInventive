<template>
  <v-card
    v-if="!url.length"
    @click="showDialog"
    id="image-container"
    height="160"
    width="100%"
    class="d-flex align-center justify-center bg-transparent"
    flat
  >
    <v-icon color="primary" size="25"  dense>mdi-plus</v-icon>
  </v-card>
  <v-hover v-else v-slot="{ props, isHovering }">
    <v-card
      v-bind="props"
      style="width: 150px; height: 150px; position: relative"
      class="border bg-transparent d-flex align-center justify-center"
      flat
      @click="showDialog"
    >
      <img :src="url" />
      <v-btn
        v-if="!persistent || (beforeUrl.length > 0 && beforeUrl != url)"
        id="remove"
        icon="mdi-close"
        size="x-small"
        class="mt-n4 mr-n4"
        color="grey-lighten-2"
        @click.stop="removeImage"
      ></v-btn>
      <v-overlay :model-value="isHovering" contained class="d-flex align-center justify-center">
        <v-icon color="white" size="60">mdi-image-edit</v-icon>
      </v-overlay>
    </v-card>
  </v-hover>

  <input id="file" type="file" @change="setImage" hidden ref="file" accept="image/png, image/jpg, image/jpeg" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  image: {},
  url: { default: "", type: String },
  persistent: { default: true },
  disabled: {default: false}
});
const beforeUrl = props.url;
const emits = defineEmits(["update:image", "remove", "update"]);
const url = ref(props.url);
const file = ref();
const showDialog = () => {
  if(props.disabled){
    return;
  }
  file.value.click();
};
const setImage = (e: any) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      //@ts-ignore
      url.value = reader.result;
      emits("update:image", file);
    };

    reader.readAsDataURL(file);
    //@ts-ignore
    document.getElementById("file").value = "";

    emits("update");
  }
};
const removeImage = () => {
  emits("update:image", "");
  url.value = beforeUrl;

  emits("remove");
};
</script>

<style scoped>

#image-container {
  border: 2px dashed rgb(22, 119, 247);

}
#remove {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10000;
}
#footer {
  position: absolute;
  bottom: 0;
}
</style>
