<script setup lang="ts">
import type { IIngredient } from "@/data/IIngredient";
import type { Ref } from "vue";
import { computed, onMounted } from "vue";
import { Retailer } from "@/data/Retailer";
import EdekaIcon from "./icons/EdekaIcon.vue";
import KauflandIcon from "./icons/KauflandIcon.vue";
import KlaasKockIcon from "./icons/KlaasKockIcon.vue";
import RealIcon from "./icons/RealIcon.vue";
import ReweIcon from "./icons/ReweIcon.vue";
import HITUllrichIcon from "./icons/HITUllrichIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";


const recipeCreationStore = useRecipeCreationStore();
const props = defineProps({
  ingredient: {
    type: Object as () => IIngredient,
    required: true,
  },
  show: {
    type: Boolean,
    default: true,
    required: false,
  },
  showCount: {
    type: Boolean,
    required: false,
  },
  showDelete: {
    type: Boolean,
    required: false,
  },
  hover: {
    type: Boolean,
    default: true,
    required: false,
  },
});

const retailerLogo = computed(() => {
  const name = props.ingredient.nameOfRetailer.toLocaleUpperCase();
  if (name.includes(Retailer.EDEKA) || name.includes(Retailer.E_CENTER)) {
    return EdekaIcon;
  } else if (name === Retailer.KAUFLAND) {
    return KauflandIcon;
  } else if (name === Retailer.KLAASKOCK) {
    return KlaasKockIcon;
  } else if (name === Retailer.REWE || name === Retailer.REWE_DORTMUND) {
    return ReweIcon;
  } else if (name === Retailer.REAL) {
    return RealIcon;
  } else if (name == Retailer.HIT_ULLRICH) {
    return HITUllrichIcon;
  }
});

function deleteIngredientFromList(deleteIngredient: IIngredient) {
    recipeCreationStore.recipe.ingredientList = recipeCreationStore.recipe.ingredientList.filter(
       (ingredient) => ingredient.id !== deleteIngredient.id
    );
  }
</script>

<template>
  <!-- TODO apply hover effect -->
  <div class="ingredient">
    <component :is="retailerLogo" />
    <div 
    @click="recipeCreationStore.selectedIngredient = props.ingredient"
    class="ingredient-content">
      <h4>{{ ingredient.title }}</h4>
      <div v-if="showCount">
        <p>Anzahl: {{ ingredient.count }}</p>
        <p>Preis: {{ ingredient.price }}</p>
        
      </div>
      <div v-if="show" class="details">
        <p>{{ ingredient.description }}</p>
        <p>Händler: {{ ingredient.nameOfRetailer }}</p>
        <p>Marke: {{ ingredient.nameOfBrand }}</p>
      </div>
    </div>
    <DeleteIcon 
    v-if="showDelete" class="delete-icon"
    @click="deleteIngredientFromList(ingredient)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";

.ingredient {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 12px;
 

  .retailer-icon {
    width: 45px;
    flex-shrink: 0;
  }

  h4 {
    margin: 0 0 4px 0;
  }

  p {
    color: rgba(108, 122, 137, 0.8);
    margin: 0;
  }

  .ingredient-content {
    margin-left: 12px;
    align-self: flex-start;
    cursor: pointer;
  }
  .delete-icon {
    position: relative;
    z-index: 10;
    height: 30px;
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>
