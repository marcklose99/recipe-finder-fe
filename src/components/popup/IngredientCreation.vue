<script setup lang="ts">
import { ref, computed, onMounted, onUpdated, watch } from "vue";
import router from "@/router";
import type { Ref } from "vue";
import axios from "axios";
import { debounce } from "lodash";
import type { IIngredient } from "@/data/IIngredient";
import Ingredient from "../Ingredient.vue";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import IngredientSelection from "@/components/popup/IngredientSelection.vue";
import IngredientCountCreation from "@/components/IngredientCountCreation.vue";
enum FilterList {
  "ALLE" = "Alle",
  "EDEKA" = "Nur Edeka",
  "KAUFLAND" = "Nur Kaufland",
  "REWE" = "Nur Rewe",
}

const recipeCreationStore = useRecipeCreationStore();
const searchResults: Ref<IIngredient[]> = ref([]);
const searchTerm: Ref<String> = ref("");
const activeFilter: Ref<string | undefined> = ref(FilterList.ALLE);
const mouseFocus: Ref<boolean> = ref(true);
const actionSetCount: Ref<boolean> = ref(false);

watch(activeFilter, () => {
  performSearch(searchTerm.value)
});


const performSearch = debounce((query) => {
  if (activeFilter.value === FilterList.ALLE) {
    axios.get(`http://localhost:8080/ingredients/${query}`)
      .then((response) => {
        searchResults.value = response.data
      }).catch((error) => {
        console.log(error);
      });
  } else {
    const key: string | undefined = Object.keys(FilterList).find(key => FilterList[key as keyof typeof FilterList] === activeFilter.value);
    axios.get(`http://localhost:8080/ingredients/${query}/${key}`)
      .then((response) => {
        searchResults.value = response.data
      }).catch((error) => {
        console.log(error);
      });;
  }
})

const showResults: Ref<boolean> = computed(() => {
  if (searchTerm.value != "" && mouseFocus.value) {
    performSearch(searchTerm.value);
    return true;
  }
  return false;

});
function selectIngredient(ingredient: IIngredient) {
  recipeCreationStore.selectedIngredient = ingredient;
}

function addIngredient(ingredient: IIngredient) {
  if (!recipeCreationStore.recipe.ingredientList.some((item) => item.id === ingredient.id)) {
    selectIngredient(ingredient);
    actionSetCount.value = true;
  }

}

function activateFilter(filter: FilterList) {
  activeFilter.value === filter ? activeFilter.value = FilterList.ALLE : activeFilter.value = filter;
}

function isActive(filter: FilterList) {
  return activeFilter.value === filter;
}


onUpdated(() => {
  if (recipeCreationStore.recipe.ingredientList.length != 0) {
    recipeCreationStore.setEnabled(true);
  }
})

onMounted(() => {
  recipeCreationStore.enabled ? recipeCreationStore.setEnabled(false) : router.push({ name: 'creation' });
})
</script>

<template>
  <div class="filter-actions">
    <div class="filter" v-for="filter in FilterList" :class="{ active: isActive(filter) }"
      @click="activateFilter(filter)">
      <p>{{ filter }}</p>
    </div>
  </div>
  <main>
    <IngredientCountCreation @close-popup="actionSetCount = !actionSetCount" v-if="actionSetCount" />

    <input @input="mouseFocus = true" class="standard-input" type="text" placeholder="Search for ingredients..."
      v-model="searchTerm">
    <div v-if="showResults" class="drop-down">
      <ul class="ingredient-list">
        <Ingredient class="ingredient-wrapper" v-for="ingredient in searchResults" :key="ingredient.id"
          :ingredient="ingredient" @click="addIngredient(ingredient)" />
      </ul>
    </div>
    <IngredientSelection @change-count=" actionSetCount = !actionSetCount"
      v-if="recipeCreationStore.recipe.ingredientList.length != 0" />
  </main>
</template>

<style lang="scss" scoped>
@import "src/assets/base.scss";



.filter-actions {
  display: grid;
  grid-template-columns: repeat(4, 0.5fr);
  gap: 10px;
  margin-bottom: 20px;

  .filter {
    height: 30px;
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.active {
      background-color: rgba(189, 195, 199, 1);
    }

    p {
      margin: 0;
    }
  }
}

main {
  height: fit-content;
  position: relative;

  .standard-input {
    margin-bottom: 10px;
  }

  .drop-down {
    max-height: 400px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin-bottom: 20px;



    &:-webkit-scrollbar {
      display: none;
    }

    .ingredient-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding: 0;
      margin: 0;
      animation: fade-in 1s ease-in-out;

      .ingredient-wrapper {
        padding: 10px;
        cursor: pointer;
        &:hover {
          border-radius: 5px;
          background-color: #F3F5F8;
          
        }
      }
    }
  }


}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
