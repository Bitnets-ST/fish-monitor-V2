<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <div class="p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold flex items-center">
          <Icon name="mdi:map-marker-multiple" class="mr-2" /> Zonas
        </h3>
        <span class="bg-white text-amber-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {{ zones.length }}
        </span>
      </div>
    </div>
    
    <div class="flex-grow flex flex-col">
      <div v-if="loading" class="p-6 flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
      
      <div v-else-if="error" class="p-6 text-center text-red-500">
        <Icon name="mdi:alert-circle" size="32" class="mx-auto mb-2" />
        <p>{{ error }}</p>
      </div>
      
      <div v-else-if="zones.length === 0" class="p-6 text-center text-gray-500 dark:text-gray-400 flex-grow">
        <Icon name="mdi:map-marker-off" size="32" class="mx-auto mb-2" />
        <p>No hay zonas registradas</p>
      </div>
      
      <div v-else class="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-grow">
      <div v-for="zone in zones" :key="zone._id" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white">{{ zone.name }}</h4>
            <p v-if="zone.zone_direction" class="text-xs text-gray-400 mt-1">
              <Icon name="mdi:map-marker" class="inline-block mr-1" />
              {{ zone.zone_direction }}
            </p>
            <p v-if="zone.zone_description" class="text-xs text-gray-400 mt-1">
              <Icon name="mdi:note-text-outline" class="inline-block mr-1" />
              {{ zone.zone_description }}
            </p>
            <div class="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span class="flex items-center" v-if="zone.zone_manager">
                <Icon name="mdi:account-tie" class="mr-1" />
                Encargado: {{ zone.zone_manager }}
              </span>
              <span class="flex items-center" v-if="zone.branch_id">
                <Icon name="mdi:source-branch" class="mr-1" />
                Sucursal: {{ zone.branch_id.name || zone.branch_id }}
              </span>
              <span class="flex items-center" v-if="zone.createdAt">
                <Icon name="mdi:calendar" class="mr-1" />
                Creado: {{ new Date(zone.createdAt).toLocaleDateString() }}
              </span>
              <span class="flex items-center" v-if="zone.updatedAt">
                <Icon name="mdi:calendar-edit" class="mr-1" />
                Modificado: {{ new Date(zone.updatedAt).toLocaleDateString() }}
              </span>
            </div>
          </div>
          
          <div class="flex space-x-1">
            <button 
              @click="viewZoneDetails(zone._id)"
              class="p-1 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-500"
              title="Ver detalles"
            >
              <Icon name="mdi:eye" />
            </button>
            <button 
              @click="editZone(zone._id)"
              class="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
              title="Editar zona"
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
        @click="$emit('create-zone')"
        class="text-sm text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 font-medium"
      >
        <Icon name="mdi:plus" class="inline-block mr-1" /> Crear nueva zona
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['create-zone']);

const zones = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  await fetchZones();
});

const fetchZones = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch('/api/get/zone');
    if (!response.ok) {
      throw new Error('Error al cargar las zonas');
    }
    const data = await response.json();
    zones.value = data.zones || [];
  } catch (err) {
    console.error('Error fetching zones:', err);
    error.value = 'No se pudieron cargar las zonas';
  } finally {
    loading.value = false;
  }
};

const viewZoneDetails = (zoneId) => {
  router.push(`/settings/zones/${zoneId}`);
};

const editZone = (zoneId) => {
  router.push(`/settings/zones/${zoneId}/edit`);
};
</script>