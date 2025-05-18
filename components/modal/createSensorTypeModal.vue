<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg mx-4">
      <div class="flex justify-between items-center pb-3 border-b dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Crear Nuevo Tipo de Sensor</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <Icon name="material-symbols:close-rounded" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
        <div>
          <label for="sensorTypeName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Tipo de Sensor <span class="text-red-500">*</span></label>
          <input 
            type="text" 
            id="sensorTypeName" 
            v-model="form.name" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Ej: Temperatura"
          />
        </div>

        <div>
          <label for="sensorTypeDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción (Opcional)</label>
          <textarea 
            id="sensorTypeDescription" 
            v-model="form.sensor_type_description" 
            rows="3"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Detalles del tipo de sensor"
          ></textarea>
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
            :disabled="loading || !form.name"
          >
            <span v-if="loading">Creando...</span>
            <span v-else>Crear Tipo de Sensor</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['close', 'sensorTypeCreated']);

const form = reactive({
  name: '',
  sensor_type_description: ''
});

const loading = ref(false);
const errorMessage = ref('');

const closeModal = () => {
  if (!loading.value) {
    emit('close');
  }
};

const handleSubmit = async () => {
  if (!form.name) {
    errorMessage.value = 'El nombre del tipo de sensor es obligatorio.';
    return;
  }
  
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await $fetch('/api/post/sensor_type', { 
      method: 'POST',
      body: {
        name: form.name,
        sensor_type_description: form.sensor_type_description
      }
    });

    emit('sensorTypeCreated', response.sensorType); 
    closeModal();

  } catch (error) {
    console.error('Error al crear tipo de sensor:', error);
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