<script setup lang="ts"></script>

<template>
  <nav class="link-header">
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/create">Rezept hinzufügen</router-link>
  </nav>
</template>

<style lang="scss" scoped>
.link-header {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  column-gap: 10px;
  .link {
    text-align: center;
    font-size: 21px;
    line-height: 27px;
    color: var(--nav-link);
    font-weight: 400;
    text-decoration: none;

    &:hover {
      transform: translateY(-5px);
      animation: transform 4s ease-in-out;
      color: #494449;;
    }
  }
}
</style>
