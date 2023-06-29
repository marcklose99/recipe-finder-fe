<script setup lang="ts">
import type { Ref } from "vue";
import { computed, ref } from "vue";
import ImageCreation from "@/components/ImageCreation.vue";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";

const recipeCreationStore = useRecipeCreationStore();

</script>

<template>
  <div class="recipe-creation-header">
    <div class="information-wrapper item">
      <h2>Erstellen Sie ihr Rezept!</h2>
      <form class="recipe-info-form">
        <div class="input-wrapper">
          <h4>Titel</h4>
          <input
            type="text"
            class="title"
            v-model="recipeCreationStore.recipe.title"
            required
          />
        </div>
        <h4>Beschreibung</h4>
        <textarea
          class="description"
          cols="30"
          rows="10"
          v-model="recipeCreationStore.recipe.description"
        ></textarea>
      </form>
    </div>

    <ImageCreation class="item" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";
@import "@/assets/scss/RecipeCreation.scss";
.recipe-creation-header {
  height: 350px;
  display: flex;
  column-gap: 35px;

  .information-wrapper {
    width: 50%;

    .recipe-info-form {
      h4 {
        margin: 10px 0;
      }
      .input-wrapper {
        title:invalid {
          position: absolute;
          height: 18px;
          border: 1px solid red;
        }
      }
      .description {
        resize: none;
        width: 100%;
        height: 120px;
      }
    }
  }
}
</style>
