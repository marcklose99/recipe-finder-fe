export interface IIngredient {
    id: number
    title: string
    price: number
    nameOfRetailer: string
    nameOfBrand: string
    validTo: Date
    validFrom: Date
    isValid: boolean
    description: string[]
}
