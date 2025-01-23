<script setup>
// NPM
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="auth-layout">
    <RouterView />
  </main>
</template>

<style>
.auth-layout {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-layout__form {
  width: 450px;
}
</style>
