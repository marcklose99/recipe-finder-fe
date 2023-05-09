<script setup lang="ts">

import type {PropType} from "vue";
import type {IRecipe} from "@/data/IRecipe";

defineProps({
  recipeData: {
    type: Object as PropType<IRecipe>
  }
})

</script>
<template>
<div class="recipe">
  <img :src="recipeData.imgSrc" alt="Bild">
  <h3>{{recipeData.title}}</h3>
</div>
</template>

<style lang="scss">
.recipe {
  width: 100%;
  height: 100%;
  max-width: 600px;
  background-color: #fff;
  display: grid;
  border-radius: 6px;
  box-shadow:
      0px 0.9px 2.2px rgba(0, 0, 0, 0.02),
      0px 2.2px 5.3px rgba(0, 0, 0, 0.028),
      0px 4.1px 10px rgba(0, 0, 0, 0.035),
      0px 7.4px 17.9px rgba(0, 0, 0, 0.042),
      0px 13.8px 33.4px rgba(0, 0, 0, 0.05),
      0px 33px 80px rgba(0, 0, 0, 0.07);
  padding: 8px;

  img {
    width: 100%;
    height: 185px;
    object-fit: cover;
    border-radius: 4px;
  }
}
</style>