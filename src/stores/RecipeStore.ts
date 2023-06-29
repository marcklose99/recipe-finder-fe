import type { Ref } from "vue";
import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type { IRecipe } from "@/data/IRecipe";
import FetchService from "@/services/FetchService";

export const useRecipeStore = defineStore("recipeStore", () => {
  const allRecipes: Ref<IRecipe[]> = ref([]);
  const filteredRecipes: Ref<IRecipe[]> = ref([]);

  const selectedFilter: Ref<string> = ref("");

  watch(selectedFilter, async () => {
    allRecipes.value = await FetchService.fetchRecipe(selectedFilter.value);
    filteredRecipes.value = allRecipes.value;
  });

  function sortRecipe(searchVal: string): void {
    if (searchVal != "") {
      filteredRecipes.value = filteredRecipes.value.filter((val: IRecipe) =>
        val.title.toLowerCase().includes(searchVal.toLowerCase())
      );
    } else {
      filteredRecipes.value = allRecipes.value;
    }
  }
  return { selectedFilter, allRecipes, filteredRecipes, sortRecipe };
});
