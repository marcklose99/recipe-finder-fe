import type {Ref} from 'vue'
import {ref, watch} from 'vue'
import {defineStore} from 'pinia'
import type {IRecipe} from "@/data/IRecipe";
import { usePopupStore } from './PopupStore';

export const useRecipeStore = defineStore('recipeStore', () => {
  const popupStore = usePopupStore();
  const allRecipes: Ref<IRecipe[]> = ref([]);
  const filteredRecipes: Ref<IRecipe[]> = ref([]);

  // set counter to zero if a new recipe was added
  watch(allRecipes, () => {
    popupStore.counter = 0;
  });
  
  function sortRecipe(searchVal: string): void {
    
    if(searchVal != "") {
      filteredRecipes.value =  filteredRecipes.value.filter((val: IRecipe) => val.title.toLowerCase().includes(searchVal.toLowerCase()));

    } else {
      filteredRecipes.value = allRecipes.value;
    }
  }
  return { allRecipes, filteredRecipes, sortRecipe }
})
