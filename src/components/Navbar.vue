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
          <li class="nav-item" v-if="!$route.path.startsWith('/admin')">
            <a class="nav-link dropdown-toggle" href="#" id="categoriaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-grid"></i> Categorías
            </a>
            <ul class="dropdown-menu" aria-labelledby="categoriaDropdown">
              <li><router-link class="dropdown-item" to="/">Todas</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/area-bebes">Area bebés</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/cuadros">Cuadros</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/espejos">Espejos</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/mesas">Mesas</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/comedores">Comedores</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/adornos">Adornos</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/set-de-cuartos">Set de cuartos</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/libros-para-adulto">Libros para adulto</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/libros-escolares">libros escolares</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/juegos-de-sala">Juegos de sala</router-link></li>
              <li><router-link class="dropdown-item" to="/categoria/sofas">Sofás</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin" :class="{ active: $route.path === '/admin' }">
              <i class="bi bi-lock"></i> Panel privado
            </router-link>
          </li>
          <li class="nav-item" v-if="$route.path.startsWith('/admin')">
            <router-link class="nav-link" to="/" :class="{ active: $route.path === '/' }">
              <i class="bi bi-shop"></i> Volver al público
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
<style>
</style>