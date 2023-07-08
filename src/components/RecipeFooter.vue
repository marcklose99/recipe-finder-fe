<script setup lang="ts">
import axios, { type AxiosResponse, Axios } from "axios";
import { useRecipeStore } from "@/stores/RecipeStore";

import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import router from "@/router";

const recipeCreationStore = useRecipeCreationStore();

async function submitRecipe() {
  await axios
    .postForm("http://localhost:8080/recipes", {
      recipe: new Blob(
        [
          JSON.stringify({
            id: recipeCreationStore.recipe.id,
            title: recipeCreationStore.recipe.title,
            instructionList: recipeCreationStore.recipe.instructionList,
            description: recipeCreationStore.recipe.description,
          }),
        ],
        { type: "application/json" }
      ),
      file: recipeCreationStore.file,
      ingredients: new Blob(
        [JSON.stringify(recipeCreationStore.recipe.ingredientList)],
        { type: "application/json" }
      ),
    })
    .then(async (response: AxiosResponse) => {
      router.push("/");
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
      <button class="save-button" @click="submitRecipe()" type="submit">Save Recipe</button>
  </div>
</template>
<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: start;

  .save-button {
      align-items: center;
      padding: 14px;
      margin: 0 auto;
      border: none;
      cursor: pointer;
      border: 1px solid black;
      border-radius: 4px;
    

    .button:hover {
      background: #fff;
    }
  }
}

</style>
