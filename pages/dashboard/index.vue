<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Dashboard - Fish Monitor</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Sucursales</h3>
          <p class="text-gray-300">Gestionar sucursales del sistema</p>
        </div>
        
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Cámaras</h3>
          <p class="text-gray-300">Monitorear cámaras de seguridad</p>
        </div>
        
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Configuración</h3>
          <p class="text-gray-300">Ajustes del sistema</p>
        </div>
      </div>
      
      <div class="mt-8">
        <NuxtLink 
          to="/settings" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
        >
          Ir a Configuración
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple dashboard page
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
