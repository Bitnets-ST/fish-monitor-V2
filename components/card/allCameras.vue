<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div class="p-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold flex items-center">
          <Icon name="mdi:camera" class="mr-2" /> Cámaras
        </h3>
        <span class="bg-white text-pink-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {{ cameras.length }}
        </span>
      </div>
    </div>
    <div v-if="loading" class="p-6 flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
    </div>
    <div v-else-if="error" class="p-6 text-center text-red-500">
      <Icon name="mdi:alert-circle" size="32" class="mx-auto mb-2" />
      <p>{{ error }}</p>
    </div>
    <div v-else-if="cameras.length === 0" class="p-6 text-center text-gray-500 dark:text-gray-400">
      <Icon name="mdi:camera-off" size="32" class="mx-auto mb-2" />
      <p>No hay cámaras registradas</p>
    </div>
    <div v-else class="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
      <div v-for="camera in cameras" :key="camera._id" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white">{{ camera.name }}</h4>
            <p class="text-xs text-gray-400 mt-1">
              <Icon name="mdi:ip-network" class="inline-block mr-1" />
              {{ camera.camera_IP }}
            </p>
            <div class="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span class="flex items-center">
                <Icon name="mdi:video-outline" class="mr-1" />
                Tipo: {{ camera.camera_type }}
              </span>
              <span class="flex items-center" v-if="camera.zone_id">
                <Icon name="mdi:map-marker" class="mr-1" />
                Zona: {{ camera.zone_id.name || camera.zone_id }}
              </span>
              <span class="flex items-center" v-if="camera.createdAt">
                <Icon name="mdi:calendar" class="mr-1" />
                Creado: {{ new Date(camera.createdAt).toLocaleDateString() }}
              </span>
              <span class="flex items-center" v-if="camera.updatedAt">
                <Icon name="mdi:calendar-edit" class="mr-1" />
                Modificado: {{ new Date(camera.updatedAt).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '#imports';

const cameras = ref([]);
const loading = ref(true);
const error = ref('');

const fetchCameras = async () => {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await useFetch('/api/get/camera');
    if (data.value && data.value.success) {
      cameras.value = data.value.cameras;
    } else {
      error.value = 'No se pudieron cargar las cámaras';
    }
  } catch (e) {
    error.value = 'Error al cargar las cámaras';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCameras);
</script>

<style scoped>
</style>