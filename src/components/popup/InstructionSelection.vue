<script setup lang="ts">
import type { IInstruction } from "@/data/IInstruction";
import { usePopupStore } from "@/stores/PopupStore";
import type { PropType } from "vue";


const popupStore = usePopupStore()
const props = defineProps({
  instructions: {
    type: Array as PropType<IInstruction[]>,
    default: [],
  },
});
</script>

<template>
  <div class="instruction">
    <div class="instruction-content">
      <div class="single-instruction" v-for="instruction in popupStore.recipe.instructionList">
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
      padding: 10px;
      border-radius: 50%;
      background-color: grey;
      margin-right: 10px;
    }
  }
}
</style>
