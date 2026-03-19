<template>
  <div>
    <ClientNavbar
      :categorias="categorias"
      :categoriaActiva="categoriaActiva"
      @filtrar="filtrar"
    />

    <div class="container py-4">
      <div class="row g-3">
        <div
          v-for="item in itemsFiltrados"
          :key="item.id"
          class="col-md-4"
        >
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ item.nombre }}</h5>
              <p class="card-text text-muted">{{ item.categoria }}</p>
              <p class="card-text">{{ item.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ClientNavbar from '../components/ClientNavbar.vue'

const items = ref([])
const categoriaActiva = ref(null)

// Ajusta la URL según tu server.js
onMounted(async () => {
  const res = await axios.get('http://localhost:3000/api/items')
  items.value = res.data
})

const categorias = computed(() => [...new Set(items.value.map(i => i.categoria))])

const itemsFiltrados = computed(() =>
  categoriaActiva.value
    ? items.value.filter(i => i.categoria === categoriaActiva.value)
    : items.value
)

function filtrar(cat) {
  categoriaActiva.value = cat
}
</script>