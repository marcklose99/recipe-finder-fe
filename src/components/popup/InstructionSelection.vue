<script setup lang="ts">
import type { IInstruction } from "@/data/IInstruction";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";

const recipeCreationStore = useRecipeCreationStore();
/**
 *
 *
 * @param instructionToRemove
 */
function popInstruction(instructionToRemove: IInstruction) {
  const instructionList: IInstruction[] =
    recipeCreationStore.recipe.instructionList;
  const updatedInstructionList = updateInstructionList(
    instructionList,
    instructionToRemove
  );
  recipeCreationStore.recipe.instructionList = updatedInstructionList;
}

/**
 * Find all instructions where the stepId doesn't equal
 * and update the step ids from containing instructions.
 *
 * @param instructionList
 * @param instructionToRemove
 */
function updateInstructionList(
  instructionList: IInstruction[],
  instructionToRemove: IInstruction
) {
  const updatedInstructionList: IInstruction[] = instructionList.filter(
    (instruction) => instruction.stepId != instructionToRemove.stepId
  );
  updateStepIds(updatedInstructionList);
  return updatedInstructionList;
}

/**
 * Updates the stepId property for every object in instructionList
 *
 * @param updatedInstructionList
 */
function updateStepIds(updatedInstructionList: IInstruction[]) {
  for (let index = 0; index < updatedInstructionList.length; index++) {
    updatedInstructionList[index].stepId =
      updatedInstructionList.indexOf(updatedInstructionList[index]) + 1;
  }
}
</script>

<template>
  <div id="instructions">
    <div
      class="instruction"
      v-for="instruction in recipeCreationStore.recipe.instructionList"
    >
      <p class="instruction-step-id">
        {{ `${instruction.stepId}.` }}
      </p>
      <p class="instruction-text">
        {{ instruction.text }}
      </p>
      <button @click="popInstruction(instruction)" class="delete">
        Delete
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#instructions {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .instruction {
    display: flex;
    align-items: center;
    gap: 10px;
    .instruction-step-id {
      margin: 16px 0;
    }
    .instruction-text {
      width: 100%;
    }

    .delete {
      width: 80px;
      border: none;
      height: 35px;
    }
  }
}
</style>
