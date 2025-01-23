<script setup>
// NPM
import { v4 } from 'uuid'
import { Space, Form, FormItem, Input, InputPassword, Button, Alert } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

// Local
import { authApi } from '@/api'
import { useAuthStore } from '@/stores'

// Data:imports
const router = useRouter()
const authStore = useAuthStore()

// Data:base
const isLoad = ref(false)
const errorMessages = ref([])
const formData = reactive({
  login: '',
  password: ''
})
const ruErrors = {
  wrongPassword: 'Не правильный пароль',
  notFound: 'Пользователь не найден'
}

// Methods
async function submitHandler() {
  errorMessages.value = []
  isLoad.value = true
  try {
    const res = await authApi.signIn({ ...formData })
    await authStore.SET_DATA({ t: v4(), p: res })
    router.push('/')
  } catch (error) {
    console.error('Не удалось войти: ', error)
    if (!errorMessages.value.includes(error)) errorMessages.value.push(error)
  }
  isLoad.value = false
}
</script>

<template>
  <Form :model="formData" class="box auth-layout__form" name="signIn" @submit="submitHandler()">
    <h1>Вход</h1>

    <Space direction="vertical" size="small" style="width: 100%">
      <template v-if="errorMessages?.length">
        <Alert
          v-for="key of errorMessages"
          :key="key"
          :message="ruErrors[key]"
          type="error"
          show-icon
        />
      </template>

      <FormItem name="login" :rules="[{ required: true, message: 'Заполните это поле' }]">
        <Input placeholder="Логин" size="large" :disabled="isLoad" v-model:value="formData.login" />
      </FormItem>

      <FormItem name="password" :rules="[{ required: true, message: 'Заполните это поле' }]">
        <InputPassword
          placeholder="Пароль"
          size="large"
          :disabled="isLoad"
          v-model:value="formData.password"
        />
      </FormItem>

      <Button type="primary" :loading="isLoad" htmlType="submit" size="large" block>Войти</Button>
    </Space>

    <Button type="link" @click="router.push('/auth/sign-up')">Регистрация</Button>
  </Form>
</template>
