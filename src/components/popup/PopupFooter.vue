<script setup lang="ts">
import { usePopupStore } from '@/stores/PopupStore';

const popupStore = usePopupStore();

async function submitRecipe() {
  popupStore.oldRecipe = popupStore.recipe;
}
function cancel() {
popupStore.recipe = popupStore.oldRecipe;
popupStore.isActive = !popupStore.isActive;
}
</script>
<template>
    <div class="actions">
        <button @click="$emit('clearDataFields')">Delete</button>
        <button @click="cancel()">Cancel</button>
        <button @click="submitRecipe()" type="submit">Save Recipe</button>
      </div>
</template>
<style lang="scss" scoped>
.actions {
        display: flex;
        justify-content: start;

        button {
          align-items: center;
          border-radius: 8px;
          box-sizing: border-box;
          cursor: pointer;
          font-size: 1rem;
          justify-content: center;
          line-height: 1.5rem;
          padding: 8px;
          transition: .2s;
          border: 1px solid;
        }

        button:hover {
          background: #fff;
        }
      }

      button:nth-child(1) {
        margin-right: auto;
      }
</style>