import type { IIngredient } from "./IIngredient"
import type { IRecipe } from "./IRecipe"

export interface IRecipeIngredient {
    id: {
        recipe: {
            id: number | null,
        },
        ingredient: IIngredient
    },
    count: number
}