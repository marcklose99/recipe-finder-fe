<script setup lang="ts">
import RecipeGrid from "@/components/RecipeGrid.vue";
import HomeViewHeader from "@/components/HomeViewHeader.vue";
import AddPopup from "@/components/popup/AddPopup.vue";
import { usePopupStore } from "@/stores/PopupStore";
import AddCard from "@/components/cards/AddCard.vue";

</script>

<template>
  <!-- <AddPopup v-if="popupStore.isActive" /> -->
  <main>
    <HomeViewHeader />
    <div class="container recipes">
      <div class="heading">
        <h2>Selbst hinzugefügte Rezepte</h2>
        <AddCard />
      </div>

      <RecipeGrid />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container.recipes {
  padding-top: 100px;

  .heading {
    padding: 0px 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  h2 {
    width: 100%;
    text-align: left;
    padding-left: 20px;
  }
}
</style>
