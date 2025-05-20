<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
      Panel de Control
    </h1>
    <p class="mb-8 text-gray-600 dark:text-gray-400">
      En este panel puedes gestionar las entidades principales de la aplicación.
    </p>

    <!-- Sección de Gestión General -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Gestión de Sucursales
      </h2>
      <div class="flex flex-wrap gap-4">
        <button
         
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
          @click="openCreateBranchModal"
        >
          <Icon name="mdi:source-branch-plus" class="mr-2" /> Crear Sucursal
        </button>
      </div>
    </section>

    <!-- Sección de Gestión de Tipos -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Gestión de Tipos
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          @click="openCreateCameraTypeModal"
          class="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
        >
          <Icon name="mdi:camera-plus-outline" class="mr-2" /> Crear Tipo de
          Cámara
        </button>
        <button
          @click="openCreateSensorTypeModal"
          class="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
        >
          <Icon name="mdi:leak" class="mr-2" /> Crear Tipo de Sensor
        </button>
      </div>
    </section>

    <!-- Sección de Gestión de Entidades -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Gestión de Entidades Operativas
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          @click="openCreateZoneModal"
          class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
        >
          <Icon name="mdi:map-marker-plus-outline" class="mr-2" /> Crear Zona
        </button>
        <button
          @click="openCreateCameraModal"
          class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
        >
          <Icon name="mdi:cctv" class="mr-2" /> Registrar Cámara
        </button>
        <button
          @click="openCreateSensorModal"
          class="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
        >
          <Icon name="mdi:resistor-nodes" class="mr-2" /> Registrar Sensor
        </button>
      </div>
    </section>
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
</template>

<script>
import { defineComponent } from "vue";
import { definePageMeta } from "#imports";
import createBranchModal from "~/components/modal/createBranchModal.vue";
import createCameraTypeModal from "~/components/modal/createCameraTypeModal.vue";
import createSensorTypeModal from "~/components/modal/createSensorTypeModal.vue";
import createZoneModal from "~/components/modal/createZoneModal.vue";
import createCameraModal from "~/components/modal/createCameraModal.vue";
import createSensorModal from "~/components/modal/createSensorModal.vue";

definePageMeta({
  middleware: ["auth", "admin"],
});

export default defineComponent({
  name: "ControlPanel",
  components: {
    createBranchModal,
    createCameraTypeModal,
    createSensorTypeModal,
    createZoneModal,
    createCameraModal,
    createSensorModal,
  },
  data() {
    return {
      isCreateBranchModalOpen: false,
      isCreateCameraTypeModalOpen: false,
      isCreateSensorTypeModalOpen: false,
      isCreateZoneModalOpen: false,
      isCreateCameraModalOpen: false,
      isCreateSensorModalOpen: false,
    };
  },
  methods: {
    // Branch Modal
    openCreateBranchModal() {
      this.isCreateBranchModalOpen = true;
    },
    closeCreateBranchModal() {
      this.isCreateBranchModalOpen = false;
    },
    handleBranchCreated(newBranch) {
      console.log("Sucursal creada:", newBranch);
      // Aquí podrías, por ejemplo, refrescar una lista o mostrar notificación
      this.closeCreateBranchModal();
    },

    // Camera Type Modal
    openCreateCameraTypeModal() {
      this.isCreateCameraTypeModalOpen = true;
    },
    closeCreateCameraTypeModal() {
      this.isCreateCameraTypeModalOpen = false;
    },
    handleCameraTypeCreated(newCameraType) {
      console.log("Tipo de Cámara creado:", newCameraType);
      this.closeCreateCameraTypeModal();
    },

    // Sensor Type Modal
    openCreateSensorTypeModal() {
      this.isCreateSensorTypeModalOpen = true;
    },
    closeCreateSensorTypeModal() {
      this.isCreateSensorTypeModalOpen = false;
    },
    handleSensorTypeCreated(newSensorType) {
      console.log("Tipo de Sensor creado:", newSensorType);
      this.closeCreateSensorTypeModal();
    },

    // Zone Modal
    openCreateZoneModal() {
      this.isCreateZoneModalOpen = true;
    },
    closeCreateZoneModal() {
      this.isCreateZoneModalOpen = false;
    },
    handleZoneCreated(newZone) {
      console.log("Zona creada:", newZone);
      this.closeCreateZoneModal();
    },

    // Camera Modal
    openCreateCameraModal() {
      this.isCreateCameraModalOpen = true;
    },
    closeCreateCameraModal() {
      this.isCreateCameraModalOpen = false;
    },
    handleCameraCreated(newCamera) {
      console.log("Cámara registrada:", newCamera);
      this.closeCreateCameraModal();
    },

    // Sensor Modal
    openCreateSensorModal() {
      this.isCreateSensorModalOpen = true;
    },
    closeCreateSensorModal() {
      this.isCreateSensorModalOpen = false;
    },
    handleSensorCreated(newSensor) {
      console.log("Sensor registrado:", newSensor);
      this.closeCreateSensorModal();
    },
  },
});
</script>

<style scoped>
/* Puedes agregar estilos específicos si es necesario */
.container {
  max-width: 1200px;
}
</style>
