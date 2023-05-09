<script setup lang="ts">
import RecipeGrid from "@/components/RecipeGrid.vue";
import HomeViewHeader from "@/components/HomeViewHeader.vue";
</script>

<template>
  <main>
    <HomeViewHeader />

    <div class="container recipes">
      <h2>Selber hinzugefügte Rezepte</h2>
      <RecipeGrid/>
    </div>
  </main>
</template>

<style lang="scss">
.container.recipes {
  padding-top: 100px;

  h2 {
    width: 100%;
    text-align: left;
    padding-left: 20px;
  }
}
</style>