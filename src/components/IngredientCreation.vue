<script setup lang="ts">
import { ref, computed, onMounted, onUpdated, watch } from "vue";
import type { Ref } from "vue";
import axios from "axios";
import { debounce } from "lodash";
import type { IIngredient } from "@/data/IIngredient";
import Ingredient from "@/components/Ingredient.vue";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
import IngredientCountCreation from "@/components/IngredientCountCreation.vue";
import IngredientSelection from "@/components/IngredientSelection.vue";

enum FilterList {
  "ALLE" = "Alle",
  "EDEKA" = "Nur Edeka",
  "KAUFLAND" = "Nur Kaufland",
  "REWE" = "Nur Rewe",
}

const recipeCreationStore = useRecipeCreationStore();
const searchResults: Ref<IIngredient[]> = ref([] as IIngredient[]);
const searchTerm: Ref<String> = ref("");
const activeFilter: Ref<string | undefined> = ref(FilterList.ALLE);
const mouseFocus: Ref<boolean> = ref(true);

watch(activeFilter, () => {
  performSearch(searchTerm.value);
});

const performSearch = debounce((query) => {
  if (activeFilter.value === FilterList.ALLE) {
    axios
      .get(`http://localhost:8080/ingredients/${query}`)
      .then((response) => {
        searchResults.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const key: string | undefined = Object.keys(FilterList).find(
      (key) => FilterList[key as keyof typeof FilterList] === activeFilter.value
    );
    axios
      .get(`http://localhost:8080/ingredients/${query}/${key}`)
      .then((response) => {
        searchResults.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

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
  if (
    !recipeCreationStore.recipe.ingredientList.some(
      (item) => item.id === ingredient.id
    )
  )
    selectIngredient(ingredient);
}

function activateFilter(filter: FilterList) {
  activeFilter.value === filter
    ? (activeFilter.value = FilterList.ALLE)
    : (activeFilter.value = filter);
}

function isActive(filter: FilterList) {
  return activeFilter.value === filter;
}

const isEmpty: Ref<boolean> = computed(() => {
  return searchResults.value.length === 0;
});
</script>

<template>
  <div class="ingredient-selection item">
    <div class="recipe-grid-filter">
      <div
        class="filter"
        v-for="filter in FilterList"
        :class="{ active: isActive(filter) }"
        @click="activateFilter(filter)"
      >
        <p>{{ filter }}</p>
      </div>
      <IngredientCountCreation v-if="recipeCreationStore.openCountContext" />
    </div>
    <div class="recipe-grid">
      <input
        @input="mouseFocus = true"
        type="text"
        placeholder="Search for ingredients..."
        v-model="searchTerm"
      />
      <div v-if="showResults" class="ingredient-list">
        <Ingredient
          v-for="ingredient in searchResults"
          :key="ingredient.id"
          :ingredient="ingredient"
          @click="addIngredient(ingredient)"
        />
        <p v-if="isEmpty">Leider gibt es keine passenden Ergebnisse!</p>
      </div>
      <IngredientSelection />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/base.scss";
@import "src/assets/scss/RecipeCreation.scss";
input, textarea {
  box-shadow: 0px 4px 10px 4px #999;
}
.ingredient-selection {
  max-height: 650px;
  
  .recipe-grid-filter {
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
        background-color: #494449;
      }

      p {
        margin: 0;
      }
    }
  }

  .recipe-grid {
    input {
      height: 45px;
      width: 100%;
      margin-bottom: 5px;
    }

    .ingredient-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      max-height: 400px;
      overflow-y: auto;
      padding: 0;
      margin: 0;
      animation: fade-in 1s ease-in-out;

      &:-webkit-scrollbar {
        display: none;
      }

      // .ingredient-wrapper {
      //   padding: 10px;
      //   cursor: pointer;
      //   &:hover {
      //     border-radius: 5px;
      //     background-color: #f3f5f8;
      //   }
      // }
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
