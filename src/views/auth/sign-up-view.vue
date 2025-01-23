<script setup>
// NPM
import { Space, Form, FormItem, Input, InputPassword, Button, Alert } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

// Local
import { authApi } from '@/api'

// Data:imports
const router = useRouter()

// Data:base
const isLoad = ref(false)
const isError = ref(false)
const isGood = ref(false)
const formData = reactive({
  name: '',
  login: '',
  password: ''
})

// Methods
async function submitHandler() {
  isError.value = false
  isLoad.value = true
  try {
    await authApi.signUp({ ...formData })
    isGood.value = true
  } catch (error) {
    console.log('Не удалось зарегистрировать: ', error)
    isError.value = true
  }
  isLoad.value = false
}
</script>

<template>
  <Form :model="formData" class="box auth-layout__form" @submit="submitHandler()">
    <h1>Регистрация</h1>

    <Space direction="vertical" size="small" style="width: 100%">
      <Alert
        v-if="isError"
        message="Пользователь с таким логином уже существует!"
        type="error"
        show-icon
      />
      <Alert
        v-if="isGood"
        message="Аааатлична!"
        description="Вы успешно зарегистрированы, теперь можно войти в систему под логином и паролем что вы указали при регистрации!"
        type="success"
        show-icon
      />

      <template v-if="!isGood">
        <FormItem name="name" :rules="[{ required: true, message: 'Заполните это поле' }]">
          <Input
            placeholder="Имя"
            size="large"
            :disabled="isLoad"
            autocomplete="off"
            v-model:value="formData.name"
          />
        </FormItem>

        <FormItem name="login" :rules="[{ required: true, message: 'Заполните это поле' }]">
          <Input
            placeholder="Логин"
            size="large"
            :disabled="isLoad"
            autocomplete="off"
            v-model:value="formData.login"
          />
        </FormItem>

        <FormItem name="password" :rules="[{ required: true, message: 'Заполните это поле' }]">
          <InputPassword
            placeholder="Пароль"
            size="large"
            :disabled="isLoad"
            autocomplete="off"
            v-model:value="formData.password"
          />
        </FormItem>

        <Button type="primary" :loading="isLoad" htmlType="submit" size="large" block
          >Зарегистироваться</Button
        >
      </template>
    </Space>

    <Button type="link" @click="router.push('/auth/sign-in')">Войти</Button>
  </Form>
</template>
