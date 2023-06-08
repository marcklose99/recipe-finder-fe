<script setup lang="ts">
import { usePopupStore } from "@/stores/PopupStore";
import DescriptionSelection from "@/components/popup/DescriptionSelection.vue";
import SelectionArea from "@/components/popup/SelectionArea.vue";
import IngredientSelection from "@/components/popup/IngredientSelection.vue";
import axios from "axios";
import type { IIngredient } from "@/data/IIngredient";
import type { Ref } from "vue";
import { ref } from "vue";
import PopupFooter from "@/components/popup/PopupFooter.vue";
import { debounce } from "lodash";
import RecipeForm from "@/components/popup/RecipeForm.vue";

const popupStore = usePopupStore();

const searchTerm: Ref<String> = ref("");
const searchResults: Ref<IIngredient[]> = ref([]);
const showResults: Ref<Boolean> = ref(false);

const performSearch = debounce(async (query) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/ingredients/${query}`
    );
    searchResults.value = response.data;
    showResults.value = true;
  } catch (error) {
    console.error(error);
  }
}, 500);

const handleSearchTermChange = () => {
  if (searchTerm.value.length > 1) {
    performSearch(searchTerm.value);
  } else {
    showResults.value = false;
  }
};

function clearDataFields() {}
</script>
<template>
  <div class="popup">
    <div class="inner-popup">
      <h2>Create Or Update A Recipe</h2>
      <RecipeForm />
      <PopupFooter @clear-data-fields="clearDataFields" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 45px 15px;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.5);

  .inner-popup {
    min-height: 800px;
    transition: max-height 0.3s;
    background-color: #fff;
    padding: 60px;
    border-radius: 8px;
    width: 1200px;
    height: fit-content;
    box-shadow: 0px 0.9px 2.2px rgba(0, 0, 0, 0.02),
      0px 2.2px 5.3px rgba(0, 0, 0, 0.028), 0px 4.1px 10px rgba(0, 0, 0, 0.035),
      0px 7.4px 17.9px rgba(0, 0, 0, 0.042),
      0px 13.8px 33.4px rgba(0, 0, 0, 0.05), 0px 33px 80px rgba(0, 0, 0, 0.07);
  }
}
</style>
