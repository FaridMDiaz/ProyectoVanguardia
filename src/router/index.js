import { createRouter, createWebHistory } from 'vue-router'
import SelectView from '../views/SelectView.vue'
import ClienteView from '../views/ClienteView.vue'
import HomeView from '../views/HomeView.vue'
import ProductosView from '../views/ProductView.vue'
import ProductoFormView from '../views/ProductoFormView.vue'
import CategoriaView from '../views/CategoriaView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'select',
      component: SelectView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cliente',
      name: 'public-client',
      component: ClienteView
    },
    {
      path: '/admin',
      name: 'admin-home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/productos',
      name: 'admin-productos',
      component: ProductosView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/productos/nuevo',
      name: 'admin-nuevo-producto',
      component: ProductoFormView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/productos/:id',
      name: 'admin-editar-producto',
      component: ProductoFormView,
      meta: { requiresAuth: true }
    },
    {
      path: '/categoria/:slug',
      name: 'categoria',
      component: CategoriaView,
      props: true
    }
  ]
})

// Protección de rutas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('admin_user')) {
    next('/login')
  } else {
    next()
  }
})

export default router