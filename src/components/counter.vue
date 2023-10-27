<template>
  <div 
    :class="store.gameStart || store.gameOver ? 'visible' : 'invisible'"
    class="
      absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
      font-normal
      text-[50px]
    "
  >
    00:{{ store.countDown < 10 ? '0' + store.countDown : store.countDown }} 
  </div>
</template>


<script setup>
import { watch } from 'vue';
import { useGameStore } from "../stores/game.js";

const store = useGameStore();

watch(() => store.gameStart, (newVal) => {
  if (newVal) {
    store.countDown = 60;
    store.timer = setInterval(() => {
      store.countDown--;
      if (store.countDown === 0) {
        clearInterval(store.timer);
        store.gameStart = false
        store.gameOver = true;
      }
    }, 1000)
  } else {
    clearInterval(store.timer);
    store.gameOver = true;
  }
});
</script>
