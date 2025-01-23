<script setup>
// NPM
import { useRouter } from 'vue-router'

// Local
import { useAuthStore } from '@/stores'

// Data:imports
const router = useRouter()
const authStore = useAuthStore()

// Created
init()

// Methods
function init() {
  if (authStore.tokenGetter) router.push('orders')
  else router.push('/auth/sign-in')
}
</script>

<template>
  <div>
    <h1>Redirect...</h1>
  </div>
</template>
