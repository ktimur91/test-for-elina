// NPM
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

// Local
// import { authApi } from '@/api'

// Store
export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('tim_token') || '')
  const profile = ref(
    localStorage.getItem('tim_profile') ? JSON.parse(localStorage.getItem('tim_profile')) : null
  )

  // Getters
  const tokenGetter = computed(() => token.value)
  const profileGetter = computed(() => profile.value)

  // Actions
  async function SET_DATA({ t, p }) {
    token.value = t
    profile.value = p
    localStorage.setItem('tim_token', t)
    localStorage.setItem('tim_profile', JSON.stringify(p))
  }
  async function CLEAR_DATA() {
    token.value = ''
    profile.value = null
    localStorage.clear()
  }

  return {
    tokenGetter,
    profileGetter,
    SET_DATA,
    CLEAR_DATA
  }
})
