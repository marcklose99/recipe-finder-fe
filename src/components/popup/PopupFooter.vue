<script setup lang="ts">
import { usePopupStore } from "@/stores/PopupStore";
import axios, { formToJSON, type AxiosResponse, Axios } from "axios";
import { useRecipeStore } from "@/stores/RecipeStore";
import type { IRecipe } from "@/data/IRecipe";

const popupStore = usePopupStore();
const recipeStore = useRecipeStore();

async function submitRecipe() {
  axios
    .postForm("http://localhost:8080/recipes", {
      recipe: new Blob(
        [
          JSON.stringify({
            title: popupStore.recipe.title,
            ingredientList: popupStore.recipe.ingredientList,
            instructionList: popupStore.recipe.instructionList,
            imageName: popupStore.file.name,
          }),
        ],
        { type: "application/json" }
      ),
      file: popupStore.file,
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
  popupStore.isActive = !popupStore.isActive;
}
</script>
<template>
  <div class="actions">
    <button @click="popupStore.closeRecipe()">Cancel</button>
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
