<template>
  <div>
    <ClientNavbar
      :categorias="categorias"
      :categoriaActiva="categoriaActiva"
      @filtrar="filtrar"
    />

    <div class="container mt-5 pt-5">

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-custom mx-auto mb-3"></div>
        <p class="text-white">Cargando productos...</p>
      </div>

      <div v-else-if="itemsFiltrados.length === 0" class="text-center py-5">
        <div class="card bg-white p-5">
          <i class="bi bi-emoji-frown display-1 text-muted mb-3"></i>
          <h3>No hay productos en esta categoría</h3>
        </div>
      </div>

      <div v-else class="row">
        <div
          v-for="item in itemsFiltrados"
          :key="item.id"
          class="col-lg-3 col-md-4 col-sm-6"
        >
          <ProductCard
            :product="item"
            :admin="false"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ClientNavbar from '../components/ClientNavbar.vue'
import ProductCard from '../components/ProductCard.vue'

const items = ref([])
const categoriaActiva = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/productos')
    items.value = res.data
  } catch (err) {
    console.error('Error al cargar productos:', err)
  } finally {
    loading.value = false
  }
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