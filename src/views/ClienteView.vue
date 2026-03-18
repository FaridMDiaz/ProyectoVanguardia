<template>
  <div>
    <section class="hero-section">
      <div class="container text-center">
        <h1 class="fade-in-up">Catálogo público de productos</h1>
        <p class="lead fade-in-up" style="animation-delay: 0.2s">
          Consulta todo lo disponible sin editar ni eliminar.
        </p>
        <div class="fade-in-up" style="animation-delay: 0.4s">
          <router-link to="/" class="btn btn-custom-primary me-3">
            Ver productos
          </router-link>
          <router-link to="/admin" class="btn btn-custom-outline">
            Ir a panel privado
          </router-link>
        </div>
      </div>
    </section>

    <div class="container mt-4">
      <div class="row">
        <div class="col-12 mb-3">
          <h2 class="text-white">Productos disponibles</h2>
          <p class="text-muted">Vista solo lectura para clientes</p>
          <p class="text-white mb-1">
            <strong>Dirección pública:</strong> 15.772099, -86.781680
          </p>
          <p class="text-white mb-0">
            Barrio Bella Vista, La Ceiba, Atlántida
          </p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <div class="card bg-white p-3 mb-3">
            <h5 class="mb-2">Áreas disponibles</h5>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge bg-primary">Area bebés</span>
              <span class="badge bg-secondary">Cuadros</span>
              <span class="badge bg-success">Espejos</span>
              <span class="badge bg-danger">Mesas</span>
              <span class="badge bg-warning text-dark">Comedores</span>
              <span class="badge bg-info text-dark">Adornos</span>
              <span class="badge bg-dark">Set de cuartos</span>
              <span class="badge bg-primary">Libros para adulto</span>
              <span class="badge bg-secondary">libros escolares</span>
              <span class="badge bg-success">Juegos de sala</span>
              <span class="badge bg-danger">Sofás</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div class="input-group mb-3">
            <span class="input-group-text bg-white border-end-0">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              class="form-control border-start-0"
              placeholder="Buscar productos..."
              v-model="searchTerm"
              @input="filterProducts"
            />
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-custom mx-auto mb-3"></div>
        <p class="text-white">Cargando productos...</p>
      </div>
      <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>
      <div v-else-if="filteredProducts.length === 0" class="text-center py-5">
        <div class="card bg-white p-5">
          <h3>No hay productos disponibles</h3>
          <p class="text-muted">Revisa nuevamente en unos minutos</p>
        </div>
      </div>

      <div v-else class="row">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="col-lg-3 col-md-4 col-sm-6"
        >
          <ProductCard :product="product" :admin="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'ClienteView',
  components: {
    ProductCard
  },
  setup() {
    const products = ref([])
    const filteredProducts = ref([])
    const searchTerm = ref('')
    const loading = ref(true)
    const error = ref(null)

    const fetchProducts = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await axios.get('/api/productos')
        products.value = response.data
        filteredProducts.value = response.data
      } catch (err) {
        error.value = 'Error al cargar productos públicos.'
      } finally {
        loading.value = false
      }
    }

    const filterProducts = () => {
      if (!searchTerm.value) {
        filteredProducts.value = products.value
        return
      }
      const term = searchTerm.value.toLowerCase()
      filteredProducts.value = products.value.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(term))
      )
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      products,
      filteredProducts,
      searchTerm,
      loading,
      error,
      filterProducts
    }
  }
}
</script>
