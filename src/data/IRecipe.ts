import type { IIngredient } from "@/data/IIngredient";
import type { IInstruction } from "./IInstruction";

export interface IRecipe {
  id: number | null;
  title: string;
  ingredientList: IIngredient[];
  instructionList: IInstruction[];
}
