import { orders } from '../http'

export default {
  get(payload) {
    orders.setItem('1', 'orderData')
  }
  // signUp(payload) {
  //   const url = `/auth/sign-in`
  //   return http.post(url, payload)
  // },
  // getProfile(params) {
  //   const url = `/me`
  //   return http.get(url, params)
  // }
}
