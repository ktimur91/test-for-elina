export default function isAuth({ next, authStore }) {
  if (authStore?.tokenGetter) {
    return next({
      path: '/main'
    })
  }

  return next()
}
