import type { Ref } from "vue";
import { ref } from "vue";
import { defineStore } from "pinia";
import type { IRecipe } from "@/data/IRecipe";
import axios from "axios";
import type { IIngredient } from "@/data/IIngredient";

export const usePopupStore = defineStore("popupStore", () => {

  const counter: Ref<number> = ref(0);
  const isActive: Ref<boolean> = ref(false);
  
  const recipe: Ref<IRecipe> = ref({
    id: 0,
    title: "",
    ingredientList: [],
    instructionList: [],
    imageName: ""
  });

  function loadRecipe(oldRecipe: IRecipe) {
    recipe.value = oldRecipe;
    isActive.value = !isActive.value;
  }

  function closeRecipe() {
    counter.value = 0;
    recipe.value = {
      id: 0,
      title: "",
      ingredientList: [],
      instructionList: [],
      imageName: "",
    };
    isActive.value = !isActive.value;
  }

  function addIngredientToRecipe(ingredient: IIngredient) {
    if (
      !recipe.value.ingredientList.some((item) => item.id === ingredient.id)
    ) {
      recipe.value.ingredientList.push(ingredient);
    }
  }
  return {
    isActive,
    recipe,
    counter,
    addIngredientToRecipe,
    loadRecipe,
    closeRecipe,
  };
});
