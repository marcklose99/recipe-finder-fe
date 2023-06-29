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
  console.log(recipe.value.description)
});
</script>
<template>
  <div class="recipe-header">
    <div class="recipe-info">
      <p>{{ recipe.title }}</p>
      <p>{{ recipe.description }}</p>
    </div>
    <div class="recipe-image-wrapper">
      <img :src="url" alt="Recipe Image" />
    </div>
  </div>
</template>
<style lang="scss">
.recipe-header {
  display: flex;
  justify-content: space-evenly;

  .recipe-info {
    display: flex;
    flex-direction: column;
    width: 50%;
    p {
      width: 100%;
      word-wrap: break-word;
    }
  }
  .recipe-image-wrapper {
    width: 50%;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
