<template>
  <div class="area">
    <Ingredient
      v-for="ingredient in popupStore.recipe.ingredientList"
      :key="ingredient.id"
      :ingredient="ingredient"
    />
  </div>
</template>
<script setup lang="ts">
import Ingredient from "@/components/Ingredient.vue";
import { usePopupStore } from "@/stores/PopupStore";
const popupStore = usePopupStore();
</script>

<style lang="scss">
.area {
  min-height: 100px;
  max-height: auto;
  padding: 8px;

  border-radius: 5px;
  border: 1px solid;
  overflow-y: hidden;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
