<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg mx-4">
      <div class="flex justify-between items-center pb-3 border-b dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Crear Nueva Zona</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <Icon name="material-symbols:close-rounded" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
        <div>
          <label for="zoneName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de la Zona <span class="text-red-500">*</span></label>
          <input 
            type="text" 
            id="zoneName" 
            v-model="form.name" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Ej: Zona de Procesamiento"
          />
        </div>

        <div>
          <label for="branchId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sucursal Asociada <span class="text-red-500">*</span></label>
          <select 
            id="branchId" 
            v-model="form.branch_id" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="" disabled>Seleccione una sucursal</option>
            <option v-for="branch in availableBranches" :key="branch._id" :value="branch._id">
              {{ branch.name }}
            </option>
          </select>
          <p v-if="branchFetchError" class="text-sm text-red-500 mt-1">{{ branchFetchError }}</p>
        </div>

        <div>
          <label for="zoneManager" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Encargado de Zona <span class="text-red-500">*</span></label>
          <select 
            id="zoneManager" 
            v-model="form.zone_manager"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="" disabled>Seleccione un encargado</option>
            <option v-for="user in availableUsers" :key="user._id" :value="user._id">
              {{ user.name }}
            </option>
          </select>
          <p v-if="userFetchError" class="text-sm text-red-500 mt-1">{{ userFetchError }}</p>
        </div>

        <div>
          <label for="zoneDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción (Opcional)</label>
          <textarea 
            id="zoneDescription" 
            v-model="form.zone_description" 
            rows="2"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Propósito o detalles de la zona"
          ></textarea>
        </div>
        
        <div>
          <label for="zoneDirection" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dirección/Ubicación Específica (Opcional)</label>
          <input 
            type="text" 
            id="zoneDirection" 
            v-model="form.zone_direction"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Ej: Edificio B, Nivel 3"
          />
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
            :disabled="loading || !form.name || !form.branch_id || !form.zone_manager"
          >
            <span v-if="loading">Creando...</span>
            <span v-else>Crear Zona</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const emit = defineEmits(['close', 'zoneCreated']);

const form = reactive({
  name: '',
  branch_id: '',
  zone_description: '',
  zone_manager: '', 
  zone_direction: '',
});

const availableBranches = ref([]);
const branchFetchError = ref('');
const availableUsers = ref([]);
const userFetchError = ref('');
const loading = ref(false);
const errorMessage = ref('');

const closeModal = () => {
  if (!loading.value) {
    emit('close');
  }
};

const fetchBranches = async () => {
  branchFetchError.value = '';
  try {
    const response = await $fetch('/api/get/branch', { method: 'GET' });
    if (response.success && response.branches) {
      availableBranches.value = response.branches;
    } else {
      branchFetchError.value = 'No se pudieron cargar las sucursales.';
    }
  } catch (error) {
    console.error('Error fetching branches for modal:', error);
    branchFetchError.value = 'Error al cargar sucursales. Intente de nuevo.';
  }
};

const fetchUsers = async () => {
  userFetchError.value = '';
  try {
    const response = await $fetch('/api/get/user', { method: 'GET' });
    if (response.success && response.users) {
      availableUsers.value = response.users;
    } else {
      userFetchError.value = 'No se pudieron cargar los usuarios.';
    }
  } catch (error) {
    console.error('Error fetching users for modal:', error);
    userFetchError.value = 'Error al cargar usuarios. Intente de nuevo.';
  }
};

onMounted(() => {
  fetchBranches();
  fetchUsers();
});

const handleSubmit = async () => {
  if (!form.name || !form.branch_id || !form.zone_manager) {
    errorMessage.value = 'Nombre de zona, sucursal y encargado son obligatorios.';
    return;
  }
  
  loading.value = true;
  errorMessage.value = '';

  const payload = { ...form };

  try {
    const response = await $fetch('/api/post/zone', { 
      method: 'POST',
      body: payload
    });

    emit('zoneCreated', response.zone); 
    closeModal();

  } catch (error) {
    console.error('Error al crear zona:', error);
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