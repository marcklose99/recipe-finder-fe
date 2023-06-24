<script setup lang="ts">
import { useRecipeStore } from "@/stores/RecipeStore";
import AddCard from "@/components/cards/AddCard.vue";
import RecipeCard from "@/components/cards/RecipeCard.vue";
import { computed, onMounted, ref, watch } from "vue";
import FetchService from "@/services/FetchService";
import type { Ref } from "vue";
import router from "@/router";

const recipeStore = useRecipeStore();

const hoveredRecipeId: Ref<Number | null> = ref(null);
const isEmpty: Ref<boolean> = computed(() => {
  return recipeStore.filteredRecipes.length === 0;
});


onMounted(async () => {
  recipeStore.allRecipes = await FetchService.fetchRecipe("all");
  recipeStore.filteredRecipes = recipeStore.allRecipes;
});

// Redirect to matching recipe view when a recipe has been clicked
function showMatchingRecipe(recipeId: number): void {
  router.push({
    name: "recipe",
    params: { id: recipeId },
  });
}
</script>

<template>
  <div class="recipe-grid">
    <RecipeCard
      v-for="recipe in recipeStore.filteredRecipes"
      :key="recipe.id"
      :recipe-data="recipe"
      :is-hovered="recipe.id === hoveredRecipeId"
      @mouseover="hoveredRecipeId = recipe.id"
      @mouseleave="hoveredRecipeId = null"
      @click="showMatchingRecipe(recipe.id)"
    >
      <template #action-icon> </template>
    </RecipeCard>
  </div>
  <p v-if="isEmpty">Leider gibt es keine passenden Ergebnisse!</p>
</template>

<style lang="scss" scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2em;
}
p {
  text-align: center;
}
</style>
