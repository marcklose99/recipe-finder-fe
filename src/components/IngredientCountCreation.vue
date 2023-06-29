<script setup lang="ts">
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import { ref, watch, computed, onMounted } from "vue";
import type { Ref } from "vue";
import Ingredient from "@/components/Ingredient.vue";
import LeftArrow from "@/components/icons/LeftArrow.vue";
import type { IIngredient } from "@/data/IIngredient";

const recipeCreationStore = useRecipeCreationStore();
const defaultNum: Ref<number> = computed(() => {
  if (recipeCreationStore.selectedIngredient) {
    return recipeCreationStore.selectedIngredient.count;
  } else {
    return 0;
  }
});
const userInputNumber: Ref<number> = ref(defaultNum.value);
const invalidInput: Ref<boolean> = ref(false);

watch(userInputNumber, () => {
  userInputNumber.value === 0
    ? (invalidInput.value = true)
    : (invalidInput.value = false);
});

function close() {
  if (
    userInputNumber.value > 0 &&
    recipeCreationStore.selectedIngredient != null
  ) {
    recipeCreationStore.selectedIngredient.count = userInputNumber.value;
    recipeCreationStore.addIngredientToRecipe(
      recipeCreationStore.selectedIngredient
    );
    recipeCreationStore.selectedIngredient = null;
  } else {
    invalidInput.value = true;
  }
}

function removeSelection() {
  recipeCreationStore.selectedIngredient = null;
}

const ingredient: Ref<IIngredient> = computed(() => {
  return recipeCreationStore.selectedIngredient != null
    ? recipeCreationStore.selectedIngredient
    : ({} as IIngredient);
});
</script>
<template>
  <div class="popup-wrapper">
    <div class="popup">
      <div class="popup-content">
        <div class="header">
          <LeftArrow @click="removeSelection()" />
          <h4>
            Wählen Sie die Anzahl, wie oft die Zutat in Ihrem Rezept benötigt
            wird.
          </h4>
        </div>
        <Ingredient
          class="underline"
          :show-delete="false"
          :ingredient="ingredient"
        />
        <div class="actions">
          <input
            v-model="userInputNumber"
            class="item large"
            type="number"
            :class="{ error: invalidInput }"
          />
          <button @click="close()" class="item small">Fertig</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup-wrapper {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .popup {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #dde0e7;
    padding: 12px;
    width: 40%;

    .popup-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .header {
        display: flex;
        justify-content: center;
        svg {
          height: 35px;
          width: 35px;
          cursor: pointer;
          position: relative;
          left: -7%;
        }

        h4 {
          width: 60%;
          margin: 0 0 14px 0;
        }
      }

      .actions {
        margin-top: 20px;
        width: 60%;
        display: flex;
        justify-content: center;
        gap: 5px;

        .item {
          cursor: pointer;
          border: none;
          padding: 8px;
          border-radius: 12px;

          &.large {
            flex-grow: 2;
            text-align: center;
          }

          &.small {
            flex-grow: 1;
          }

          &.error {
            border: 1px solid red;
          }
        }
      }

      .underline {
        background-color: rgba(189, 195, 199, 0.6);
        border-radius: 5px;
        width: 60%;
      }
    }
  }
}
</style>
