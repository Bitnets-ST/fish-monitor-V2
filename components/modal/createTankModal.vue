<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
          Crear Nuevo Estanque
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Icon name="mdi:close" size="24" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Información básica -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
            Información Básica
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre del Estanque*
              </label>
              <input
                v-model="formData.nombre"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ej: Estanque Principal"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Zona*
              </label>
              <select
                v-model="formData.zone_id"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="" disabled selected>Seleccionar zona</option>
                <option v-for="zone in zones" :key="zone._id" :value="zone._id">
                  {{ zone.name }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Capacidad (litros)*
              </label>
              <input
                v-model.number="formData.capacidad"
                type="number"
                required
                min="0"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ej: 5000"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo*
              </label>
              <select
                v-model="formData.tipo"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="" disabled selected>Seleccionar tipo</option>
                <option value="circular">Circular</option>
                <option value="rectangular">Rectangular</option>
                <option value="irregular">Irregular</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Material*
              </label>
              <select
                v-model="formData.material"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="" disabled selected>Seleccionar material</option>
                <option value="fibra de vidrio">Fibra de vidrio</option>
                <option value="concreto">Concreto</option>
                <option value="plástico">Plástico</option>
                <option value="acero">Acero</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Ubicación -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
            Ubicación
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Latitud*
              </label>
              <input
                v-model.number="formData.ubicación.latitud"
                type="number"
                required
                step="0.000001"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ej: -33.456789"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Longitud*
              </label>
              <input
                v-model.number="formData.ubicación.longitud"
                type="number"
                required
                step="0.000001"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ej: -70.123456"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Dirección*
            </label>
            <input
              v-model="formData.ubicación.dirección"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Ej: Av. Principal 123, Ciudad"
            />
          </div>
        </div>

        <!-- Estado y Especies -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Estado
            </label>
            <select
              v-model="formData.estado"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Especies
            </label>
            <div class="flex flex-wrap gap-2 items-center">
              <div v-for="(especie, index) in formData.especies" :key="index" class="flex items-center">
                <input
                  v-model="formData.especies[index]"
                  type="text"
                  class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Nombre de especie"
                />
                <button 
                  type="button" 
                  @click="removeEspecie(index)"
                  class="ml-1 text-red-500 hover:text-red-700"
                >
                  <Icon name="mdi:close-circle" />
                </button>
              </div>
              <button 
                type="button" 
                @click="addEspecie" 
                class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
              >
                <Icon name="mdi:plus" /> Añadir
              </button>
            </div>
          </div>
        </div>

        <!-- Sensores -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sensores
          </label>
          <div class="flex flex-wrap gap-2">
            <div v-for="sensor in availableSensors" :key="sensor._id" class="flex items-center">
              <input
                type="checkbox"
                :id="sensor._id"
                :value="sensor._id"
                v-model="formData.sensores"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label :for="sensor._id" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {{ sensor.nombre }}
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">
              <Icon name="mdi:loading" class="animate-spin" /> Guardando...
            </span>
            <span v-else>Crear Estanque</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const emit = defineEmits(["close", "tank-created"]);

const zones = ref([]);
const availableSensors = ref([]);
const isSubmitting = ref(false);

const formData = reactive({
  nombre: "",
  ubicación: {
    latitud: null,
    longitud: null,
    dirección: "",
  },
  capacidad: null,
  tipo: "",
  material: "",
  sensores: [],
  estado: "activo",
  especies: [],
  zone_id: "",
  fecha_creación: new Date(),
});

onMounted(async () => {
  try {
    // Cargar zonas
    const zonesResponse = await fetch("/api/get/zone");
    if (!zonesResponse.ok) throw new Error("Error al cargar zonas");
    const zonesData = await zonesResponse.json();
    zones.value = zonesData.zones || [];

    // Cargar sensores
    const sensorsResponse = await fetch("/api/get/sensor");
    if (!sensorsResponse.ok) throw new Error("Error al cargar sensores");
    const sensorsData = await sensorsResponse.json();
    availableSensors.value = sensorsData.sensors || [];
  } catch (error) {
    console.error("Error al cargar datos:", error);
    toast.error("Error al cargar datos necesarios");
  }
});

const addEspecie = () => {
  formData.especies.push("");
};

const removeEspecie = (index) => {
  formData.especies.splice(index, 1);
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    
    // Filtrar especies vacías
    formData.especies = formData.especies.filter(e => e.trim() !== "");
    
    const response = await fetch("/api/post/tank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear el estanque");
    }

    const newTank = await response.json();
    toast.success("Estanque creado exitosamente");
    emit("tank-created", newTank);
  } catch (error) {
    console.error("Error al crear estanque:", error);
    toast.error(error.message || "Error al crear el estanque");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
