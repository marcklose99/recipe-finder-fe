<script setup lang="ts">

import type {IIngredient} from "@/data/IIngredient";
import  type {Ref} from "vue";
import {computed} from "vue";

const props = defineProps({
  ingredient: {
    type: Object as () => IIngredient,
    required: true
  }
})

const details: Ref<String> = computed((): string => {
    return `Marke: ${props.ingredient.nameOfBrand} Händler: ${props.ingredient.nameOfRetailer} `
}); 
</script>

<template>
  <div class="card">
    <h4>{{ ingredient.title }}</h4>
    <div class="details">
      <span>{{ details }}</span>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/Card.scss';
</style>