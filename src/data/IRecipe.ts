import type {IIngredient} from "@/data/IIngredient";

export interface IRecipe {
    id: number
    title: string
    ingredientList: IIngredient[]
}