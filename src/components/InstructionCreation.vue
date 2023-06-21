<script setup lang="ts">
import type { IInstruction } from "@/data/IInstruction";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import type { PropType } from "vue";
import type {Ref} from "vue";
import { ref } from "vue";


const recipeCreationStore = useRecipeCreationStore()
const text: Ref<string> = ref("");

const props = defineProps({
  instructions: {
    type: Array as PropType<IInstruction[]>,
    default: [],
  },
});

function addInstruction() {
  const instructionStep: Ref<IInstruction> = ref({
    stepId: 0,
    text: text.value
  })
  recipeCreationStore.recipe.instructionList.push(instructionStep.value);
  console.log(instructionStep)
}
</script>

<template>
  <div class="instruction">
    <div class="instruction-content">
        <label for="instruction">
          <span>Instruction</span>
          <textarea id="instruction" type="text" placeholder="Instruction goes here..." v-model="text"
            @keyup.enter="addInstruction()"></textarea>
        </label>
      <div class="single-instruction" v-for="instruction in recipeCreationStore.recipe.instructionList">
        {{ instruction.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.instruction {
  height: auto;
  overflow: hidden;
  justify-content: space-around;

  .instruction-content {
    height: 100%;
    counter-reset: css-counter 0;
    display: flex;
    flex-direction: column;

    .single-instruction {
      padding: 20px;
      counter-increment: css-counter 1;
    }
    .single-instruction:before {
      content: counter(css-counter) ".";
      padding: 3px;
      border-radius: 50%;
      background-color: grey;
      margin-right: 10px;
    }
  }
}
</style>
