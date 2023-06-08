<script setup lang="ts">
import {ref } from 'vue';
import type {Ref} from 'vue';

const descriptions: Ref<String[]> = ref([]);
const text: Ref<String> = ref(""); 
function addDescription() {
descriptions.value.push(text.value);
}
</script>

<template>
  <label>Description</label>
  <div class="description">
    <input v-model="text" v-on:keyup.enter="addDescription()" class="popup-input" type="text" placeholder="Description goes here...">
    <div class="description-content">
      <div class="single-description"
      v-for="description in descriptions">
    {{ description }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
    height: auto;
    overflow: hidden;
    justify-content: space-around;

input {
    background: #f2f2f2;
    padding: 12px;
    border-radius: 3px;
    width: 100%;
    font-size: 14px;
  }
  .description-content {
    height: 100%;
    counter-reset: css-counter 0;
    display: flex;
    flex-direction: column;

    .single-description {
      padding: 20px;
      counter-increment: css-counter 1;
    }
    .single-description:before {
        content: counter(css-counter) ".";
        padding: 10px;
        border-radius: 50%;
        background-color: grey;
        margin-right: 10px;

    }
  }
}
</style>