export default function isAuth({ next, authStore }) {
  if (!authStore?.tokenGetter) {
    return next({
      path: '/auth/sign-in'
    })
  }

  return next()
}
