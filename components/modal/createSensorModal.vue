<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg mx-4">
      <div class="flex justify-between items-center pb-3 border-b dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Registrar Nuevo Sensor</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <Icon name="material-symbols:close-rounded" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
        <div>
          <label for="sensorName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Sensor <span class="text-red-500">*</span></label>
          <input 
            type="text" 
            id="sensorName" 
            v-model="form.name" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Ej: Sensor Temperatura Pileta 1"
          />
        </div>

        <div>
          <label for="sensorIP" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dirección IP del Sensor <span class="text-red-500">*</span></label>
          <input 
            type="text" 
            id="sensorIP" 
            v-model="form.sensor_IP" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Ej: 192.168.1.101"
          />
        </div>

        <div>
          <label for="sensorType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Sensor <span class="text-red-500">*</span></label>
          <select 
            id="sensorType" 
            v-model="form.sensor_type" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="" disabled>Seleccione un tipo de sensor</option>
            <option v-for="type in availableSensorTypes" :key="type._id" :value="type._id">
              {{ type.name }}
            </option>
          </select>
          <p v-if="sensorTypeFetchError" class="text-sm text-red-500 mt-1">{{ sensorTypeFetchError }}</p>
        </div>

        <div>
          <label for="zoneId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Zona Asociada <span class="text-red-500">*</span></label>
          <select 
            id="zoneId" 
            v-model="form.zone_id" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="" disabled>Seleccione una zona</option>
            <option v-for="zone in availableZones" :key="zone._id" :value="zone._id">
              {{ zone.name }}
            </option>
          </select>
          <p v-if="zoneFetchError" class="text-sm text-red-500 mt-1">{{ zoneFetchError }}</p>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </div>

        <div class="pt-4 flex justify-end space-x-3">
          <button 
            type="button" 
            @click="closeModal" 
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
            :disabled="loading"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            :disabled="loading || !form.name || !form.sensor_IP || !form.sensor_type || !form.zone_id"
          >
            <span v-if="loading">Registrando...</span>
            <span v-else>Registrar Sensor</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const emit = defineEmits(['close', 'sensorCreated']);

const form = reactive({
  name: '',
  sensor_IP: '',
  sensor_type: '', // Changed from sensor_type_id, now required
  zone_id: '',     // Now required
});

const availableSensorTypes = ref([]);
const sensorTypeFetchError = ref('');
const availableZones = ref([]);
const zoneFetchError = ref('');

const loading = ref(false);
const errorMessage = ref('');

const closeModal = () => {
  if (!loading.value) {
    emit('close');
  }
};

const fetchSensorTypes = async () => {
  sensorTypeFetchError.value = '';
  try {
    const response = await $fetch('/api/get/sensor_type', { method: 'GET' });
    if (response.success && response.sensorTypes) {
      availableSensorTypes.value = response.sensorTypes;
    } else {
      sensorTypeFetchError.value = 'No se pudieron cargar los tipos de sensor.';
    }
  } catch (error) {
    console.error('Error fetching sensor types for modal:', error);
    sensorTypeFetchError.value = 'Error al cargar tipos de sensor. Intente de nuevo.';
  }
};

const fetchZones = async () => {
  zoneFetchError.value = '';
  try {
    const response = await $fetch('/api/get/zone', { method: 'GET' });
    if (response.success && response.zones) {
      availableZones.value = response.zones;
    } else {
      zoneFetchError.value = 'No se pudieron cargar las zonas.';
    }
  } catch (error) {
    console.error('Error fetching zones for modal:', error);
    zoneFetchError.value = 'Error al cargar zonas. Intente de nuevo.';
  }
};

onMounted(() => {
  fetchSensorTypes();
  fetchZones();
});

const handleSubmit = async () => {
  if (!form.name || !form.sensor_IP || !form.sensor_type || !form.zone_id) {
    errorMessage.value = 'Todos los campos son obligatorios.';
    return;
  }
  
  loading.value = true;
  errorMessage.value = '';

  const payload = { ...form }; // All fields are now required

  try {
    const response = await $fetch('/api/post/sensor', { 
      method: 'POST',
      body: payload
    });

    emit('sensorCreated', response.sensor); 
    closeModal();

  } catch (error) {
    console.error('Error al registrar sensor:', error);
    if (error.data && error.data.message) {
      errorMessage.value = error.data.message;
    } else {
      errorMessage.value = 'Ocurrió un error inesperado.';
    }
  } finally {
    loading.value = false;
  }
};
</script>