<script setup lang="ts">
import axios, { formToJSON, type AxiosResponse, Axios } from "axios";
import { useRecipeStore } from "@/stores/RecipeStore";
import type { IRecipe } from "@/data/IRecipe";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";

const recipeCreationStore = useRecipeCreationStore();
const recipeStore = useRecipeStore();

async function submitRecipe() {
  axios
    .postForm("http://localhost:8080/recipes", {
      recipe: new Blob(
        [
          JSON.stringify({
            title: recipeCreationStore.recipe.title,
            ingredientList: recipeCreationStore.recipe.ingredientList,
            instructionList: recipeCreationStore.recipe.instructionList,
          }),
        ],
        { type: "application/json" }
      ),
    })
    .then((response: AxiosResponse) => {
      const createdRecipe: IRecipe = response.data;
      recipeStore.allRecipes.push(createdRecipe);
    })
    .catch((error) => {
      switch (error.response.status) {
        default:
          console.log(
            "PopupFooter.vue no status case " + error.response.status
          );
          break;
      }
    });
}
</script>
<template>
  <div class="actions">
    <button @click="submitRecipe()" type="submit">Save Recipe</button>
  </div>
</template>
<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: start;

  button {
    align-items: center;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 1rem;
    justify-content: center;
    line-height: 1.5rem;
    padding: 8px;
    transition: 0.2s;
    border: 1px solid;
  }

  button:hover {
    background: #fff;
  }
}

button:nth-child(1) {
  margin-right: auto;
}
</style>
