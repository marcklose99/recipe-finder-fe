import type { IRecipe } from "./IRecipe"

export interface IIngredient {
    id: number
    title: string
    price: number
    nameOfRetailer: string
    nameOfBrand: string
    validTo: Date
    validFrom: Date
    isValid: boolean
    description: string
    count: number;
}
