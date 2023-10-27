<template>
 <Counter /> 
  <result /> 
  <card />
  <button
    :class="store.buttonClass"
    class="
      absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2
      w-20 h-10
      border border-black
      rounded-lg
    "
    @click="store.start"
  >
    {{ store.startBtnText }}
  </button>
</template>

<script setup>
import { useGameStore } from "./stores/game.js";
import result from './components/result.vue';
import card from './components/card.vue';
import Counter from './components/counter.vue';

const store = useGameStore();
</script>
