import type {IIngredient} from "@/data/IIngredient";

export interface IRecipe {
    id: number | null
    title: string
    ingredientList: IIngredient[]
}