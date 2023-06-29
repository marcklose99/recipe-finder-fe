<script setup lang="ts">
import axios, { formToJSON, type AxiosResponse, Axios } from "axios";
import { useRecipeStore } from "@/stores/RecipeStore";
import type { IRecipe } from "@/data/IRecipe";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import { watch } from "vue";

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
            description: recipeCreationStore.recipe.description,
          }),
        ],
        { type: "application/json" }
      ),
      file: recipeCreationStore.file,
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
    <router-link class="save-button" to="/">
    <button @click="submitRecipe()" type="submit">
      Save Recipe
      </button>
      </router-link>
  </div>
</template>
<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: start;

  .save-button {
    button {
      align-items: center;
      padding: 14px;
      margin: 0 auto;
      border: none;
      cursor: pointer;
      border: 1px solid black;
      border-radius: 4px;
    }

    .save-button:hover {
      background: #fff;
    }
  }
}

button:nth-child(1) {
  margin-right: auto;
}
</style>
