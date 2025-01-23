<script setup>
// NPM
import { Row, Col, Button } from 'ant-design-vue'
import { useRouter } from 'vue-router'

// Data:imports
const router = useRouter()
</script>

<template>
  <div class="error-page">
    <div class="box error-page__container">
      <h1>404</h1>
      <div>page not found</div>

      <Row :gutter="16">
        <Col :span="12">
          <Button block @click="router.back()">Назад</Button>
        </Col>
        <Col :span="12">
          <Button block @click="router.push('/')">На главную</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>

<style>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.error-page__container {
  width: 300px;
}

.error-page h1 {
  margin: 0;
}
</style>
