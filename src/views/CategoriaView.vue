<template>
  <div>
    <section class="hero-section">
      <div class="container text-center">
        <h1 class="fade-in-up">Categoría: {{ categoryLabel }}</h1>
        <p class="lead fade-in-up" style="animation-delay: 0.2s">
          Productos disponibles en {{ categoryLabel }}
        </p>
        <div class="fade-in-up" style="animation-delay: 0.4s">
          <router-link to="/cliente" class="btn btn-custom-primary me-2">Ver todos</router-link>
          <router-link to="/admin" class="btn btn-custom-outline">Ir a panel privado</router-link>
        </div>
      </div>
    </section>

    <div class="container mt-4">
      <div class="row">
        <div class="col-12 mb-3">
          <h2 class="text-white">{{ categoryLabel }} disponibles</h2>
          <p class="text-muted">Solo lectura para usuario</p>
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
          <h3>No hay productos en esta categoría</h3>
          <p class="text-muted">Prueba con otra categoría</p>
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
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'

const categoryMap = {
  'area-bebes': 'Area bebés',
  'cuadros': 'Cuadros',
  'espejos': 'Espejos',
  'mesas': 'Mesas',
  'comedores': 'Comedores',
  'adornos': 'Adornos',
  'set-de-cuartos': 'Set de cuartos',
  'libros-para-adulto': 'Libros para adulto',
  'libros-escolares': 'libros escolares',
  'juegos-de-sala': 'Juegos de sala',
  'sofas': 'Sofás',
  'muebles': 'Muebles'
}

export default {
  name: 'CategoriaView',
  components: { ProductCard },
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const loading = ref(true)
    const products = ref([])
    const filteredProducts = ref([])
    const error = ref(null)

    const categoryLabel = computed(() => categoryMap[props.slug] || 'Categoría')

    const fetchProducts = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await axios.get('http://localhost:3000/productos')
        products.value = response.data
        const categoryName = categoryMap[props.slug]
        if (!categoryName) {
          filteredProducts.value = []
        } else {
          filteredProducts.value = response.data.filter(p => p.categoria === categoryName)
        }
      } catch (err) {
        error.value = 'Error al cargar productos de la categoría.'
        console.error('Error:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchProducts)
    watch(() => props.slug, fetchProducts)

    return {
      categoryLabel,
      loading,
      filteredProducts,
      error
    }
  }
}
</script>