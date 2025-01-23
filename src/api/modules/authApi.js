import { users } from '../http'

export default {
  signIn(payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        users
          .getItem(payload.login)
          .then((userData) => {
            if (userData.password === payload.password) resolve(userData)
            else reject('wrongPassword')
          })
          .catch((error) => {
            console.log('Такого пользователя не существует', error)
            reject('notFound')
          })
      }, 1000)
    })
  },

  signUp(payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        users.getItem(payload.login).then(async (userData) => {
          if (userData) {
            reject('notUniq')
          } else {
            await users.setItem(payload.login, payload)
            resolve()
          }
        })
      }, 1000)
    })
  }
}
