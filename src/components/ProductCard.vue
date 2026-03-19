<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front" :style="{ background: gradientColor }">
        <span class="category-badge">{{ product.categoria }}</span>
        <div class="product-thumb-wrapper mb-2">
          <img
            v-if="product.imagen"
            :src="`http://localhost:3000/private/${product.imagen}`"
            :alt="product.nombre"
            class="product-thumb"
          />
          <div v-else class="product-thumb fallback">Imagen no disponible</div>
        </div>
        <h3>{{ product.nombre }}</h3>
        <p class="text-truncate">{{ product.descripcion || 'Sin descripción' }}</p>
        <small>Pasa el cursor para ver detalles</small>
      </div>
      <div class="flip-card-back">
        <div>
          <h4>{{ product.nombre }}</h4>
          <p class="text-muted">{{ product.descripcion || 'Sin descripción disponible' }}</p>
          <div class="price">Q{{ formatPrice(product.precio) }}</div>
          <div :class="['stock', stockClass]">
            {{ product.stock }} unidades disponibles
          </div>
          <div v-if="product.direccion" class="mt-2">
            <small class="text-muted">
              <i class="bi bi-geo-alt"></i> {{ product.direccion }}
            </small>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <routerLink v-if="admin" :to="`/admin/productos/${product.id}`" class="btn-view">
            <i class="bi bi-eye"></i> Ver detalles
          </routerLink>
          <div v-if="admin" class="d-flex gap-2">
            <button @click="editProduct" class="btn btn-sm btn-outline-primary">
              <i class="bi bi-pencil"></i> Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    admin: {
      type: Boolean,
      default: true
    }
  },
  emits: ['edit'],
  setup(props, { emit }) {
    const gradientColor = computed(() => {
      const gradients = {
        'Electrónica': 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
        'Ropa': 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        'Hogar': 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
        'Muebles': 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
        'Libros': 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
        'Sofás': 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
        'Comedores': 'linear-gradient(135deg, #16a085 0%, #1abc9c 100%)',
        'Area bebés': 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
        'default': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }
      return gradients[props.product.categoria] || gradients.default
    })

    const stockClass = computed(() => {
      if (props.product.stock === 0) return 'out-of-stock'
      if (props.product.stock < 5) return 'low-stock'
      return 'in-stock'
    })

    const formatPrice = (price) => {
      return Number(price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    const editProduct = () => {
      emit('edit', props.product.id)
    }

    return {
      gradientColor,
      stockClass,
      formatPrice,
      editProduct
    }
  }
}
</script>