<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { IRecipe } from "@/data/IRecipe";
import type { Ref } from "vue";
import FetchService from "@/services/FetchService";

const recipe: Ref<IRecipe> = ref({} as IRecipe);
const url: Ref<string> = ref("");

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
});
</script>
<template>
  <div class="content-wrapper">
    <div class="item ingredients">
      <h1>{{ recipe.title }}</h1>
      <h3>Ingredients</h3>
      <div v-for="ingredient in recipe.ingredientList" :key="ingredient.id" class="ingredient">
        {{ ingredient.title }}
        {{ ingredient.nameOfRetailer }}
        {{ ingredient.price }}
      </div>
    </div>
    <div class="img-wrapper">
      <img :src="url" alt="Recipe image" />
    </div>
    <div class="item instruction-wrapper">
      <h3>Instructions</h3>
      <div v-for="instruction in recipe.instructionList" :key="instruction.stepId" class="instructions">
        <span>{{ instruction.stepId + 1 }}</span>
        <span>{{ instruction.text }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">

</style>
