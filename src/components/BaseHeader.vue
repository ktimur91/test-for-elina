<script setup>
// NPM
import { Button } from 'ant-design-vue'
import { useRouter } from 'vue-router'

// Local
import { useAuthStore } from '@/stores'

// Data:imports
const router = useRouter()
const authStore = useAuthStore()

// Methods
async function logoutHandler() {
  try {
    await authStore.CLEAR_DATA()
    router.push('/auth/sign-in')
  } catch (error) {
    console.log('Не удалось выйти: ', error)
  }
}
</script>

<template>
  <header class="base-header">
    <div class="container base-header__container">
      <div class="base-header__logo">
        <img src="@/assets/logo.svg" alt="" width="30" />
        Super CRM
      </div>

      <div class="base-header__user">
        <b>{{ authStore.profileGetter?.name || 'Без имени' }}</b>
        <Button @click="logoutHandler()">Выйти</Button>
      </div>
    </div>
  </header>
</template>

<style>
.base-header {
  display: grid;
  background-color: #fff;
  height: 60px;
  border-bottom: 1px #ddd solid;
}

.base-header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.base-header__user {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
