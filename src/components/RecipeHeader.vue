<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import ImageCreation from "@/components/ImageCreation.vue";

const recipeName: Ref<string> = ref("");
const recipeDescription: Ref<string> = ref("");
</script>

<template>
  <div class="recipe-creation-header">
    <div class="information-wrapper">
      <h2>Erstellen Sie ihr Rezept!</h2>
      <form class="recipe-info-form">
        <input class="name" type="text" v-model="recipeName" />
        <h3>Description</h3>
        <textarea
          class="description"
          cols="30"
          rows="10"
          v-model="recipeDescription"
        ></textarea>
      </form>
    </div>

    <ImageCreation />
  </div>
</template>

<style lang="scss" scoped>
.recipe-creation-header {
  height: 300px;
  display: flex;
  column-gap: 35px;

  .information-wrapper {
    width: 50%;

    .recipe-info-form {
      input {
        width: 100%;
        margin-bottom: 5px;
      }

      .name {
        height: 45px;
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
