<template>
  <div class="container mt-5 pt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card form-container">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">
              {{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}
            </h2>
            
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre del producto *</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  v-model="form.nombre"
                  required
                  placeholder="Ej. Sofá de cuero"
                />
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea
                  class="form-control"
                  id="descripcion"
                  v-model="form.descripcion"
                  rows="4"
                  placeholder="Describe las características del producto..."
                ></textarea>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="precio" class="form-label">Precio ($) *</label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input
                      type="number"
                      class="form-control"
                      id="precio"
                      v-model="form.precio"
                      required
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="stock" class="form-label">Stock *</label>
                  <input
                    type="number"
                    class="form-control"
                    id="stock"
                    v-model="form.stock"
                    required
                    min="0"
                    step="1"
                    placeholder="0"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label for="categoria" class="form-label">Categoría *</label>
                <select class="form-select" id="categoria" v-model="form.categoria" required>
                  <option value="">Selecciona una categoría</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                </select>
              </div>
              <div class="d-flex gap-3">
                <button type="button" @click="cancel" class="btn btn-outline-secondary flex-grow-1">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-custom-primary flex-grow-1" :disabled="saving">
                  <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
                  {{ saving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Producto') }}
                </button>
              </div>
              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'ProductoFormView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const productId = computed(() => route.params.id)
    const isEditing = computed(() => productId.value && productId.value !== 'nuevo')

    const categories = [
      'Electrónica', 'Ropa', 'Hogar', 'Muebles', 
      'Camas', 'Libros', 'Juguetes', 'Otros'
    ]

    const form = ref({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoria: ''
    })

    const saving = ref(false)
    const error = ref(null)

    const fetchProduct = async () => {
      if (!isEditing.value) return
      
      try {
        const response = await axios.get(`/api/productos/${productId.value}`)
        form.value = {
          nombre: response.data.nombre,
          descripcion: response.data.descripcion || '',
          precio: response.data.precio,
          stock: response.data.stock,
          categoria: response.data.categoria
        }
      } catch (err) {
        error.value = 'Error al cargar el producto'
      }
    }

    const handleSubmit = async () => {
      saving.value = true
      error.value = null

      try {
        if (isEditing.value) {
          await axios.put(`/api/productos/${productId.value}`, form.value)
          alert('Producto actualizado exitosamente')
        } else {
          await axios.post('/api/productos', form.value)
          alert('Producto creado exitosamente')
        }
        router.push('/productos')
      } catch (err) {
        error.value = `Error al ${isEditing.value ? 'actualizar' : 'crear'} el producto`
      } finally {
        saving.value = false
      }
    }

    const cancel = () => {
      router.push('/productos')
    }

    onMounted(() => {
      fetchProduct()
    })

    return {
      form,
      isEditing,
      saving,
      error,
      categories,
      handleSubmit,
      cancel
    }
  }
}
</script>