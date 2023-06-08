<script setup lang="ts">
import {useRecipeStore} from "@/stores/RecipeStore";
import type {Ref} from "vue";
import {ref} from "vue";

const recipeStore = useRecipeStore();
const searchBar: Ref<string> = ref("");
</script>

<template>
  <label for="searchbar" class="searchbar">
    <input  
    v-model="searchBar" 
    @input="recipeStore.sortRecipe(searchBar.trim())" 
    type="text" 
    id="searchbar" 
    placeholder="Search for recipes..."/>
  </label>
</template>

<style lang="scss">
.searchbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #searchbar {
    z-index: 10;
    position: relative;
    height: 50px;
    width: 100%;
    max-width: 700px;
    border-radius: 5px;
    border: none;
    outline: 2px solid #cecece;
    padding-left: 20px;
  }

}

</style>