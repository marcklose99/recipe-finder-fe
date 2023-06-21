<script setup lang="ts">
import IngredientSelection from "@/components/popup/IngredientSelection.vue";
import InstructionSelection from "@/components/popup/InstructionSelection.vue";
import SelectionArea from "@/components/popup/SelectionArea.vue";
import { ref } from "vue";
import type { Ref } from "vue";
import RefreshIcon from "@/components/icons/RefreshIcon.vue";
import type { IInstruction } from "@/data/IInstruction";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";

const recipeCreationStore = useRecipeCreationStore();





</script>

<template>
  <form>
    <div class="flex-container">
      <div class="flex-fields">
        <label for="recipeName">
          <span>Recipe Name</span>
          <input id="recipeName" v-model="recipeCreationStore.recipe.title" />
        </label>

      

        <label for="ingredients">
          <span>Ingredients</span>
          <span class="ingredient-search">

          </span>
        </label>
      </div>

      
    </div>
    <IngredientSelection/>
    <SelectionArea />
    <InstructionSelection />
  </form>
</template>

<style scoped lang="scss">
form {
  margin-bottom: 60px;

  .flex-container {
    display: flex;
    column-gap: 25px;

    .flex-fields {
      width: 50%;
    }

    .upload-label {
      position: relative;
      width: 50%;
    }

    #image-upload {

      height: 124px;
      background-color: #f2f2f2;
    }

    .ingredient-search {
      position: relative;
    }

   
    }
  }
}
</style>