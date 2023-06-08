<script setup lang="ts">
import type { IRecipe } from "@/data/IRecipe";
import { usePopupStore } from "@/stores/PopupStore";

const popupStore = usePopupStore();

const props = defineProps({
  recipeData: {
    type: Object as () => IRecipe,
    required: true,
  }
});
</script>
<template>
  <div class="card recipe">

    <slot name="action-icon"></slot>
    <div class="card-heading">
      <img src="/" alt="Profile Image" />
      <h2>{{ props.recipeData.title }}</h2>
    </div>
    <div class="card-content">
      <span class="count-row">
        Zutaten im Angebot:
        <span calss="count">3/7</span>
      </span>
      <span class="retailer-row">
        Anzahl an Märkten:
        <span class="retailer">3</span>
      </span>
      <span class="valid-row">
        Gültig bis:
        <span class="valid">26.06.2023</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/Card.scss";
.card.recipe {
  display: flex;
  flex-direction: column;

  .card-heading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
