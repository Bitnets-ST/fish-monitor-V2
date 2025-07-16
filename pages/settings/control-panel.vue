<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
      Panel de Control
    </h1>
    <p class="mb-6 text-gray-600 dark:text-gray-400">
      En este panel puedes gestionar las entidades principales de la aplicación.
    </p>

    <!-- Accesos Directos / Quick Actions -->
    <section class="mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
        <h2 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center">
          <Icon name="mdi:lightning-bolt" class="mr-2 text-yellow-500" /> Accesos Directos
        </h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <!-- Sucursal -->
          <button
            @click="openCreateBranchModal"
            class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group"
          >
            <div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-2 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
              <Icon name="mdi:source-branch-plus" class="text-indigo-600 dark:text-indigo-400 text-2xl" />
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">Sucursal</span>
          </button>
          
          <!-- Zona -->
          <button
            @click="openCreateZoneModal"
            class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group"
          >
            <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-2 group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors">
              <Icon name="mdi:map-marker-plus-outline" class="text-amber-600 dark:text-amber-400 text-2xl" />
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">Zona</span>
          </button>
          
          <!-- Estanque -->
          <button
            @click="openCreateTankModal"
            class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group"
          >
            <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
              <Icon name="mdi:fish" class="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Estanque</span>
          </button>
          
          <!-- Cámara -->
          <button
            @click="openCreateCameraModal"
            class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group"
          >
            <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-2 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
              <Icon name="mdi:cctv" class="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">Cámara</span>
          </button>
          
          <!-- Sensor -->
          <button
            @click="openCreateSensorModal"
            class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-900/30 dark:to-lime-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group"
          >
            <div class="w-12 h-12 rounded-full bg-lime-100 dark:bg-lime-900/50 flex items-center justify-center mb-2 group-hover:bg-lime-200 dark:group-hover:bg-lime-800/50 transition-colors">
              <Icon name="mdi:resistor-nodes" class="text-lime-600 dark:text-lime-400 text-2xl" />
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-lime-700 dark:group-hover:text-lime-300 transition-colors">Sensor</span>
          </button>
          
          <!-- Tipo de Cámara -->
          <button
            @click="openCreateCameraTypeModal"
            class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group"
          >
            <div class="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center mb-2 group-hover:bg-sky-200 dark:group-hover:bg-sky-800/50 transition-colors">
              <Icon name="mdi:camera-plus-outline" class="text-sky-600 dark:text-sky-400 text-2xl" />
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">Tipo Cámara</span>
          </button>
          
          <!-- Tipo de Sensor -->
          <button
            @click="openCreateSensorTypeModal"
            class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group"
          >
            <div class="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mb-2 group-hover:bg-teal-200 dark:group-hover:bg-teal-800/50 transition-colors">
              <Icon name="mdi:leak" class="text-teal-600 dark:text-teal-400 text-2xl" />
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">Tipo Sensor</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Filtros -->
    <div class="mb-6 flex flex-wrap gap-2">
      <button 
        @click="activeFilter = 'all'"
        :class="{
          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200': activeFilter === 'all',
          'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700': activeFilter !== 'all'
        }"
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        <Icon name="mdi:view-dashboard" class="mr-1" /> Todos
      </button>
      
      <button 
        @click="activeFilter = 'branches'"
        :class="{
          'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200': activeFilter === 'branches',
          'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700': activeFilter !== 'branches'
        }"
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        <Icon name="mdi:source-branch" class="mr-1" /> Sucursales
      </button>
      
      <button 
        @click="activeFilter = 'zones'"
        :class="{
          'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200': activeFilter === 'zones',
          'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700': activeFilter !== 'zones'
        }"
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        <Icon name="mdi:map-marker-multiple" class="mr-1" /> Zonas
      </button>
      
      <button 
        @click="activeFilter = 'tanks'"
        :class="{
          'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200': activeFilter === 'tanks',
          'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700': activeFilter !== 'tanks'
        }"
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        <Icon name="mdi:fish" class="mr-1" /> Estanques
      </button>
      
      <button 
        @click="activeFilter = 'users'"
        :class="{
          'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200': activeFilter === 'users',
          'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700': activeFilter !== 'users'
        }"
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        <Icon name="mdi:account-group" class="mr-1" /> Usuarios
      </button>
    </div>

    <!-- Contenido principal -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
      <!-- Sucursales -->
      <AllBranches 
        v-if="activeFilter === 'all' || activeFilter === 'branches'"
        @create-branch="openCreateBranchModal" 
      />
      
      <!-- Zonas -->
      <allZone 
        v-if="activeFilter === 'all' || activeFilter === 'zones'"
        @create-zone="openCreateZoneModal" 
      />
      
      <!-- Estanques -->
      <allTanks 
        v-if="activeFilter === 'all' || activeFilter === 'tanks'"
        @create-tank="openCreateTankModal" 
      />
      
      <!-- Usuarios -->
      <allUsers 
        v-if="activeFilter === 'all' || activeFilter === 'users'"
        @create-user="openCreateUserModal" 
      />
    </div>
  </div>

  <!-- Modales -->
  <createBranchModal
    v-if="isCreateBranchModalOpen"
    @close="closeCreateBranchModal"
    @branchCreated="handleBranchCreated"
  />
  <createCameraTypeModal
    v-if="isCreateCameraTypeModalOpen"
    @close="closeCreateCameraTypeModal"
    @cameraTypeCreated="handleCameraTypeCreated"
  />
  <createSensorTypeModal
    v-if="isCreateSensorTypeModalOpen"
    @close="closeCreateSensorTypeModal"
    @sensorTypeCreated="handleSensorTypeCreated"
  />
  <createZoneModal
    v-if="isCreateZoneModalOpen"
    @close="closeCreateZoneModal"
    @zone-created="handleZoneCreated"
  />
  <createCameraModal
    v-if="isCreateCameraModalOpen"
    @close="closeCreateCameraModal"
    @camera-created="handleCameraCreated"
  />
  <createSensorModal
    v-if="isCreateSensorModalOpen"
    @close="closeCreateSensorModal"
    @sensor-created="handleSensorCreated"
  />
  <createTankModal
    v-if="isCreateTankModalOpen"
    @close="closeCreateTankModal"
    @tank-created="handleTankCreated"
  />
</template>

<script setup>
import { ref } from "vue";
import { definePageMeta } from "#imports";
import createBranchModal from "~/components/modal/createBranchModal.vue";
import createCameraTypeModal from "~/components/modal/createCameraTypeModal.vue";
import createSensorTypeModal from "~/components/modal/createSensorTypeModal.vue";
import createZoneModal from "~/components/modal/createZoneModal.vue";
import createCameraModal from "~/components/modal/createCameraModal.vue";
import createSensorModal from "~/components/modal/createSensorModal.vue";
import createTankModal from "~/components/modal/createTankModal.vue";
import AllBranches from "~/components/card/allBranches.vue";
import allZone from "~/components/card/allZone.vue";
import allTanks from "~/components/card/allTanks.vue";
import allUsers from "~/components/card/allUsers.vue";

definePageMeta({
  // Removed authentication middleware
});

// Filtro activo
const activeFilter = ref('all');

// Estados de modales
const isCreateBranchModalOpen = ref(false);
const isCreateCameraTypeModalOpen = ref(false);
const isCreateSensorTypeModalOpen = ref(false);
const isCreateZoneModalOpen = ref(false);
const isCreateCameraModalOpen = ref(false);
const isCreateSensorModalOpen = ref(false);
const isCreateTankModalOpen = ref(false);
const isCreateUserModalOpen = ref(false);

// Branch Modal
const openCreateBranchModal = () => {
  isCreateBranchModalOpen.value = true;
};
const closeCreateBranchModal = () => {
  isCreateBranchModalOpen.value = false;
};
const handleBranchCreated = (newBranch) => {
  console.log("Sucursal creada:", newBranch);
  closeCreateBranchModal();
};

// Camera Type Modal
const openCreateCameraTypeModal = () => {
  isCreateCameraTypeModalOpen.value = true;
};
const closeCreateCameraTypeModal = () => {
  isCreateCameraTypeModalOpen.value = false;
};
const handleCameraTypeCreated = (newCameraType) => {
  console.log("Tipo de Cámara creado:", newCameraType);
  closeCreateCameraTypeModal();
};

// Sensor Type Modal
const openCreateSensorTypeModal = () => {
  isCreateSensorTypeModalOpen.value = true;
};
const closeCreateSensorTypeModal = () => {
  isCreateSensorTypeModalOpen.value = false;
};
const handleSensorTypeCreated = (newSensorType) => {
  console.log("Tipo de Sensor creado:", newSensorType);
  closeCreateSensorTypeModal();
};

// Zone Modal
const openCreateZoneModal = () => {
  isCreateZoneModalOpen.value = true;
};
const closeCreateZoneModal = () => {
  isCreateZoneModalOpen.value = false;
};
const handleZoneCreated = (newZone) => {
  console.log("Zona creada:", newZone);
  closeCreateZoneModal();
};

// Camera Modal
const openCreateCameraModal = () => {
  isCreateCameraModalOpen.value = true;
};
const closeCreateCameraModal = () => {
  isCreateCameraModalOpen.value = false;
};
const handleCameraCreated = (newCamera) => {
  console.log("Cámara registrada:", newCamera);
  closeCreateCameraModal();
};

// Sensor Modal
const openCreateSensorModal = () => {
  isCreateSensorModalOpen.value = true;
};
const closeCreateSensorModal = () => {
  isCreateSensorModalOpen.value = false;
};
const handleSensorCreated = (newSensor) => {
  console.log("Sensor registrado:", newSensor);
  closeCreateSensorModal();
};

// Tank Modal
const openCreateTankModal = () => {
  isCreateTankModalOpen.value = true;
};
const closeCreateTankModal = () => {
  isCreateTankModalOpen.value = false;
};
const handleTankCreated = (newTank) => {
  console.log("Estanque creado:", newTank);
  closeCreateTankModal();
};

// User Modal (placeholder para futuras implementaciones)
const openCreateUserModal = () => {
  // Implementación pendiente
  console.log("Abrir modal de creación de usuario");
};
</script>

<style scoped>
/* Puedes agregar estilos específicos si es necesario */
.container {
  max-width: 1200px;
}
</style>
