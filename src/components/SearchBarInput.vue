<script setup lang="ts">
import { useRecipeStore } from "@/stores/RecipeStore";
import type { Ref } from "vue";
import { ref } from "vue";
import FilterIcon from "@/components/icons/FilterIcon.vue";

const recipeStore = useRecipeStore();
const searchBar: Ref<string> = ref("");
const filterList: Ref<any[]> = ref([
  { filterName: "Alle Rezepte", urlValue: "all" },
  { filterName: "Angebotsrezepte", urlValue: "offer" },
  { filterName: "Maximal zwei Märkte besuchen", urlValue: "2" },
  { filterName: "Maximal drei Märkte besuchen", urlValue: "3" },
]);
</script>

<template>
  <div class="search-wrapper">
    <div class="content">
      <h1>Was soll es heute werden?</h1>
      <label for="searchbar" class="inner-searchbar-container">
        <div class="filter">
          <div class="filter-content">
            <FilterIcon />
            <p>Filter</p>
          </div>

          <div class="filter-list">
            <div
              v-for="(filter, index) in filterList"
              :key="index"
              @click="recipeStore.selectedFilter = filter.urlValue"
              class="filter-item"
            >
              {{ filter.filterName }}
            </div>
          </div>
        </div>
        <input
          v-model="searchBar"
          @input="recipeStore.sortRecipe(searchBar.trim())"
          type="text"
          id="searchbar"
          placeholder="Tippe hier um nach Rezepten zu suchen"
        />
      </label>
    </div>
  </div>
</template>

<style lang="scss">
.search-wrapper {
  z-index: 100;
  position: relative;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  padding: 6px;
  border-radius: 6px;
  background-color: #8cb983;

  h1 {
    text-align: center;
  }

  .content {
    .inner-searchbar-container {
      background-color: black;
      border-radius: 6px;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      .filter {
        position: relative;
        height: 50px;
        width: 100px;
        background-color: #8cb983;
        border-left: 2px solid #8e9189;
        border-top: 2px solid #8e9189;
        border-bottom: 2px solid #8e9189;
        border-radius: 5px 0 0 5px;
        cursor: pointer;

        .filter-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          svg {
            width: 20px;
            flex-shrink: 0;
          }
        }
      }

      .filter-list {
        position: absolute;
        top: 100%;
        width: 100%;
        opacity: 0;
        transition: opacity 0.1s ease-in;

        .filter-item {
          padding: 4px 8px;
          cursor: pointer;

          &:hover {
            background-color: #f0f0f0;
          }
        }
      }

      #searchbar {
        outline: none;
        height: 50px;
        width: 100%;
        max-width: 700px;
        border-radius: 0 5px 5px 0;
        border: none;
        border-right: 2px solid #8e9189;
        border-top: 2px solid #8e9189;
        border-bottom: 2px solid #8e9189;
        padding-left: 20px;
      }
    }
    .filter:hover {
      width: 200px;
    }

    .filter:hover .filter-list {
      background-color: #b1dba8;
      opacity: 1;
    }
  }
}
</style>
