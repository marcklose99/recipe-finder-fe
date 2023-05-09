<script setup lang="ts">
import Recipe from "@/components/Recipe.vue";
import {useRecipeStore} from "@/stores/RecipeStore";

const recipeStore = useRecipeStore();
</script>

<template>
<div class="recipe-grid">
  <Recipe
    v-for="(recipe, index) in recipeStore.filteredRecipes"
    :key="index"
    :recipe-data="recipe"/>
</div>
</template>

<style lang="scss">
.recipe-grid {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-auto-rows: auto;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}
</style>