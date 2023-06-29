<script setup lang="ts">
import LinkHeader from "@/components/LinkHeader.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
</script>

<template>
  <header>
    <LogoIcon />

    <LinkHeader />
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";
header {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  align-items: center;
}
</style>
