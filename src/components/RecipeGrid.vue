<script setup lang="ts">
import {useRecipeStore} from "@/stores/RecipeStore";
import AddCard from "@/components/cards/AddCard.vue";
import RecipeCard from "@/components/cards/RecipeCard.vue";
import {onMounted, onUpdated, ref} from "vue";
import FetchService from "@/services/FetchService";
import type { Ref } from 'vue';
import EditIcon from "@/components/icons/EditIcon.vue";

const recipeStore = useRecipeStore();

const hoveredRecipeId: Ref<Number | null> = ref(null);

onMounted(async () => {
  console.log("Mounted!")
  recipeStore.allRecipes = await FetchService.fetchMatches();
  recipeStore.filteredRecipes = recipeStore.allRecipes;
});

</script>

<template>
  <div class="recipe-grid">
    <AddCard/>
    <RecipeCard
        v-for="recipe in recipeStore.filteredRecipes"
        :key="recipe.id"
        :recipe-data="recipe"
        :is-hovered="recipe.id === hoveredRecipeId"
        @mouseover="hoveredRecipeId = recipe.id"
        @mouseleave="hoveredRecipeId = null"
    >
      <template #action-icon>
        <EditIcon/>
      </template>
    </RecipeCard>
  </div>
</template>

<style lang="scss" scoped>
.recipe-grid {
  padding: 20px;
  background-color: #fff;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2em;

  .update-icon {
    position: absolute;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
}
</style>