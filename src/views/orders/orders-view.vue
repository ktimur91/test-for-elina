<script setup>
// NPM
import dayjs from 'dayjs'
import { Table, Button, Flex, Space, DatePicker } from 'ant-design-vue'
import { reactive, computed } from 'vue'

// Data:base
const dataSource = [
  {
    key: '1',
    name: 'Mike J. P.',
    age: 1.2,
    ticketsCount: 25,
    successTicketsCount: 25,
    createdAt: new Date('2024-12-01')
  },
  {
    key: '2',
    name: 'Timur A. K.',
    age: 15,
    ticketsCount: 25,
    successTicketsCount: 25,
    createdAt: new Date('2024-12-01')
  },
  {
    key: '3',
    name: 'Gulsum D. K.',
    age: 0.5,
    ticketsCount: 25,
    successTicketsCount: 25,
    createdAt: new Date('2024-12-01')
  }
]
const columns = [
  {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Стаж работы (лет)',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Кол-во заявок',
    dataIndex: 'ticketsCount',
    key: 'ticketsCount'
  },
  {
    title: 'Обработаных заявок',
    dataIndex: 'successTicketsCount',
    key: 'successTicketsCount'
  },
  {
    title: 'Дата обновления',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: 'Действия',
    dataIndex: 'action',
    key: 'action'
  }
]
const filterData = reactive({
  from: '',
  to: ''
})

// Computed
const tableRows = computed(() => {
  if (filterData.from && filterData.to) {
    return dataSource.filter((el) => {
      const createdAt = dayjs(el.createdAt)
      const from = dayjs(filterData.from)
      const to = dayjs(filterData.to)
      return createdAt >= from && createdAt <= to
    })
  }
  return dataSource
})

// Methods
function resetData() {
  filterData.from = ''
  filterData.to = ''
}
</script>

<template>
  <main class="orders-page">
    <div class="container">
      <Flex align="center" justify="space-between" :wrapperCol="10">
        <h1>Отчеты по сотрудникам</h1>
        <Space direction="horizontal">
          <Button v-if="filterData.from && filterData.to" @click="resetData()">Сбросить</Button>
          <DatePicker v-model:value="filterData.from" />
          <DatePicker v-model:value="filterData.to" />
        </Space>
      </Flex>
      <Table :dataSource="tableRows" :columns="columns" class="orders-page__table box">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'createdAt'">
            {{ dayjs(record.createdAt).format('DD MMMM YYYY') }}
          </template>

          <template v-else-if="column.key === 'action'">
            <span>
              <Button>Отчет</Button>
            </span>
          </template>
        </template>
      </Table>
    </div>
  </main>
</template>

<style>
.orders-page {
  padding: 30px 0;
}
.orders-page__table {
  padding: 0;
  overflow: hidden;
}

.ant-table-wrapper::before,
.ant-table-wrapper::after {
  display: none !important;
}
</style>
