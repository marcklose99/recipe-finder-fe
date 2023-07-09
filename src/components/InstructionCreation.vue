<script setup lang="ts">
import type { IInstruction } from "@/data/IInstruction";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import type { Ref } from "vue";
import { ref } from "vue";
import InstructionSelection from "@/components/InstructionSelection.vue";

const recipeCreationStore = useRecipeCreationStore();

const counter: Ref<number> = ref(0);
const instructionText: Ref<string> = ref("");

function addInstruction() {
  counter.value = recipeCreationStore.recipe.instructionList.length + 1;
  const instructionStep: Ref<IInstruction> = ref({
    stepId: counter.value,
    text: instructionText.value,
  });
  recipeCreationStore.recipe.instructionList.push(instructionStep.value);
}
</script>

<template>
  <div class="instruction-create-wrapper item">
    <div class="instruction-create-content">
      <div class="instruction-create-input-wrapper">
        <h3>Instruction</h3>
        <p>Füge hier die Arbeitsschritte nacheinander ein.</p>
        <input
          v-model="instructionText"
          @keypress.enter="addInstruction()"
          id="instruction-input"
          type="text"
        />
      </div>
    </div>
    <div class="instruction-create-area-wrapper">
      <InstructionSelection
      :instructions="recipeCreationStore.recipe.instructionList"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/RecipeCreation.scss";
.instruction-create-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;

  .instruction-create-content {
    width: 50%;
    .instruction-create-input-wrapper {
     width: 100%;
    }
  }

  .instruction-create-area-wrapper {
    width: 50%;
    min-height: 70px;
    margin-top: 4px;
    padding: 6px;
    background-color: #8e9189;
    border-radius: 4px;
  }
}
</style>
