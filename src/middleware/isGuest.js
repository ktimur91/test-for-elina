export default function isAuth({ next, authStore }) {
  if (authStore?.tokenGetter) {
    return next({
      path: '/orders'
    })
  }

  return next()
}
