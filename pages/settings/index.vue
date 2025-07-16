<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
          AJUSTES
        </h1>
      </div>

      <div class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Configuración del Sistema
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Aquí puedes configurar los parámetros del sistema de monitoreo de peces.
        </p>
      </div>

      <div class="mt-8">
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Contenido del Dashboard
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Aquí puedes agregar los componentes principales de tu dashboard, como
          gráficos, tablas de datos, etc.
        </p>
        
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-md">
          <h4 class="text-lg font-semibold text-blue-700 dark:text-blue-300">
            Panel de Control
          </h4>
          <p class="text-blue-600 dark:text-blue-400">
            Acceso completo al sistema de monitoreo.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { definePageMeta } from "#imports";

definePageMeta({
  // Removed authentication middleware
});
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
