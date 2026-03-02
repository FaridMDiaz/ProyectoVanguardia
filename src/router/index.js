import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductosView from '../views/ProductView.vue'
import ProductoFormView from '../views/ProductoFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/productos',
      name: 'productos',
      component: ProductosView
    },
    {
      path: '/productos/nuevo',
      name: 'nuevo-producto',
      component: ProductoFormView
    },
    {
      path: '/productos/:id',
      name: 'editar-producto',
      component: ProductoFormView
    }
  ]
})

export default router