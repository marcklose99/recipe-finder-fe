<script setup lang="ts">
import type {PropType} from 'vue';

defineProps({
  descriptions: {
    type: Array as PropType<string[]>,
    default: []
  }
})
</script>

<template>
  <div class="description">
    <div class="description-content">
      <div
          class="single-description"
          v-for="description in descriptions"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  height: auto;
  overflow: hidden;
  justify-content: space-around;

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