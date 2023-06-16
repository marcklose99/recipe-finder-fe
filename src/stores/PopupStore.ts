import type { Ref } from "vue";
import { ref } from "vue";
import { defineStore } from "pinia";
import type { IRecipe } from "@/data/IRecipe";
import axios from "axios";
import type { IIngredient } from "@/data/IIngredient";

export const usePopupStore = defineStore("popupStore", () => {

  const counter: Ref<number> = ref(0);
  const isActive: Ref<boolean> = ref(false);
  const file: File = {
    lastModified: 0,
    name: "",
    webkitRelativePath: "",
    size: 0,
    type: "",
    arrayBuffer: function (): Promise<ArrayBuffer> {
      throw new Error("Function not implemented.");
    },
    slice: function (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob {
      throw new Error("Function not implemented.");
    },
    stream: function (): ReadableStream<Uint8Array> {
      throw new Error("Function not implemented.");
    },
    text: function (): Promise<string> {
      throw new Error("Function not implemented.");
    }
  };
  const recipe: Ref<IRecipe> = ref({
    id: null,
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
      id: null,
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
    file,
    addIngredientToRecipe,
    loadRecipe,
    closeRecipe,
  };
});
