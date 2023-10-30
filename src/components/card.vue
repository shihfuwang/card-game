<template>
  <div
    class="
      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      flex justify-center
    "
  >
    <div
      class="
        grid grid-cols-5 gap-y-2 gap-x-2
      "
    >
      <div
        v-for="(card, index) in store.cardOrder"
        :key="index"
        :class="{
          'bg-green-300': card.matched,
          'bg-orange-100': !card.matched,
          'bg-red-300': card.failed
        }" 
        class="
          box w-24 h-24
          flex items-center justify-center
          border border-black rounded-lg
        " 
        @click="store.clickCard(index)">
        <div
          class="flip-card-inner"
          :class="{ 'canFlip': !card.isFront }"
        >
          <div 
            class="flip-card-front rounded-lg"
          >
            <img 
              :src="getImagePath(card.value)" 
              alt="Card Front"
              class="rounded-lg"
            >
          </div>
          <div
            class="flip-card-back rounded-lg"
          >
            <img
              :src="cardBack"
              alt="Card Back"
              class="rounded-lg"
          >
          </div>
        </div>
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

<style scoped>
.box {
  perspective: 1000px; /*深度*/
  position: relative;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s; /*翻轉速度*/
  transform-style: preserve-3d; /*保留3D轉換*/
}

.flip-card-inner.canFlip {
  transform: rotateY(180deg); /*圍繞 Y 軸（垂直軸）旋轉 180 度*/
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /*旋轉時背面不可見*/
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card-front {
  transform: rotateY(0);
}

.flip-card-back {
  transform: rotateY(180deg);
}
</style>

