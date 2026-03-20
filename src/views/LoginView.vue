<template>
  <div class="login-wrapper">
    <div class="card login-card">
      <div class="card-body p-5">
        <h2 class="text-center mb-1">
          <i class="bi bi-lock"></i>
          {{ modo === 'login' ? 'Panel privado' : 'Crear cuenta' }}
        </h2>
        <p class="text-center text-muted mb-4">
          {{ modo === 'login' ? 'Acceso de administrador' : 'Registro de administrador' }}
        </p>

        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Tu nombre de usuario"
            @keyup.enter="submit"
          />
        </div>

        <div class="mb-4">
          <label class="form-label">Contraseña</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Tu contraseña"
            @keyup.enter="submit"
          />
        </div>

        <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
        <div v-if="exito" class="alert alert-success py-2">{{ exito }}</div>

        <button
          class="btn btn-custom-primary w-100 mb-3"
          @click="submit"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ modo === 'login' ? 'Entrar' : 'Crear cuenta' }}
        </button>

        <div class="text-center">
          <a
            href="#"
            class="text-muted small"
            @click.prevent="toggleModo"
          >
            {{ modo === 'login' ? '¿No tienes cuenta? Crear una' : '¿Ya tienes cuenta? Iniciar sesión' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const modo = ref('login')
const username = ref('')
const password = ref('')
const error = ref(null)
const exito = ref(null)
const loading = ref(false)

const toggleModo = () => {
  modo.value = modo.value === 'login' ? 'register' : 'login'
  error.value = null
  exito.value = null
}

const submit = async () => {
  error.value = null
  exito.value = null

  if (!username.value || !password.value) {
    error.value = 'Completa todos los campos'
    return
  }

  loading.value = true
  try {
    if (modo.value === 'login') {
      await axios.post('http://localhost:3000/auth/login', {
        username: username.value,
        password: password.value
      })
      localStorage.setItem('admin_user', username.value)
      router.push('/admin')
    } else {
      await axios.post('http://localhost:3000/auth/register', {
        username: username.value,
        password: password.value
      })
      exito.value = '¡Cuenta creada! Ahora puedes iniciar sesión.'
      modo.value = 'login'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al conectar con el servidor'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  width: 100%;
  max-width: 420px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
</style>