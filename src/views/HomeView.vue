<template>
  <div>
    <section class="hero-section">
      <div class="container">
        <h1 class="fade-in-up">Productos Americanos Usados</h1>
        <p class="lead fade-in-up" style="animation-delay: 0.2s">
          Calidad y economía en un solo lugar
        </p>
        <div class="fade-in-up" style="animation-delay: 0.4s">
          <routerLink to="/productos" class="btn btn-custom-primary me-3">
            Ver catálogo
          </routerLink>
          <routerLink to="/productos/nuevo" class="btn btn-custom-outline">
            Publicar producto
          </routerLink>
        </div>
      </div>
    </section>
    <div class="container mb-5">
      <h2 class="text-center text-white mb-5">¿Por qué elegirnos?</h2>
      <div class="row g-4">
        <div class="col-md-4" v-for="(feature, index) in features" :key="index">
          <div class="feature-card">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p class="text-muted">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-5">
      <h2 class="text-center text-white mb-5">Categorías populares</h2>
      <div class="row g-4">
        <div class="col-md-3 col-6" v-for="(cat, index) in categories" :key="index">
          <div class="card bg-white text-center p-4" 
               :style="{ borderTop: `4px solid ${cat.color}` }">
            <h4>{{ cat.name }}</h4>
            <p class="text-muted">{{ cat.count }} productos</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-5">
      <div class="row">
        <div class="col-12">
          <div class="card bg-white p-5 text-center">
            <h2 class="mb-4">¿Tienes productos para vender?</h2>
            <p class="lead mb-4">
              Publica tus productos de forma gratuita y llega a más clientes
            </p>
            <div>
              <routerLink to="/productos/nuevo" class="btn btn-custom-primary">
                Comenzar ahora
              </routerLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      features: [
        {
          title: 'Muebles restaurados',
          description: 'Calidad y durabilidad garantizada'
        },{
          title: 'Precios accesibles',
          description: 'Los mejores precios del mercado'
        },
        {
          title: 'Entrega a domicilio',
          description: 'Llevamos tus productos hasta tu casa'
        }
      ],
      categories: [
        { name: 'Muebles', color: '#e67e22', count: 45 },
        { name: 'Camas', color: '#3498db', count: 30 },
        { name: 'Libros', color: '#9b59b6', count: 120 },
        { name: 'Hogar', color: '#27ae60', count: 80 }
      ]
    }
  }
}
</script>