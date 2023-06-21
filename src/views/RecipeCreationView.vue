<script setup lang="ts">
import router from "@/router";
import { computed, ref } from "vue";
import type { Ref } from "vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import IngredientSelection from "@/components/popup/IngredientSelection.vue";

const recipeCreationStore = useRecipeCreationStore();
const show = ref(false);
const counter: Ref<number> = ref(0);
const views = [
    {
        name: "ingredient-creation"
    },
    {
        name: "instruction-creation"
    }
]


function next() {
    if (recipeCreationStore.recipe.ingredientList.length != 0) {
        recipeCreationStore.ingredientSelectionCompleted = true;
    }
    if (recipeCreationStore.enabled) {
        console.log("Hello")
        show.value = true;
        router.push({
            name: views[counter.value].name,
            replace: true
        });
        counter.value++;
    } else {
        // bind class with error msg
    }
}
function showContext() {
    recipeCreationStore.ingredientSelectionCompleted = false;
    router.push({ name: 'ingredient-creation' })
}
</script>
<template>
    <main>
        <div class="content-wrapper">
            <div class="content">
                <h2>Erstellen Sie ihr Rezept!</h2>
                <div class="description">
                    <label for="recipeName">
                        <span>Name vom Rezept</span>
                        <input class="standard-input" v-model="recipeCreationStore.recipe.title" id="recipeName" />
                    </label>
                </div>
                <div class="selected-ingredients" v-if="recipeCreationStore.ingredientSelectionCompleted">
                    <IngredientSelection @click="showContext()" />
                </div>
                <section v-if="show" class="active-section">
                    <RouterView />
                </section>
                <ArrowDown class="next-btn" :class="{ jump: recipeCreationStore.enabled }" @click="next()" />
            </div>
        </div>
    </main>
</template>
<style lang="scss">
@import "@/assets/base.scss";

main {
    .content-wrapper {
        min-height: 100vh;
        width: 70%;
        margin: 0 auto;
        background-color: #F3F5F8;

        .content {
            width: 80%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;

            h2 {
                margin-bottom: 30px;
            }

            .next-btn {
                margin-top: 30px;
                align-self: center;
                width: 50px;
                height: 50px;
                cursor: pointer;
            }

            .active-section {
                padding: 10px;
                min-height: 200px;
                height: fit-content;
                background-color: #DDE0E7;
            }
        }

        .jump {
            animation: jump 3s infinite ease-in;
        }

        @keyframes jump {
            0% {
                transform: translate(0, 0)
            }

            10% {
                transform: translate(0, 2px)
            }

            30% {
                transform: translate(0, 4px)
            }

            90% {
                transform: translate(0, 2px);
            }
        }
    }
}
</style>