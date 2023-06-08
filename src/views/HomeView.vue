<script setup lang="ts">
import RecipeGrid from "@/components/RecipeGrid.vue";
import HomeViewHeader from "@/components/HomeViewHeader.vue";
import AddPopup from "@/components/popup/AddPopup.vue";
import {usePopupStore} from "@/stores/PopupStore";

const popupStore = usePopupStore();
</script>

<template>
  <AddPopup
      v-if="popupStore.isActive"
  />
  <main>
    <HomeViewHeader/>
    <div class="container recipes">
      <h2>Selbst hinzugefügte Rezepte</h2>
      <RecipeGrid/>
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

  h2 {
    width: 100%;
    text-align: left;
    padding-left: 20px;
  }
}


</style>