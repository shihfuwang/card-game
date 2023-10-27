<template>
  <div 
    v-if="store.gameOver" 
    class="
      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      w-1/2 h-25
      text-center text-[70px]
      m-1.5
      text-red-500
      z-10
      bg-rose-100
      opacity-80
    "
  >
    {{ store.showMessage }}
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game.js";
const store = useGameStore();
</script>