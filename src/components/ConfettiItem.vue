<template>
  <div
  id="confetti"
  :style="{transform: `rotate(${rotate}deg)`, left: left + '%', top: top + '%', background: colors[selectedColor]}">

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const top = ref(-((Math.random() * 100)));
const left = Math.floor(Math.random() * 100);
const rotate = Math.floor((Math.random() * 50) - 25)
const colors = ['#615dec', '#4541ad', '#312f7f', '#23215a'];
const selectedColor = Math.floor(Math.random() * 3)


const interval = setInterval(() => {
  top.value++

  if(top.value >= 130){
    clearInterval(interval)
  }

})

</script>

<style scoped>
#confetti{
  position: fixed;
  top: 0;
  transform: rotate(-25deg);
  z-index: 55555;
  height: 30px;
  width: 10px;
}
</style>
