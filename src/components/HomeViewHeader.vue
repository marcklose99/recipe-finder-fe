<script setup lang="ts">
import SearchBarInput from "@/components/SearchBarInput.vue"
</script>

<template>
  <header>
    <div class="container searchbar">
        <h1>Find the cheapest recipes</h1>
        <SearchBarInput/>
    </div>
  </header>
</template>

<style lang="scss">
header {
  position: relative;
  width: 100%;
  height: 40vh;
  background-image: url("@/assets/images/bc.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 85%                  ;

  .container.searchbar {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    height: 150px;
    background-color: #fff;
    box-shadow:
        0px 0.9px 2.2px rgba(0, 0, 0, 0.02),
        0px 2.2px 5.3px rgba(0, 0, 0, 0.028),
        0px 4.1px 10px rgba(0, 0, 0, 0.035),
        0px 7.4px 17.9px rgba(0, 0, 0, 0.042),
        0px 13.8px 33.4px rgba(0, 0, 0, 0.05),
        0px 33px 80px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
  }

  h1 {
    z-index: 10;
    margin: 20px 0 0;
  }

  .container.searchbar:before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    background-color: rgba(247, 215, 148, 0.6);
    z-index: 1;
    border-radius: 6px;
  }
}
</style>