<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front" :style="{ background: gradientColor }">
        <span class="category-badge">{{ product.categoria }}</span>
        <h3>{{ product.nombre }}</h3>
        <p class="text-truncate">{{ product.descripcion || 'Sin descripción' }}</p>
        <small>Pasa el cursor para ver detalles</small>
      </div>
      <div class="flip-card-back">
        <div>
          <h4>{{ product.nombre }}</h4>
          <p class="text-muted">{{ product.descripcion || 'Sin descripción disponible' }}</p>
          
          <div class="price">${{ formatPrice(product.precio) }}</div>
          
          <div :class="['stock', stockClass]">
            {{ product.stock }} unidades disponibles
          </div>
          
          <div class="mt-3">
            <small class="text-muted">
              <i class="bi bi-calendar"></i> 
              {{ formatDate(product.fecha_creacion) }}
            </small>
          </div>
        </div>
        
        <div class="d-flex justify-content-between align-items-center mt-3">
          <routerLink :to="`/productos/${product.id}`" class="btn-view">
            <i class="bi bi-eye"></i> Ver detalles
          </routerLink>
          
          <div>
            <button @click="editProduct" class="btn btn-sm btn-outline-primary me-2">
              <i class="bi bi-pencil"></i>
            </button>
            <button @click="confirmDelete" class="btn btn-sm btn-outline-danger">
              <i class="bi bi-trash"></i>
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
    }
  },
  emits: ['delete', 'edit'],
  setup(props, { emit }) {
    const gradientColor = computed(() => {
      const gradients = {
        'Electrónica': 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
        'Ropa': 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        'Hogar': 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
        'Muebles': 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
        'Libros': 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
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
      return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const confirmDelete = () => {
      if (confirm('¿Estás seguro de eliminar este producto?')) {
        emit('delete', props.product.id)
      }
    }

    const editProduct = () => {
      emit('edit', props.product.id)
    }

    return {
      gradientColor,
      stockClass,
      formatPrice,
      formatDate,
      confirmDelete,
      editProduct
    }
  }
}
</script>