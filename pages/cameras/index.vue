<template>
  <div class="cameras-container">
    <!-- Animated background -->
    <div class="animated-bg">
      <div class="floating-bubbles">
        <div v-for="i in 15" :key="i" class="bubble" :style="{ 
          left: Math.random() * 100 + '%', 
          animationDelay: Math.random() * 10 + 's',
          animationDuration: (Math.random() * 10 + 10) + 's'
        }"></div>
      </div>
    </div>

    <!-- Main content -->
    <div class="cameras-content">
      <!-- Header section -->
      <div class="header-section">
        <div class="header-card">
          <div class="header-icon">
            <Icon name="material-symbols:security" class="text-6xl text-blue-400" />
          </div>
          <div class="header-text">
            <h1 class="header-title">Sistema de Cámaras</h1>
            <p class="header-subtitle">Monitoreo en Tiempo Real</p>
            <div class="header-stats">
              <div class="stat-item">
                <span class="stat-number">{{ cameras.length }}</span>
                <span class="stat-label">Cámaras Totales</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ activeCameras }}</span>
                <span class="stat-label">Cámaras Activas</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ cameraTypes.length }}</span>
                <span class="stat-label">Tipos de Cámara</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cameras grid -->
      <div class="cameras-section">
        <h2 class="section-title">Cámaras del Sistema</h2>
        
        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p class="loading-text">Cargando cámaras...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="error-state">
          <Icon name="material-symbols:error" class="text-4xl text-red-400 mb-4" />
          <p class="error-text">{{ error }}</p>
          <button @click="fetchCameras" class="retry-button">
            <Icon name="material-symbols:refresh" class="mr-2" />
            Reintentar
          </button>
        </div>

        <!-- Empty state -->
        <div v-else-if="cameras.length === 0" class="empty-state">
          <Icon name="material-symbols:videocam-off" class="text-4xl text-gray-400 mb-4" />
          <p class="empty-text">No hay cámaras registradas</p>
          <p class="empty-subtext">Agrega tu primera cámara para comenzar el monitoreo</p>
        </div>

        <!-- Cameras grid -->
        <div v-else class="cameras-grid">
          <div 
            v-for="camera in cameras" 
            :key="camera._id" 
            class="camera-card"
            @mouseenter="camera.hover = true"
            @mouseleave="camera.hover = false"
          >
            <!-- Camera video placeholder -->
            <div class="camera-video-placeholder">
              <div class="video-overlay">
                <Icon name="material-symbols:videocam" class="text-4xl text-white opacity-60" />
                <div class="camera-status" :class="{ 'status-active': camera.active !== false }">
                  <div class="status-dot"></div>
                  <span class="status-text">{{ camera.active !== false ? 'Activa' : 'Inactiva' }}</span>
                </div>
              </div>
              <div class="video-controls">
                <button class="control-btn" title="Ver en vivo">
                  <Icon name="material-symbols:play-arrow" />
                </button>
                <button class="control-btn" title="Configurar">
                  <Icon name="material-symbols:settings" />
                </button>
                <button class="control-btn" title="Grabar">
                  <Icon name="material-symbols:fiber-manual-record" />
                </button>
              </div>
            </div>

            <!-- Camera info -->
            <div class="camera-info">
              <div class="camera-header">
                <h3 class="camera-name">{{ camera.name }}</h3>
                <div class="camera-type-badge">
                  {{ camera.camera_type?.name || 'Genérica' }}
                </div>
              </div>
              
              <div class="camera-details">
                <div class="detail-item">
                  <Icon name="material-symbols:router" class="detail-icon" />
                  <span class="detail-label">IP:</span>
                  <span class="detail-value">{{ camera.camera_IP || 'No configurada' }}</span>
                </div>
                
                <div class="detail-item">
                  <Icon name="material-symbols:location-on" class="detail-icon" />
                  <span class="detail-label">Zona:</span>
                  <span class="detail-value">{{ camera.zone_id?.name || camera.zone_id || 'Sin asignar' }}</span>
                </div>
                
                <div class="detail-item">
                  <Icon name="material-symbols:schedule" class="detail-icon" />
                  <span class="detail-label">Última conexión:</span>
                  <span class="detail-value">{{ getLastConnection(camera) }}</span>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="camera-actions">
                <button class="action-btn primary" @click="viewCamera(camera)">
                  <Icon name="material-symbols:visibility" class="mr-2" />
                  Ver
                </button>
                <button class="action-btn secondary" @click="editCamera(camera)">
                  <Icon name="material-symbols:edit" class="mr-2" />
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cameras = ref([])
const loading = ref(true)
const error = ref(null)

// Computed properties
const activeCameras = computed(() => {
  return cameras.value.filter(camera => camera.active !== false).length
})

const cameraTypes = computed(() => {
  const types = new Set()
  cameras.value.forEach(camera => {
    if (camera.camera_type?.name) {
      types.add(camera.camera_type.name)
    }
  })
  return Array.from(types)
})

// Methods
const fetchCameras = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await $fetch('/api/get/camera')
    if (response.success) {
      cameras.value = response.cameras.map(camera => ({
        ...camera,
        hover: false
      }))
    } else {
      throw new Error(response.message || 'Error al cargar las cámaras')
    }
  } catch (err) {
    console.error('Error fetching cameras:', err)
    error.value = 'No se pudieron cargar las cámaras.'
  } finally {
    loading.value = false
  }
}

const getLastConnection = (camera) => {
  // Simulate last connection time
  const times = ['Hace 2 minutos', 'Hace 5 minutos', 'Hace 10 minutos', 'Hace 1 hora']
  return times[Math.floor(Math.random() * times.length)]
}

const viewCamera = (camera) => {
  console.log('Ver cámara:', camera.name)
  // Implement camera view functionality
}

const editCamera = (camera) => {
  console.log('Editar cámara:', camera.name)
  // Implement camera edit functionality
}

onMounted(() => {
  fetchCameras()
})
</script>

<style scoped>
.cameras-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  position: relative;
  overflow: hidden;
}

/* Animated background */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-bubbles {
  position: relative;
  width: 100%;
  height: 100%;
}

.bubble {
  position: absolute;
  width: 15px;
  height: 15px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 70%);
  border-radius: 50%;
  animation: float linear infinite;
  opacity: 0.6;
}

@keyframes float {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

/* Main content */
.cameras-content {
  position: relative;
  z-index: 10;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header section */
.header-section {
  margin-bottom: 3rem;
}

.header-card {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.header-icon {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.header-text {
  flex: 1;
}

.header-title {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.header-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #3b82f6;
}

.stat-label {
  font-size: 0.9rem;
  color: #94a3b8;
}

/* Cameras section */
.cameras-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #f1f5f9;
  margin-bottom: 2rem;
  text-align: center;
}

/* Loading state */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(59, 130, 246, 0.3);
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #94a3b8;
  font-size: 1.1rem;
}

/* Error state */
.error-state {
  text-align: center;
  padding: 4rem 2rem;
}

.error-text {
  color: #ef4444;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.retry-button {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-text {
  color: #94a3b8;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.empty-subtext {
  color: #64748b;
  font-size: 1rem;
}

/* Cameras grid */
.cameras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.camera-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.camera-card:hover {
  transform: translateY(-5px);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
}

/* Camera video placeholder */
.camera-video-placeholder {
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #1e293b, #334155);
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}

.status-active .status-dot {
  background: #10b981;
  animation: pulse 2s infinite;
}

.status-text {
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
}

.video-controls {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.camera-card:hover .video-controls {
  opacity: 1;
}

.control-btn {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(59, 130, 246, 0.8);
  transform: scale(1.1);
}

/* Camera info */
.camera-info {
  padding: 1.5rem;
}

.camera-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.camera-name {
  font-size: 1.3rem;
  font-weight: bold;
  color: #f1f5f9;
  margin: 0;
}

.camera-type-badge {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.camera-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-icon {
  color: #3b82f6;
  font-size: 1.1rem;
}

.detail-label {
  color: #94a3b8;
  font-weight: bold;
  min-width: 80px;
}

.detail-value {
  color: #f1f5f9;
  flex: 1;
}

/* Action buttons */
.camera-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn.primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.action-btn.secondary {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.action-btn.secondary:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

/* Responsive design */
@media (max-width: 768px) {
  .cameras-content {
    padding: 1rem;
  }
  
  .header-card {
    flex-direction: column;
    text-align: center;
  }
  
  .header-stats {
    justify-content: center;
  }
  
  .cameras-grid {
    grid-template-columns: 1fr;
  }
  
  .camera-actions {
    flex-direction: column;
  }
}
</style>
