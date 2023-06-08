import type {Ref} from 'vue'
import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {IRecipe} from "@/data/IRecipe";

export const useRecipeStore = defineStore('recipeStore', () => {
  const allRecipes: Ref<IRecipe[]> = ref([]);
  const filteredRecipes: Ref<IRecipe[]> = ref([]);

  function sortRecipe(searchVal: string): void {
    
    if(searchVal != "") {
      filteredRecipes.value =  filteredRecipes.value.filter((val: IRecipe) => val.title.toLowerCase().includes(searchVal.toLowerCase()));

    } else {
      filteredRecipes.value = allRecipes.value;
    }
  }
  return { allRecipes, filteredRecipes, sortRecipe }
})
