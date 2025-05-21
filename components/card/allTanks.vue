<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <div class="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold flex items-center">
          <Icon name="mdi:fish" class="mr-2" /> Estanques
        </h3>
        <span class="bg-white text-blue-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {{ tanks.length }}
        </span>
      </div>
    </div>
    
    <div class="flex-grow flex flex-col">
      <div v-if="loading" class="p-6 flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else-if="error" class="p-6 text-center text-red-500">
        <Icon name="mdi:alert-circle" size="32" class="mx-auto mb-2" />
        <p>{{ error }}</p>
      </div>
      
      <div v-else-if="tanks.length === 0" class="p-6 text-center text-gray-500 dark:text-gray-400 flex-grow">
        <Icon name="mdi:fish-off" size="32" class="mx-auto mb-2" />
        <p>No hay estanques registrados</p>
      </div>
      
      <div v-else class="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-grow">
      <div v-for="tank in tanks" :key="tank._id" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center">
              <h4 class="font-medium text-gray-900 dark:text-white">{{ tank.nombre }}</h4>
              <span 
                :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': tank.estado === 'activo',
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': tank.estado === 'inactivo',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': tank.estado === 'mantenimiento'
                }"
                class="text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full"
              >
                {{ tank.estado }}
              </span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              <Icon name="mdi:map-marker" class="inline-block mr-1" />
              {{ tank.ubicación?.dirección || 'Sin dirección' }}
              <span v-if="tank.ubicación?.latitud && tank.ubicación?.longitud">
                ({{ tank.ubicación.latitud }}, {{ tank.ubicación.longitud }})
              </span>
            </p>
            <div class="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span class="flex items-center">
                <Icon name="mdi:water" class="mr-1" />
                {{ tank.capacidad }} litros
              </span>
              <span class="flex items-center">
                <Icon name="mdi:shape" class="mr-1" />
                {{ tank.tipo }}
              </span>
              <span class="flex items-center">
                <Icon name="mdi:material-design" class="mr-1" />
                {{ tank.material }}
              </span>
              <span class="flex items-center" v-if="tank.sensores && tank.sensores.length">
                <Icon name="mdi:chip" class="mr-1" />
                Sensores: {{ tank.sensores.join(', ') }}
              </span>
              <span class="flex items-center" v-if="tank.especies && tank.especies.length">
                <Icon name="mdi:fish" class="mr-1" />
                Especies: {{ tank.especies.join(', ') }}
              </span>
              <span class="flex items-center" v-if="tank.población">
                <Icon name="mdi:counter" class="mr-1" />
                {{ tank.población.total_peces }} peces / {{ tank.población.biomasa_kg }} kg
              </span>
              <span class="flex items-center" v-if="tank.condiciones">
                <Icon name="mdi:thermometer" class="mr-1" />
                {{ tank.condiciones.temperatura_c }} °C
                <span v-if="tank.condiciones.ph">/ pH: {{ tank.condiciones.ph }}</span>
                <span v-if="tank.condiciones.oxígeno">/ O₂: {{ tank.condiciones.oxígeno }} mg/L</span>
              </span>
              <span class="flex items-center" v-if="tank.fecha_creación">
                <Icon name="mdi:calendar-plus" class="mr-1" />
                {{ new Date(tank.fecha_creación).toLocaleDateString() }}
              </span>
              <span class="flex items-center" v-if="tank.última_inspección">
                <Icon name="mdi:calendar-check" class="mr-1" />
                Últ. inspección: {{ new Date(tank.última_inspección).toLocaleDateString() }}
              </span>
              <span class="flex items-center" v-if="tank.createdAt">
                <Icon name="mdi:calendar" class="mr-1" />
                Creado: {{ new Date(tank.createdAt).toLocaleDateString() }}
              </span>
              <span class="flex items-center" v-if="tank.updatedAt">
                <Icon name="mdi:calendar-edit" class="mr-1" />
                Modificado: {{ new Date(tank.updatedAt).toLocaleDateString() }}
              </span>
              <span class="flex items-center" v-if="tank.branch_id">
                <Icon name="mdi:source-branch" class="mr-1" />
                Sucursal: {{ tank.branch_id.name || tank.branch_id }}
              </span>
              <span class="flex items-center" v-if="tank.zone_id">
                <Icon name="mdi:map" class="mr-1" />
                Zona: {{ tank.zone_id.name || tank.zone_id }}
              </span>
            </div>
          </div>
          
          <div class="flex space-x-1">
            <button 
              @click="viewTankDetails(tank._id)"
              class="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
              title="Ver detalles"
            >
              <Icon name="mdi:eye" />
            </button>
            <button 
              @click="editTank(tank._id)"
              class="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
              title="Editar estanque"
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
        @click="$emit('create-tank')"
        class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-medium"
      >
        <Icon name="mdi:plus" class="inline-block mr-1" /> Crear nuevo estanque
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['create-tank']);

const tanks = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  await fetchTanks();
});

const fetchTanks = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch('/api/get/tank');
    if (!response.ok) {
      throw new Error('Error al cargar los estanques');
    }
    const data = await response.json();
    tanks.value = data.tanks || [];
  } catch (err) {
    console.error('Error fetching tanks:', err);
    error.value = 'No se pudieron cargar los estanques';
  } finally {
    loading.value = false;
  }
};

const viewTankDetails = (tankId) => {
  router.push(`/settings/tanks/${tankId}`);
};

const editTank = (tankId) => {
  router.push(`/settings/tanks/${tankId}/edit`);
};
</script>