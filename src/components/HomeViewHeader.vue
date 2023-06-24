<script setup lang="ts">
import SearchBarInput from "@/components/SearchBarInput.vue";
</script>

<template>
  <header>
    <SearchBarInput />
  </header>
</template>

<style lang="scss" scoped>
header {
  position: relative;
  width: 100%;
  height: 40vh;
  background-image: url("@/assets/images/bc.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 85%;


}
</style>
