<script setup lang="ts">
import RecipeHeader from "@/components/RecipeHeader.vue";
import IngredientCreation from "@/components/IngredientCreation.vue";
import InstructionCreation from "@/components/InstructionCreation.vue";
import RecipeFooter from "@/components/RecipeFooter.vue";
</script>

<template>
    <RecipeHeader />
    <IngredientCreation />
    <InstructionCreation />
    <RecipeFooter />
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";
</style>
