<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <div class="p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold flex items-center">
          <Icon name="mdi:source-branch" class="mr-2" /> Sucursales
        </h3>
        <span
          class="bg-white text-indigo-600 text-sm font-medium px-2.5 py-0.5 rounded-full"
        >
          {{ branches.length }}
        </span>
      </div>
    </div>

    <div class="flex-grow flex flex-col">
      <div v-if="loading" class="p-6 flex justify-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"
        ></div>
      </div>

      <div v-else-if="error" class="p-6 text-center text-red-500">
        <Icon name="mdi:alert-circle" size="32" class="mx-auto mb-2" />
        <p>{{ error }}</p>
      </div>

      <div
        v-else-if="branches.length === 0"
        class="p-6 text-center text-gray-500 dark:text-gray-400 flex-grow"
      >
        <Icon name="mdi:source-branch-off" size="32" class="mx-auto mb-2" />
        <p>No hay sucursales registradas</p>
      </div>

      <div
        v-else
        class="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-grow"
      >
      <div
        v-for="branch in branches"
        :key="branch._id"
        class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
      >
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white">
              {{ branch.name }}
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              <Icon name="mdi:map-marker" class="inline-block mr-1" />
              {{ branch.location || "Sin dirección" }}
            </p>
            <p v-if="branch.description" class="text-xs text-gray-400 mt-1">
              <Icon name="mdi:note-text-outline" class="inline-block mr-1" />
              {{ branch.description }}
            </p>
            <div class="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400 gap-3">
              <span class="flex items-center">
                <Icon :name="branch.isActive ? 'mdi:check-circle' : 'mdi:close-circle'" class="mr-1" :class="branch.isActive ? 'text-green-500' : 'text-red-500'" />
                {{ branch.isActive ? 'Activa' : 'Inactiva' }}
              </span>
              <span class="flex items-center">
                <Icon name="mdi:account-group" class="mr-1" />
                {{ branch.empleados?.length || 0 }} empleados
              </span>
              <span class="flex items-center">
                <Icon name="mdi:calendar-plus" class="mr-1" />
                {{ new Date(branch.createdAt).toLocaleDateString() }}
              </span>
              <span class="flex items-center">
                <Icon name="mdi:calendar-edit" class="mr-1" />
                {{ new Date(branch.updatedAt).toLocaleDateString() }}
              </span>
              <span v-if="branch.telefono" class="flex items-center">
                <Icon name="mdi:phone" class="mr-1" />
                {{ branch.telefono }}
              </span>
            </div>
          </div>

          <div class="flex space-x-1">
            <button
              @click="viewBranchDetails(branch._id)"
              class="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-500"
              title="Ver detalles"
            >
              <Icon name="mdi:eye" />
            </button>
            <button
              @click="editBranch(branch._id)"
              class="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-500"
              title="Editar sucursal"
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
        @click="$emit('create-branch')"
        class="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-500 dark:hover:text-indigo-400 font-medium"
      >
        <Icon name="mdi:source-branch-plus" class="inline-block mr-1" /> Crear
        nueva sucursal
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["create-branch"]);

const branches = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  await fetchBranches();
});

const fetchBranches = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch("/api/get/branch");
    if (!response.ok) {
      throw new Error("Error al cargar las sucursales");
    }
    const data = await response.json();
    branches.value = data.branches || [];
  } catch (err) {
    console.error("Error fetching branches:", err);
    error.value = "No se pudieron cargar las sucursales";
  } finally {
    loading.value = false;
  }
};

const viewBranchDetails = (branchId) => {
  router.push(`/settings/branches/${branchId}`);
};

const editBranch = (branchId) => {
  router.push(`/settings/branches/${branchId}/edit`);
};
</script>
