<script setup lang="ts">
import { useRecipeCreationStore } from '@/stores/RecipeCreationStore';
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import Ingredient from "@/components/Ingredient.vue";
import { defineEmits } from 'vue';
import LeftArrow from "@/components/icons/LeftArrow.vue";

const emits = defineEmits(['closePopup']);

const recipeCreationStore = useRecipeCreationStore();
const selectedNumber: Ref<number> = ref(recipeCreationStore.selectedIngredient.count);
const invalidInput: Ref<boolean> = ref(false);

watch(selectedNumber, () => {
    selectedNumber.value === 0 ? invalidInput.value = true : invalidInput.value = false;
});

function close() {
    if (invalidInput.value === false && selectedNumber.value > 0) {
        recipeCreationStore.selectedIngredient.count = selectedNumber.value;
        recipeCreationStore.addIngredientToRecipe(recipeCreationStore.selectedIngredient);
        emits('closePopup', false);
    } else {
        invalidInput.value = true
    }
}
</script>
<template>
    <div class="popup-wrapper">
        <div class="popup">

            <div class="popup-content">
                <div class="header">
                    <LeftArrow @click="emits('closePopup', false)" />
                    <h4>Wählen Sie die Anzahl, wie oft die Zutat in Ihrem Rezept benötigt wird.</h4>

                </div>

                <Ingredient class="underline" :ingredient="recipeCreationStore.selectedIngredient" />
                <div class="actions">
                    <input v-model="selectedNumber" class="item large" type="number" :class="{ error: invalidInput }">
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
        background-color: #DDE0E7;
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