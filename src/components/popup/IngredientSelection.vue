<script setup lang="ts">
import Ingredient from "@/components/Ingredient.vue";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";

const recipeCreationStore = useRecipeCreationStore();

</script>
<template>
  <div class="area">
    <Ingredient 
    :show="false" :show-count="true" :show-delete="true"
    v-for="ingredient in recipeCreationStore.recipe.ingredientList" :key="ingredient.id" :ingredient="ingredient" />
  </div>
</template>


<style lang="scss">
.area {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  background-color: #f2f2f2;
}
</style>
