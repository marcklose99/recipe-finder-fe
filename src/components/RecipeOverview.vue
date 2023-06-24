<script setup lang="ts">
import RecipeGrid from "@/components/RecipeGrid.vue";
import HomeViewHeader from "@/components/HomeViewHeader.vue";
</script>
<template>
  <div class="content-wrapper">
    <HomeViewHeader />

    <div class="overview">
      <h2>Recipes</h2>
      <RecipeGrid />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 80px;
  width: 100%;

  .overview {
    width: 100%;
  }
}
</style>
