<script setup lang="ts">
import RecipeGrid from "@/components/RecipeGrid.vue";
import HomeViewHeader from "@/components/HomeViewHeader.vue";
</script>
<template>
  <HomeViewHeader />

  <div class="overview">
    <h2>Recipes</h2>
    <RecipeGrid />
  </div>
</template>
<style lang="scss" scoped>
  .overview {
    width: 100%;
  }

</style>
