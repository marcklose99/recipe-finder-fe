<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import axios from "axios";
import { debounce } from "lodash";
import type { IIngredient } from "@/data/IIngredient";
import { usePopupStore } from "@/stores/PopupStore";

const popupStore = usePopupStore();
const searchTerm: Ref<String> = ref("");
const searchResults: Ref<IIngredient[]> = ref([]);
const showResults: Ref<Boolean> = ref(false);
const selectedIngredients: Ref<IIngredient[]> = ref([]);

const performSearch = debounce(async (query) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/ingredients/${query}`
    );
    console.log(response.data);
    searchResults.value = response.data;
    showResults.value = true;
  } catch (error) {
    console.error(error);
  }
}, 500);

const handleSearchTermChange = () => {
  console.log(searchTerm.value);
  if (searchTerm.value === "") {
    showResults.value = false;
  } else {
    performSearch(searchTerm.value);
  }
};
</script>

<template>
  <input
    class="popup-input"
    type="text"
    placeholder="Search for ingredients..."
    v-model="searchTerm"
    @input="handleSearchTermChange"
  />
  <div v-if="showResults" class="popup">
    <ul class="popup-list">
      <li
        v-for="ingredient in searchResults"
        :key="ingredient.id"
        @click="popupStore.addIngredientToRecipe(ingredient)"
      >
        {{ ingredient.title }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/base.scss";

.popup {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: #fff;

  .popup-list {
    list-style: none;
    padding: 0;
    margin: 0;

    ul {
      list-style-type: none;
    }

    li {
      padding: 8px;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
