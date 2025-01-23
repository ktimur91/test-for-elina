// NPM
import { createRouter, createWebHistory } from 'vue-router'

// Local
import { useAuthStore } from '@/stores'

// Local: Middleware
import isAuth from '@/middleware/isAuth'
import isGuest from '@/middleware/isGuest'

// Local: Routes
import auth from './modules/auth'
import orders from './modules/orders'

// Create router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/redirect-view.vue')
    },
    {
      path: '/orders',
      meta: {
        middleware: [isAuth]
      },
      component: () => import('@/layouts/default-layout.vue'),
      children: [...orders]
    },
    {
      path: '/auth',
      meta: {
        middleware: [isGuest]
      },
      component: () => import('@/layouts/auth-layout.vue'),
      children: [...auth]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/error-view.vue')
    }
  ]
})

// Middleware check
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next()

  const authStore = useAuthStore()
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    authStore
  }

  return middleware[0]({ ...context })
})

export default router
