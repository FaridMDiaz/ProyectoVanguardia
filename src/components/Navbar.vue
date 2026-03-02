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
          <li class="nav-item">
            <router-link class="nav-link" to="/" :class="{ active: $route.path === '/' }">
              <i class="bi bi-house-door"></i> Inicio
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/productos" :class="{ active: $route.path === '/productos' }">
              <i class="bi bi-grid"></i> Productos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/productos/nuevo" :class="{ active: $route.path === '/productos/nuevo' }">
              <i class="bi bi-plus-circle"></i> Nuevo Producto
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