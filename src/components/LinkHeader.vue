<script setup lang="ts">
import type { IRecipe } from "@/data/IRecipe";
import router from "@/router";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";

const recipeCreationStore = useRecipeCreationStore();

function newRecipe() {
  recipeCreationStore.recipe = {
    id: 0,
    title: "",
    ingredientList: [],
    instructionList: [],
    imageName: "",
    description: "",
  }
  router.push("/create");
  
}
</script>

<template>
  <nav class="link-header">
    <router-link class="link" to="/">Home</router-link>
    <div @click="newRecipe()" class="link">Rezept hinzufügen</div>
  </nav>
</template>

<style lang="scss" scoped>
.link-header {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  column-gap: 10px;
  .link {
    text-align: center;
    font-size: 21px;
    line-height: 27px;
    color: var(--nav-link);
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      animation: hover 5s ease-in-out;
      color: #494449;;
    }
  }
}
</style>
