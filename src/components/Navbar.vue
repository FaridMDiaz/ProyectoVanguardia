<template>
  <nav class="navbar navbar-expand-lg navbar-custom fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-shop"></i> Productos Americanos Usados
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <template v-if="esVistaCliente">
            <li class="nav-item">
              <router-link class="nav-link" to="/cliente">Todas</router-link>
            </li>
            <li class="nav-item" v-for="cat in categorias" :key="cat.slug">
              <router-link
                class="nav-link"
                :to="`/categoria/${cat.slug}`"
                :class="{ active: $route.params.slug === cat.slug }"
              >
                {{ cat.nombre }}
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item" v-if="!$route.path.startsWith('/admin')">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="bi bi-grid"></i> Categorías
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/">Todas</router-link></li>
                <li v-for="cat in categorias" :key="cat.slug">
                  <router-link class="dropdown-item" :to="`/categoria/${cat.slug}`">
                    {{ cat.nombre }}
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/admin" :class="{ active: $route.path === '/admin' }">
                <i class="bi bi-lock"></i> Panel privado
              </router-link>
            </li>

            <li class="nav-item" v-if="$route.path.startsWith('/admin')">
              <router-link class="nav-link" to="/">
                <i class="bi bi-shop"></i> Volver al público
              </router-link>
            </li>
          </template>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const categorias = [
  { slug: 'area-bebes',         nombre: 'Area bebés' },
  { slug: 'cuadros',            nombre: 'Cuadros' },
  { slug: 'espejos',            nombre: 'Espejos' },
  { slug: 'mesas',              nombre: 'Mesas' },
  { slug: 'comedores',          nombre: 'Comedores' },
  { slug: 'adornos',            nombre: 'Adornos' },
  { slug: 'set-de-cuartos',     nombre: 'Set de cuartos' },
  { slug: 'libros-para-adulto', nombre: 'Libros para adulto' },
  { slug: 'libros-escolares',   nombre: 'Libros escolares' },
  { slug: 'juegos-de-sala',     nombre: 'Juegos de sala' },
  { slug: 'sofas',              nombre: 'Sofás' },
  { slug: 'muebles',            nombre: 'Muebles' },
]

export default {
  name: 'Navbar',
  setup() {
    const route = useRoute()

    const esVistaCliente = computed(() =>
      route.path === '/cliente' ||
      route.path.startsWith('/categoria/')
    )

    return {
      categorias,
      esVistaCliente
    }
  }
}
</script>