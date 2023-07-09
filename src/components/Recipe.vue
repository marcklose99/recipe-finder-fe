<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { IRecipe } from "@/data/IRecipe";
import type { Ref } from "vue";
import FetchService from "@/services/FetchService";
import Ingredient from "@/components/Ingredient.vue";
import InstructionSelection from "@/components/InstructionSelection.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import router from "@/router";
import { useRecipeStore } from "@/stores/RecipeStore";

const recipe: Ref<IRecipe> = ref({} as IRecipe);
const url: Ref<string> = ref("");
const recipeCreationStore = useRecipeCreationStore();
const recipeStore = useRecipeStore();

function loadRecipe() {
  recipeCreationStore.recipe = recipe.value;
  router.push({
    name: "create",
  });
}

function deleteRecipe() {
  axios.delete(`http://localhost:8080/recipes/${recipe.value.id}`);
  const recipe1: Ref<any> = ref(
    recipeStore.allRecipes.find((recipe1) => recipe1.id === recipe.value.id)
  );
  recipeStore.allRecipes.indexOf(recipe1.value);
  router.push("/");
}

onMounted(async () => {
  const route = useRoute() as RouteLocationNormalizedLoaded;
  const recipeId = route.params.id;
  axios
    .get(`http://localhost:8080/recipes/${recipeId}`)
    .then((response) => {
      recipe.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
  const imageUrl = await FetchService.fetchImage(route.params.id);
  url.value = imageUrl;
  console.log(recipe.value);
});
</script>
<template>
  <div class="recipe-header">
    <div class="recipe-info">
      <h3>{{ recipe.title }}</h3>
      <p>{{ recipe.description }}</p>
    </div>
    <div class="recipe-image-wrapper">
      <img :src="url" alt="Recipe Image" />
    </div>
    <EditIcon @click="loadRecipe()" />
    <DeleteIcon class="delete-icon" @click="deleteRecipe" />
  </div>
  <main>
    <div class="recipe-ingredients">
      <Ingredient
        :ingredient="ingredient"
        :showCount="true"
        v-for="ingredient in recipe.ingredientList"
      />
    </div>
    <div class="recipe-instructions">
      <InstructionSelection
        :instructions="recipe.instructionList"
        :showBtn="false"
      />
    </div>
  </main>
</template>
<style lang="scss" scoped>
.recipe-header {
  display: flex;
  justify-content: space-evenly;
  max-height: 300px;
  overflow: hidden;
  .edit-icon {
    width: 24px;
    position: absolute;
    cursor: pointer;
    left: 100%;
    transform: translate(-100%);
  }

  .delete-icon {
    width: 24px;
    position: absolute;
    cursor: pointer;
    left: 100%;
    transform: translate(-100%);
    top: 35px;
  }

  .recipe-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      word-wrap: break-word;
    }
    p {
      word-wrap: break-word;
      width: 70%;
      text-align: center;
    }
  }
  .recipe-image-wrapper {
    display: flex;
    img {
      margin: 0 auto;
    }
  }
}

main {
  display: flex;

  .recipe-ingredients {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 50%;
  }
  .recipe-instructions {
    width: 50%;
  }
}
</style>
