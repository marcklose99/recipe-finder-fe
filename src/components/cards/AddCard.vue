<script setup lang="ts">

import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";

const recipeCreationStore = useRecipeCreationStore();
</script>

<template>
  <div class="card add">
    <div class="plus">
    </div>
  </div>
</template>


<style lang="scss">
@import '@/assets/scss/Card.scss';

.add {
  display: flex;
  justify-content: center;
  align-items: center;
  .plus {
    --b: 4px;
    width: 40px; 
    aspect-ratio: 1;
    border-radius: 50%;
    background: conic-gradient(from 90deg at var(--b) var(--b), #fff 90deg, #000 0) calc(100% + var(--b) / 2) calc(100% + var(--b)/2)/
    calc(50%  + var(--b)) calc(50% + var(--b));
  }
}

</style>