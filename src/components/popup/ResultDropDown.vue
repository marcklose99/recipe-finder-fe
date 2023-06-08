<template>
    <div class="drop-down">
        <ul>
            <li 
            @click="popupStore.addIngredientToRecipe(ingredient)"
            v-for="ingredient in results" 
            :key="ingredient.id"
            >{{ ingredient.title }}</li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import type {IIngredient} from "@/data/IIngredient"
import { usePopupStore } from "@/stores/PopupStore";

defineProps({
    results: {
        type: Array as () => IIngredient[],
        required: true
    }
});

const popupStore = usePopupStore();
</script>

<style lang="scss" scoped>
.drop-down {
    max-height: 200px;
    overflow: auto;
   
    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        li {
            margin: 5px;
        }
    }
}
</style>