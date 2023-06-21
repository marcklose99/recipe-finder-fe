<script setup lang="ts">

import type { IIngredient } from "@/data/IIngredient";
import type { Ref } from "vue";
import { computed } from "vue";
import { Retailer } from "@/data/Retailer";
import EdekaIcon from "./icons/EdekaIcon.vue";
import KauflandIcon from "./icons/KauflandIcon.vue";
import KlaasKockIcon from "./icons/KlaasKockIcon.vue";
import RealIcon from "./icons/RealIcon.vue";
import ReweIcon from "./icons/ReweIcon.vue";
import HITUllrichIcon from "./icons/HITUllrichIcon.vue";


const props = defineProps({
  ingredient: {
    type: Object as () => IIngredient,
    required: true
  },
  show: {
    type: Boolean,
    default: true
  },
  showCount: {
    type: Boolean,
    required: false
  },
  hover: {
    type: Boolean,
    default: true
  },
})

const retailerLogo = computed(() => {
  const name = props.ingredient.nameOfRetailer.toLocaleUpperCase();
  if (name.includes(Retailer.EDEKA) || name.includes(Retailer.E_CENTER)) {

    return EdekaIcon;
  } else if (name === Retailer.KAUFLAND) {
    return KauflandIcon;
  }
  else if (name === Retailer.KLAASKOCK) {
    return KlaasKockIcon;
  }
  else if (name === Retailer.REWE || name === Retailer.REWE_DORTMUND) {
    return ReweIcon;
  }
  else if (name === Retailer.REAL) {
    return RealIcon;
  } else if (name == Retailer.HIT_ULLRICH) {
    return HITUllrichIcon
  }
});
</script>

<template>
  <!-- TODO apply hover effect -->
  <div class="ingredient">
    <component :is="retailerLogo" />
    <div class="ingredient-content">

      <h4>{{ ingredient.title }}</h4>
      <p @click="" v-if="showCount"> Anzahl: {{ ingredient.count }}</p>

      <div v-if="show" class="details">
        <p>{{ ingredient.description }}</p>
        <p>Händler: {{ ingredient.nameOfRetailer }}</p>
        <p>Marke: {{ ingredient.nameOfBrand }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/base.scss';

.ingredient {
  display: flex;
  align-items: center;
  padding: 12px;

  .retailer-icon {
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
  }

}
</style>