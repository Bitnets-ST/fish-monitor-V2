<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Fish Monitor</h1>
      <p class="text-xl text-gray-300 mb-8">Sistema de Monitoreo de Peces</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Dashboard</h3>
          <p class="text-gray-300 mb-4">Accede al panel principal del sistema</p>
          <NuxtLink 
            to="/dashboard" 
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-block"
          >
            Ir al Dashboard
          </NuxtLink>
        </div>
        
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Cámaras</h3>
          <p class="text-gray-300 mb-4">Monitorear cámaras de seguridad</p>
          <NuxtLink 
            to="/cameras" 
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-block"
          >
            Ver Cámaras
          </NuxtLink>
        </div>
        
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Configuración</h3>
          <p class="text-gray-300 mb-4">Ajustes del sistema</p>
          <NuxtLink 
            to="/settings" 
            class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-block"
          >
            Configuración
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Welcome page with navigation to main sections
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
