<script setup lang="ts">
import Ingredient from "@/components/Ingredient.vue";
import type { IIngredient } from "@/data/IIngredient";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import { defineEmits } from 'vue';

const emits = defineEmits(['changeCount']);
const recipeCreationStore = useRecipeCreationStore();

function initChange(ingredient: IIngredient) {
  recipeCreationStore.selectedIngredient = ingredient;
  emits('changeCount', ingredient)
}

</script>
<template>
  <div class="area">
    <Ingredient 
    class="ingredient-wrapper"
    @click="initChange(ingredient)" :show="false" :show-count="true"
      v-for="ingredient in recipeCreationStore.recipe.ingredientList" :key="ingredient.id" :ingredient="ingredient" />
  </div>
</template>


<style lang="scss">
.area {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  background-color: #f2f2f2;

  .ingredient-wrapper {
    cursor: pointer;
    &:hover {
      border-radius: 5px;
      background-color: #DDE0E7;
    }
  }
}
</style>
