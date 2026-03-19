import { createRouter, createWebHistory } from 'vue-router'
import ClienteView from '../views/ClienteView.vue'
import HomeView from '../views/HomeView.vue'
import ProductosView from '../views/ProductView.vue'
import ProductoFormView from '../views/ProductoFormView.vue'
import CategoriaView from '../views/CategoriaView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SelectView from '../views/SelectView.vue'
import AdminView from '../views/AdminView.vue'   // tu vista admin actual
import ClientView from '../views/ClientView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'public-client',
      component: ClienteView
    },
    {
      path: '/admin',
      name: 'admin-home',
      component: HomeView
    },
    {
      path: '/admin/productos',
      name: 'admin-productos',
      component: ProductosView
    },
    {
      path: '/admin/productos/nuevo',
      name: 'admin-nuevo-producto',
      component: ProductoFormView
    },
    {
      path: '/admin/productos/:id',
      name: 'admin-editar-producto',
      component: ProductoFormView
    },
    {
      path: '/categoria/:slug',
      name: 'categoria',
      component: CategoriaView,
      props: true
    }
  ]
})

const routes = [
  { path: '/', component: SelectView },
  { path: '/admin', component: AdminView },
  { path: '/cliente', component: ClientView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})