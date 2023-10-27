<template>
  <div class="
      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      flex justify-center
    ">
    <div class="
        grid grid-cols-5 gap-y-2 gap-x-2
      ">
      <div 
        v-for="(card, index) in store.cardOrder"
        @click="store.clickCard(index)" 
        :key="index"
        :class="{'bg-green-500': card.matched, 'bg-orange-100': !card.matched}"
        class="
        box w-24 h-24
        flex items-center justify-center
        border border-black
        rounded-lg
        "
      >
      <img
        v-if="!card.isFront"
        :src="cardBack"
        alt="Card Back"
        class="rounded-lg"
      >
      <img 
        v-else 
        :src="getImagePath(card.value)"
        alt="Card Front"
        class="rounded-lg">
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/game.js";
import cardBack from '@/assets/cardBack.png';
const store = useGameStore();

import imageA from '@/assets/a.png';
import imageB from '@/assets/b.png';
import imageC from '@/assets/c.png';
import imageD from '@/assets/d.png';
import imageE from '@/assets/e.png';

const getImagePath = (value) => {
  switch (value) {
    case 'a': return imageA;
    case 'b': return imageB;
    case 'c': return imageC;
    case 'd': return imageD;
    case 'e': return imageE;
    default: return '';
  };
}
</script>