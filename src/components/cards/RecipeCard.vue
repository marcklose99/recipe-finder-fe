<script setup lang="ts">
import type { IRecipe } from "@/data/IRecipe";
import { usePopupStore } from "@/stores/PopupStore";

const popupStore = usePopupStore();

const props = defineProps({
  recipeData: {
    type: Object as () => IRecipe,
    required: true,
  },
  isHovered: {
    type: Boolean,
  },
});

function loadRecipe() {
  popupStore.oldRecipe = props.recipeData; 
  popupStore.isActive = !popupStore.isActive;
}
</script>
<template>
  <div class="card recipe">
    <div v-if="props.isHovered" class="update-icon">
      <svg
        @click="loadRecipe()"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 122.61 122.88"
      >
        <path
          d="M111.9,61.57a5.36,5.36,0,0,1,10.71,0A61.3,61.3,0,0,1,17.54,104.48v12.35a5.36,5.36,0,0,1-10.72,0V89.31A5.36,5.36,0,0,1,12.18,84H40a5.36,5.36,0,1,1,0,10.71H23a50.6,50.6,0,0,0,88.87-33.1ZM106.6,5.36a5.36,5.36,0,1,1,10.71,0V33.14A5.36,5.36,0,0,1,112,38.49H84.44a5.36,5.36,0,1,1,0-10.71H99A50.6,50.6,0,0,0,10.71,61.57,5.36,5.36,0,1,1,0,61.57,61.31,61.31,0,0,1,91.07,8,61.83,61.83,0,0,1,106.6,20.27V5.36Z"
        />
      </svg>
    </div>
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
.recipe {
  display: flex;
  flex-direction: column;

  .update-icon {
    position: absolute;
    height: 10px;
    width: 12px;
    justify-content: flex-end;
  }

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
