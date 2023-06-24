<script setup lang="ts"></script>

<template>
  <nav class="link-header">
    <router-link class="link" to="/">Home</router-link>

    <!-- <router-link class="link" to="/rezepte">Rezepte</router-link> -->

    <router-link class="link" to="/create">Rezept hinzufügen</router-link>
  </nav>
</template>

<style lang="scss" scoped>
.link-header {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  .link {
    text-align: center;
    font-size: 21px;
    line-height: 27px;
    color: var(--nav-link);
    font-weight: 400;
    &:link {
      text-decoration: none;
    }
  }
}
</style>
