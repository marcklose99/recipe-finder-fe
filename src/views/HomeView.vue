<script setup lang="ts">
import MainHeader from "@/components/MainHeader.vue";
</script>

<template>
  <div class="container">
    <MainHeader />
    <main>
      <div class="content-wrapper">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
.container {
  width: 1300px;
  // background-color: var(--main-section);
  margin: 0 auto;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 80px;
    width: 100%;
  }
}
</style>
