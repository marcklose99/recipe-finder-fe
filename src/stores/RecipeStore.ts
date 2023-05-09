import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type {IRecipe} from "@/data/IRecipe";
import recipedata from "@/data/recipedata.json";

export const useRecipeStore = defineStore('recipeStore', () => {
  const allRecipes: Ref<IRecipe[]> = ref(recipedata.recipes);
  const filteredRecipes: Ref<IRecipe[]> = ref(allRecipes.value);

  function sortRecipe(searchVal: string): void {
    filteredRecipes.value = allRecipes.value;
    if(searchVal !== "") {
      filteredRecipes.value =  filteredRecipes.value.filter((val: IRecipe) => val.title.toLowerCase().includes(searchVal.toLowerCase()));
    }
    console.log(filteredRecipes.value)
  }
  return { filteredRecipes, sortRecipe }
})
