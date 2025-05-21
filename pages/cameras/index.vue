<template>
  <div class="camera-page-container">
    <!-- Optional: Add a background element if desired -->
    <!-- <div class="background-element"></div> -->

    <div class="camera-content-wrapper">
      <h2 class="page-title mb-6">Lista de Cámaras</h2>
      <div v-if="loading" class="text-center text-gray-500">Cargando cámaras...</div>
      <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
      <div v-else-if="cameras.length === 0" class="text-center text-gray-500">No hay cámaras registradas.</div>
      <div v-else class="camera-grid">
        <div v-for="camera in cameras" :key="camera._id" class="camera-card">
          <div class="camera-placeholder">
            <Icon name="mdi:camera" size="48" class="text-gray-400" />
            <!-- In a real application, this would be the video feed -->
          </div>
          <div class="camera-info">
            <h3 class="camera-name">{{ camera.name }}</h3>
            <p><b>IP:</b> {{ camera.camera_IP }}</p>
            <p><b>Tipo:</b> {{ camera.camera_type?.name || 'N/A' }}</p>
            <p><b>Zona:</b> {{ camera.zone_id?.name || camera.zone_id || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: ["auth"],
});

const cameras = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchCameras = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch('/api/get/camera');
    if (response.success) {
      cameras.value = response.cameras;
    } else {
      throw new Error(response.message || 'Error fetching cameras');
    }
  } catch (err) {
    console.error('Error fetching cameras:', err);
    error.value = 'No se pudieron cargar las cámaras.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCameras();
});
</script>

<style scoped>
.camera-page-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #05445e 0%, #022c45 70%, #021926 100%); /* Ocean background */
  padding: 2rem 1rem;
  color: #effffd; /* Light text color */
}

.camera-content-wrapper {
  max-width: 1000px; /* Limit content width */
  margin: auto; /* Center content */
  padding-top: 2rem; /* Space from the top */
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #75e6da; /* Highlight color */
  margin-bottom: 2rem;
}

.camera-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsive grid */
  justify-content: center; /* Center grid items */
}

.camera-card {
  background: rgba(6, 90, 130, 0.6); /* Card background */
  backdrop-filter: blur(5px); /* Blur effect */
  border-radius: 1rem; /* Rounded corners */
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Shadow */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #effffd; /* Text color */
  border: 1px solid rgba(117, 230, 218, 0.3); /* Border */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.camera-card:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
}

.camera-placeholder {
  width: 100%;
  height: 180px; /* Placeholder height */
  background: rgba(0, 0, 0, 0.3); /* Placeholder background */
  border-radius: 0.5rem; /* Rounded corners */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.camera-info p {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 0.4rem;
  color: rgba(239, 255, 253, 0.8); /* Slightly transparent text */
}

.camera-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
    color: #75e6da; /* Highlight color for name */
}
</style>
