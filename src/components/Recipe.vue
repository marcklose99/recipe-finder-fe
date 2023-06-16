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
      <div
        v-for="ingredient in recipe.ingredientList"
        :key="ingredient.id"
        class="ingredient"
      >
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
      <div
        v-for="instruction in recipe.instructionList"
        :key="instruction.stepId"
        class="instructions"
      >
        <span>{{ instruction.stepId+1 }}</span>
        <span>{{ instruction.text }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.content-wrapper {
  height: 100vh;
  margin: 0 80px;
  display: flex;
  justify-content: center;
  align-items: center;



  .item {
    flex: 1 1 0;
    height: 600px;
    padding: 40px;
    border-radius: 25px;
    box-shadow:
        0px 0.9px 2.2px rgba(0, 0, 0, 0.02),
        0px 2.2px 5.3px rgba(0, 0, 0, 0.028),
        0px 4.1px 10px rgba(0, 0, 0, 0.035),
        0px 7.4px 17.9px rgba(0, 0, 0, 0.042),
        0px 13.8px 33.4px rgba(0, 0, 0, 0.05),
        0px 33px 80px rgba(0, 0, 0, 0.07);
  background-color: rgba(196, 215, 178, 0.5)
  }

  .instrution-wrapper {
    justify-content: flex-end;
  }
  .instructions {
    display: grid;
    grid-template-columns: 10% 90%;
    gap: 10px;
  }

  .img-wrapper {
    margin: 0 60px;
    height: 500px;
    width: 500px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .ingredients {
    .ingredient {
        background-color: white;
        padding: 15px;
        margin-left: 20px;
        margin-top: 3px;
        border-radius: 8px;
        box-shadow:
        0px 0.9px 2.2px rgba(0, 0, 0, 0.02),
        0px 2.2px 5.3px rgba(0, 0, 0, 0.028),
        0px 4.1px 10px rgba(0, 0, 0, 0.035),
        0px 7.4px 17.9px rgba(0, 0, 0, 0.042),
        0px 13.8px 33.4px rgba(0, 0, 0, 0.05),
        0px 33px 80px rgba(0, 0, 0, 0.07);
    }
  }
}
</style>
