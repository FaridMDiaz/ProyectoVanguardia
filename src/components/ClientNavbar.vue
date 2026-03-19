<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold" to="/cliente">Vanguardia</router-link>

      <!-- Categorías como items directos, sin dropdown -->
      <div class="navbar-nav flex-row gap-2 ms-auto">
        <a
          v-for="cat in categorias"
          :key="cat"
          class="nav-link px-3"
          :class="{ active: categoriaActiva === cat }"
          href="#"
          @click.prevent="$emit('filtrar', cat)"
        >
          {{ cat }}
        </a>
        <a class="nav-link px-3" @click.prevent="$emit('filtrar', null)">Todas</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  categorias: Array,
  categoriaActiva: String,
})
defineEmits(['filtrar'])
</script>