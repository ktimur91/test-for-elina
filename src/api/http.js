// NPM
import localforage from 'localforage'

// Data:base
const dbName = 'timTest'

// Create table users
export const users = localforage.createInstance({
  name: dbName,
  storeName: 'users'
})

// Create table orders
export const orders = localforage.createInstance({
  name: dbName,
  storeName: 'orders'
})
