<script setup lang="ts">
import { usePopupStore } from '@/stores/PopupStore';
import axios from 'axios';
import {useRecipeStore} from "@/stores/RecipeStore";

const popupStore = usePopupStore();
const recipeStore = useRecipeStore();

async function submitRecipe() {
  const recipe = { id: popupStore.recipe.id,
    title: popupStore.recipe.title,
    ingredientList: popupStore.recipe.ingredientList
  };
  axios.post( `http://localhost:8080/recipes`, recipe
  );
  recipeStore.allRecipes.push(recipe)
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
          transition: .2s;
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