<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <div class="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold flex items-center">
          <Icon name="mdi:account-group" class="mr-2" /> Usuarios
        </h3>
        <span class="bg-white text-purple-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {{ users.length }}
        </span>
      </div>
    </div>
    
    <div class="flex-grow flex flex-col">
      <div v-if="loading" class="p-6 flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
      
      <div v-else-if="error" class="p-6 text-center text-red-500">
        <Icon name="mdi:alert-circle" size="32" class="mx-auto mb-2" />
        <p>{{ error }}</p>
      </div>
      
      <div v-else-if="users.length === 0" class="p-6 text-center text-gray-500 dark:text-gray-400 flex-grow">
        <Icon name="mdi:account-off" size="32" class="mx-auto mb-2" />
        <p>No hay usuarios registrados</p>
      </div>
      
      <div v-else class="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-grow">
      <div v-for="user in users" :key="user._id" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
        <div class="flex justify-between items-start">
          <div class="flex items-start">
            <div class="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
              <span v-if="user.avatar" class="sr-only">{{ user.nombre }}</span>
              <img v-if="user.avatar" :src="user.avatar" :alt="user.nombre" class="h-10 w-10 rounded-full object-cover" />
              <span v-else>{{ getUserInitials(user) }}</span>
            </div>
            
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">{{ user.name }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ user.email }}
              </p>
              <p v-if="user.user_description" class="text-xs text-gray-400 mt-1">
                <Icon name="mdi:note-text-outline" class="inline-block mr-1" />
                {{ user.user_description }}
              </p>
              <div class="flex items-center mt-1 flex-wrap gap-2">
                <span 
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': user.role === 'administrador',
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': user.role === 'supervisor'
                  }"
                  class="text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {{ user.role }}
                </span>
                <span 
                  v-if="user.isActive !== undefined"
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': user.isActive,
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': !user.isActive
                  }"
                  class="text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full"
                >
                  {{ user.isActive ? 'Activo' : 'Inactivo' }}
                </span>
                <span v-if="user.lastLogin" class="flex items-center">
                  <Icon name="mdi:clock-outline" class="mr-1" />
                  Último acceso: {{ new Date(user.lastLogin).toLocaleString() }}
                </span>
                <span v-if="user.createdAt" class="flex items-center">
                  <Icon name="mdi:calendar" class="mr-1" />
                  Creado: {{ new Date(user.createdAt).toLocaleDateString() }}
                </span>
                <span v-if="user.updatedAt" class="flex items-center">
                  <Icon name="mdi:calendar-edit" class="mr-1" />
                  Modificado: {{ new Date(user.updatedAt).toLocaleDateString() }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="flex space-x-1">
            <button 
              @click="viewUserDetails(user._id)"
              class="p-1 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
              title="Ver detalles"
            >
              <Icon name="mdi:eye" />
            </button>
            <button 
              @click="editUser(user._id)"
              class="p-1 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500"
              title="Editar usuario"
            >
              <Icon name="mdi:pencil" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    <div class="p-3 bg-gray-50 dark:bg-gray-900 flex justify-end items-center h-14 mt-auto">
      <button 
        @click="$emit('create-user')"
        class="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-500 dark:hover:text-purple-400 font-medium"
      >
        <Icon name="mdi:account-plus" class="inline-block mr-1" /> Crear nuevo usuario
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['create-user']);

const users = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  await fetchUsers();
});

const fetchUsers = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch('/api/get/user');
    if (!response.ok) {
      throw new Error('Error al cargar los usuarios');
    }
    const data = await response.json();
    users.value = data.users || [];
  } catch (err) {
    console.error('Error fetching users:', err);
    error.value = 'No se pudieron cargar los usuarios';
  } finally {
    loading.value = false;
  }
};

const getUserInitials = (user) => {
  if (!user || (!user.nombre && !user.apellido)) return '?';
  
  const nombre = user.nombre || '';
  const apellido = user.apellido || '';
  
  return (nombre.charAt(0) + (apellido.charAt(0) || '')).toUpperCase();
};

const viewUserDetails = (userId) => {
  router.push(`/settings/users/${userId}`);
};

const editUser = (userId) => {
  router.push(`/settings/users/${userId}/edit`);
};
</script>