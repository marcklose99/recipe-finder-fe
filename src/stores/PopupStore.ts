import type { Ref } from "vue";
import { ref } from "vue";
import { defineStore } from "pinia";
import type { IRecipe } from "@/data/IRecipe";
import axios from "axios";
import type { IIngredient } from "@/data/IIngredient";

export const usePopupStore = defineStore("popupStore", () => {
  const isActive: Ref<Boolean> = ref(false);

  const oldRecipe: Ref<IRecipe> = ref({} as IRecipe);
  const recipe: Ref<IRecipe> = ref(oldRecipe);

  async function save() {
    const data = {
      id: recipe.value.id,
      title: recipe.value.title,
      ingredientList: recipe.value.ingredientList.map((ingredient) => ({
        id: ingredient.id,
      })),
    };
    const json = JSON.stringify(data);
    const res = await axios.post("http://localhost:8080/recipes", json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Submitted recipe!");
  }

  function addIngredientToRecipe(ingredient: IIngredient) {
    if (!recipe.value.ingredientList.some((item) => item.id === ingredient.id)) {
      recipe.value.ingredientList.push(ingredient);
  }

  }
  return { isActive, recipe, oldRecipe, save, addIngredientToRecipe };
});
