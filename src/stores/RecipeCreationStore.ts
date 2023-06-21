import type { Ref } from 'vue'
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { IRecipe } from '@/data/IRecipe'
import type { IIngredient } from '@/data/IIngredient'

export const useRecipeCreationStore = defineStore('recipeCreationStore', () => {

    const recipe: Ref<IRecipe> = ref({
        id: 0,
        title: "",
        ingredientList: [],
        instructionList: [],
        imageName: "",
    })

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

    const selectedIngredient: Ref<IIngredient> = ref({} as IIngredient);

    watch(() => recipe.value.title,
        () => {
            if (recipe.value.title.length > 1) {
                setEnabled(true);
            } else {
                setEnabled(false);
            }
        })

    function addIngredientToRecipe(ingredient: IIngredient) {
        if (
            !recipe.value.ingredientList.some((item) => item.id === ingredient.id)
        ) {
            recipe.value.ingredientList.push(ingredient);
        }
    }
    const enabled: Ref<boolean> = ref(false);

    const ingredientSelectionCompleted: Ref<boolean> = ref(false);
    function setEnabled(value: boolean) {
        enabled.value = value;
    }
    return { recipe, enabled, file, ingredientSelectionCompleted, selectedIngredient, setEnabled, addIngredientToRecipe }
})
