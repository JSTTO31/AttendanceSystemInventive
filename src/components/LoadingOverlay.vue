<template>
  <transition>
    <div v-if="show" class="d-flex align-center justify-center" id="overlay">
      <span class="loader"></span>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps(['show'])
</script>

<style scoped>
#overlay{
  position: fixed;
  background: rgba(0, 0, 0, .5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}
.loader {
  width: 48px;
  height: 48px;
  border: 3px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid;
  border-color: #1565C0 transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} </style>
