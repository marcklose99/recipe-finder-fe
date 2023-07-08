<script setup lang="ts">
import type { IIngredient } from "@/data/IIngredient";
import type { IRecipe } from "@/data/IRecipe";
import axios from "axios";
import type { PropType, Ref } from "vue";
import { computed, onBeforeMount, onMounted, ref } from "vue";

const props = defineProps({
  recipeData: {
    type: Object as PropType<IRecipe>,
    required: true,
  },
});

let imageUrl: Ref<string> = ref("");

const offerCount: Ref<string> = computed(() => {
  const offerCount: IIngredient[] = props.recipeData.ingredientList.filter(
    (ingredient) => ingredient.isValid
  );
  return `${offerCount.length} / ${props.recipeData.ingredientList.length}`;
});

const marketCount: Ref<number> = computed(() => {
  const retailer = props.recipeData.ingredientList.map(
    (ingredient) => ingredient.nameOfRetailer
  );
  const markets = new Set<string>(retailer);
  return markets.size;
});

const validTo: Ref<String> = computed(() => {
  const ingredients = props.recipeData.ingredientList.filter(
    (ingredient) => ingredient.isValid
  );
  const dates = ingredients.map((ingredient) => ingredient.validTo);
  let smallestDate: Date = new Date("00/00/0000");
  if (dates.length != 0) {
    smallestDate = dates.reduce((minDate, currentDate) => {
      if (currentDate < minDate) {
        return currentDate;
      } else {
        return minDate;
      }
    });
  }

  return dates.length != 0 ? new Date(smallestDate)
    .toLocaleTimeString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split(",")[0] : "Nicht im Angebot";
});
onBeforeMount(() => {});
onMounted(async () => {
  await axios
    .get(`http://localhost:8080/recipes/${props.recipeData.id}/image`)
    .then((response) => {
      imageUrl.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching image URL:", error);
    });
});
</script>
<template>
  <div class="card recipe">
    <div class="image-wrapper">
      <img :src="imageUrl" alt="Recipe Image" />
    </div>
    <h2>{{ props.recipeData.title }}</h2>
    <div class="card-content">
      <span class="count-row"> Zutaten im Angebot: </span>
      <span class="count">{{ offerCount }}</span>
      <span class="retailer-row"> Anzahl an Märkten: </span>
      <span class="retailer">{{ marketCount }}</span>
      <span class="valid-row"> Gültig bis: </span>
      <span class="valid-to">{{ validTo }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/Card.scss";
.card.recipe {
  min-height: 350px;
  cursor: pointer;

  &:hover {
    h2 {
      color: #a0c49d;
      transition: color 0.4s ease-in-out;
    }
  }
  .image-wrapper {
    border-radius: 12px;
    overflow: hidden;

    img {
      height: 200px;
      min-width: 150px;
      width: 100%;
      object-fit: cover;
    }
  }

  .card-content {
    display: grid;
    grid-template-columns: 65% 35%;
  }
}
</style>
