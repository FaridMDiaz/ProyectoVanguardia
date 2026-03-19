<template>
  <div class="select-wrapper">
    <h1>Vanguardia</h1>
    <p>¿Cómo deseas entrar?</p>
    <div class="options">
      <button @click="$router.push('/admin')" class="btn btn-primary btn-lg">
        <i class="bi bi-shield-lock"></i> Administrador
      </button>
      <button @click="$router.push('/cliente')" class="btn btn-outline-primary btn-lg">
        <i class="bi bi-person"></i> Cliente
      </button>
    </div>
  </div>
</template>

<style scoped>
.select-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}
.options {
  display: flex;
  gap: 1.5rem;
}
</style>