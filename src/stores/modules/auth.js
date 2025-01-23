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
  async function SIGN_IN(payload) {
    let result = null
    try {
      console.log('SIGN IN', payload)

      // const { data } = await authApi.signIn(payload)
      // token.value = data?.token || ''
      localStorage.setItem('tim_token', token.value)
      await GET_PROFILE()
    } catch (error) {
      localStorage.removeItem('tim_token')
      result = error.response.data.message
    }
    return result
  }
  async function GET_PROFILE() {
    try {
      console.log('GET PROFILE')

      // const { data } = await authApi.getProfile()
      // localStorage.setItem('tim_profile', JSON.stringify(data.user))
      // profile.value = data.user
    } catch (error) {
      console.log('Не удалось получить текущий профиль', error)
      localStorage.removeItem('tim_profile')
    }
  }
  function LOGOUT() {
    return new Promise((resolve) => {
      profile.value = null
      token.value = ''
      localStorage.clear()
      resolve()
    })
  }
  function FORGOT_PASSWORD(payload) {
    console.log('FORGOT', payload)

    // return authApi.forgotPassword(payload)
  }

  return {
    tokenGetter,
    profileGetter,
    SIGN_IN,
    GET_PROFILE,
    LOGOUT,
    FORGOT_PASSWORD
  }
})
