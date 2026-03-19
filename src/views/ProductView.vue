<template>
  <div class="container mt-5 pt-5">
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="text-white">Nuestros Productos</h1>
          <RouterLink to="/admin/productos/nuevo" class="btn btn-custom-primary">
            <i class="bi bi-plus-circle"></i> Nuevo Producto
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-8 mx-auto">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0"
            v-model="searchTerm"
            placeholder="Buscar productos por nombre, categoría o descripción..."
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
      <button @click="fetchProducts" class="btn btn-danger ms-3">
        Reintentar
      </button>
    </div>
    <div v-else-if="filteredProducts.length === 0" class="text-center py-5">
      <div class="card bg-white p-5">
        <i class="bi bi-emoji-frown display-1 text-muted mb-3"></i>
        <h3>No hay productos disponibles</h3>
        <p class="text-muted">Comienza agregando tu primer producto</p>
        <div>
          <RouterLink to="/admin/productos/nuevo" class="btn btn-custom-primary">
            <i class="bi bi-plus-circle"></i> Agregar Producto
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card bg-white p-3 mb-4">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <div>
            <h4 class="mb-1">Sección para eliminar productos</h4>
            <small class="text-muted">Desde aquí puedes eliminar productos rápidamente sin usar la tarjeta.</small>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-bordered mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th class="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filteredProducts" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.nombre }}</td>
                <td>{{ product.categoria }}</td>
                <td>{{ product.stock }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteProduct(product.id)"
                  >
                    <i class="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="col-lg-3 col-md-4 col-sm-6"
        >
          <ProductCard
            :product="product"
            :admin="true"
            @edit="handleEdit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()
const products = ref([])
const filteredProducts = ref([])
const searchTerm = ref('')
const loading = ref(true)
const error = ref(null)

const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get('http://localhost:3000/productos')
    products.value = response.data
    filteredProducts.value = response.data
  } catch (err) {
    error.value = 'Error al cargar los productos'
    console.error('Error completo:', err)
    console.error('URL intentada:', err.config?.url)
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
  filteredProducts.value = products.value.filter(product =>
    product.nombre.toLowerCase().includes(term) ||
    product.categoria.toLowerCase().includes(term) ||
    (product.descripcion && product.descripcion.toLowerCase().includes(term))
  )
}

const deleteProduct = async (productId) => {
  if (!confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) return
  try {
    await axios.delete(`http://localhost:3000/productos/${productId}`)
    await fetchProducts()
  } catch (err) {
    alert('Error al eliminar el producto')
    console.error('Error al eliminar:', err)
  }
}

const handleEdit = (productId) => {
  router.push(`/admin/productos/${productId}`)
}

onMounted(() => {
  fetchProducts()
})
</script>