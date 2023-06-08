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
  padding: 8px;
  margin-bottom: 35px;
  border-radius: 5px;
  overflow-y: hidden;
  background-color: #f2f2f2;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
