<script setup lang="ts">
import type { IIngredient } from "@/data/IIngredient";
import type { IRecipe } from "@/data/IRecipe";
import axios from "axios";
import type { PropType, Ref } from "vue";
import { computed, onMounted } from "vue";

const props = defineProps({
  recipeData: {
    type: Object as PropType<IRecipe>,
    required: true,
  },
});

let imageUrl: string;

const offerCount: Ref<string> = computed(() => {
  const offerCount: IIngredient[] = props.recipeData.ingredientList.filter(
    (ingredient) => ingredient.isValid
  );
  return `${offerCount.length} / ${props.recipeData.ingredientList.length}`;
});

const marketCount: Ref<number> = computed(() => {
  const markets = new Set<IIngredient>(props.recipeData.ingredientList);
  return markets.size;
});

const validTo: Ref<String> = computed(() => {
  
    const dates = props.recipeData.ingredientList.map((ing) => ing.validTo);
    const smallestDate: Date = dates.reduce((minDate, currentDate) => {
      if (currentDate < minDate) {
        return currentDate;
      } else {
        return minDate;
      }
    });
    
    return new Date(smallestDate).toLocaleTimeString(
        [],
        {
            day: '2-digit',
            month:'2-digit',
            year: 'numeric'
        }
    ).split(',')[0];
});

onMounted( async() => {
  await axios.get(`http://localhost:8080/recipes/${props.recipeData.id}/image`)
      .then(response => {
        imageUrl = response.data;
      })
      .catch(error => {
        console.error('Error fetching image URL:', error);
      });
});
</script>
<template>
  <div class="card recipe">
    <slot name="action-icon"></slot>
    <div class="card-heading">
      <img :src="imageUrl" alt="Profile Image" />
      <h2>{{ props.recipeData.title }}</h2>
    </div>
    <div class="card-content">
      <span class="count-row">
        Zutaten im Angebot:
        <span calss="count">{{ offerCount }}</span>
      </span>
      <span class="retailer-row">
        Anzahl an Märkten:
        <span class="retailer">{{ marketCount }}</span>
      </span>
      <span class="valid-row">
        Gültig bis:
        <span class="valid-to">{{ validTo }}</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/Card.scss";
.card.recipe {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .card-heading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      height: 100px;
      width: 100px;
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
