<template>
  <div v-if="stats && !loading && !error" class="bg-gray-700 text-white p-4">
    <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div class="bg-blue-600 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[100px]">
        <Icon name="mdi:fishbowl-outline" class="text-3xl mb-2" />
        <p class="text-sm font-medium">Total Estanques</p>
        <p class="text-2xl font-bold">{{ stats.totalTanks !== null ? stats.totalTanks : 'N/A' }}</p>
      </div>
      <div class="bg-green-600 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[100px]">
        <Icon name="mdi:fish" class="text-3xl mb-2" />
        <p class="text-sm font-medium">Total Peces</p>
        <p class="text-2xl font-bold">{{ stats.totalFish !== null ? stats.totalFish : 'N/A' }}</p>
      </div>
      <div class="bg-yellow-500 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[100px]">
        <Icon name="mdi:thermometer" class="text-3xl mb-2" />
        <p class="text-sm font-medium">Temp. Promedio</p>
        <p class="text-2xl font-bold">
          {{ stats.averageTemperature !== null ? stats.averageTemperature + '°C' : 'N/A' }}
        </p>
      </div>
      <div class="bg-purple-600 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[100px]">
        <Icon name="mdi:weight-kilogram" class="text-3xl mb-2" />
        <p class="text-sm font-medium">Biomasa Total</p>
        <p class="text-2xl font-bold">
          {{ stats.totalBiomassKg !== null ? stats.totalBiomassKg + ' kg' : 'N/A' }}
        </p>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="bg-gray-800 text-white p-4 text-center">
    Cargando estadísticas...
  </div>
  <div v-else-if="error" class="bg-red-700 text-white p-4 text-center">
    Error al cargar estadísticas: {{ error }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stats = ref(null);
const loading = ref(true);
const error = ref('');

async function fetchGlobalStats() {
  loading.value = true;
  error.value = '';
  try {
    const response = await $fetch('/api/get/tank');
    if (response.success && response.summary) {
      stats.value = response.summary;
    } else {
      throw new Error('Respuesta de API inválida o resumen no encontrado.');
    }
  } catch (err) {
    console.error('Error fetching global stats:', err);
    error.value = err.data?.message || err.message || 'Error desconocido.';
    stats.value = null; // Clear stats on error
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchGlobalStats();
});
</script>

<style scoped>
/* Scoped styles if needed, for example, to ensure min-height for consistency */
.min-h-\[100px\] {
  min-height: 100px;
}
</style>
