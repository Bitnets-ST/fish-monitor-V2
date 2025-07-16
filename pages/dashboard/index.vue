<template>
  <div class="dashboard-container">
    <!-- Animated background -->
    <div class="animated-bg">
      <div class="floating-bubbles">
        <div v-for="i in 20" :key="i" class="bubble" :style="{ 
          left: Math.random() * 100 + '%', 
          animationDelay: Math.random() * 10 + 's',
          animationDuration: (Math.random() * 10 + 10) + 's'
        }"></div>
      </div>
    </div>

    <!-- Main content -->
    <div class="dashboard-content">
      <!-- Welcome header -->
      <div class="welcome-section">
        <div class="welcome-card">
          <div class="welcome-icon">
            <Icon name="material-symbols:water" class="text-6xl text-blue-400" />
          </div>
          <div class="welcome-text">
            <h1 class="welcome-title">Fish Monitor</h1>
            <p class="welcome-subtitle">Sistema de Monitoreo Inteligente</p>
            <div class="welcome-stats">
              <div class="stat-item">
                <span class="stat-number">{{ stats.activeTanks }}</span>
                <span class="stat-label">Estanques Activos</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ stats.totalCameras }}</span>
                <span class="stat-label">Cámaras</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ stats.zones }}</span>
                <span class="stat-label">Zonas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick actions grid -->
      <div class="quick-actions">
        <h2 class="section-title">Acciones Rápidas</h2>
        <div class="actions-grid">
          <div 
            v-for="action in quickActions" 
            :key="action.id"
            class="action-card"
            @click="navigateTo(action.route)"
            @mouseenter="action.hover = true"
            @mouseleave="action.hover = false"
          >
            <div class="action-icon" :class="{ 'icon-hover': action.hover }">
              <Icon :name="action.icon" class="text-3xl" />
            </div>
            <h3 class="action-title">{{ action.title }}</h3>
            <p class="action-description">{{ action.description }}</p>
            <div class="action-arrow" :class="{ 'arrow-hover': action.hover }">
              <Icon name="material-symbols:arrow-forward" />
            </div>
          </div>
        </div>
      </div>

      <!-- Live monitoring section -->
      <div class="monitoring-section">
        <h2 class="section-title">Monitoreo en Tiempo Real</h2>
        <div class="monitoring-grid">
          <div class="monitor-card">
            <div class="monitor-header">
              <Icon name="material-symbols:monitoring" class="text-2xl text-green-400" />
              <span class="monitor-title">Estado del Sistema</span>
              <div class="status-indicator online"></div>
            </div>
            <div class="monitor-content">
              <div class="status-item">
                <span class="status-label">Temperatura Promedio</span>
                <span class="status-value">{{ systemStatus.temperature }}°C</span>
              </div>
              <div class="status-item">
                <span class="status-label">Nivel de Oxígeno</span>
                <span class="status-value">{{ systemStatus.oxygen }}%</span>
              </div>
              <div class="status-item">
                <span class="status-label">pH del Agua</span>
                <span class="status-value">{{ systemStatus.ph }}</span>
              </div>
            </div>
          </div>

          <div class="monitor-card">
            <div class="monitor-header">
              <Icon name="material-symbols:security" class="text-2xl text-blue-400" />
              <span class="monitor-title">Cámaras Activas</span>
              <div class="status-indicator online"></div>
            </div>
            <div class="monitor-content">
              <div class="camera-grid">
                <div 
                  v-for="camera in activeCameras" 
                  :key="camera.id"
                  class="camera-item"
                  :class="{ 'camera-active': camera.active }"
                >
                  <Icon name="material-symbols:videocam" class="text-xl" />
                  <span class="camera-name">{{ camera.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent activity -->
      <div class="activity-section">
        <h2 class="section-title">Actividad Reciente</h2>
        <div class="activity-timeline">
          <div 
            v-for="activity in recentActivity" 
            :key="activity.id"
            class="activity-item"
          >
            <div class="activity-icon" :class="activity.type">
              <Icon :name="activity.icon" />
            </div>
            <div class="activity-content">
              <p class="activity-text">{{ activity.message }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const stats = ref({
  activeTanks: 12,
  totalCameras: 8,
  zones: 4
})

const systemStatus = ref({
  temperature: 24.5,
  oxygen: 85,
  ph: 7.2
})

const activeCameras = ref([
  { id: 1, name: 'Cámara 1', active: true },
  { id: 2, name: 'Cámara 2', active: true },
  { id: 3, name: 'Cámara 3', active: false },
  { id: 4, name: 'Cámara 4', active: true }
])

const recentActivity = ref([
  {
    id: 1,
    type: 'info',
    icon: 'material-symbols:info',
    message: 'Nueva medición de temperatura registrada',
    time: 'Hace 2 minutos'
  },
  {
    id: 2,
    type: 'warning',
    icon: 'material-symbols:warning',
    message: 'Nivel de oxígeno bajo en Zona 2',
    time: 'Hace 5 minutos'
  },
  {
    id: 3,
    type: 'success',
    icon: 'material-symbols:check-circle',
    message: 'Sistema de alimentación activado',
    time: 'Hace 10 minutos'
  },
  {
    id: 4,
    type: 'info',
    icon: 'material-symbols:videocam',
    message: 'Cámara 3 desconectada para mantenimiento',
    time: 'Hace 15 minutos'
  }
])

const quickActions = ref([
  {
    id: 1,
    title: 'Ver Cámaras',
    description: 'Monitorear en tiempo real',
    icon: 'material-symbols:security',
    route: '/cameras',
    hover: false
  },
  {
    id: 2,
    title: 'Gestionar Sucursales',
    description: 'Administrar ubicaciones',
    icon: 'material-symbols:business',
    route: '/settings/control-panel',
    hover: false
  },
  {
    id: 3,
    title: 'Configuración',
    description: 'Ajustes del sistema',
    icon: 'material-symbols:settings',
    route: '/settings',
    hover: false
  },
  {
    id: 4,
    title: 'Reportes',
    description: 'Generar informes',
    icon: 'material-symbols:assessment',
    route: '/reports',
    hover: false
  }
])

// Methods
const navigateTo = (route) => {
  navigateTo(route)
}

// Simulate real-time updates
onMounted(() => {
  setInterval(() => {
    // Update temperature randomly
    systemStatus.value.temperature = (24 + Math.random() * 2).toFixed(1)
    // Update oxygen level
    systemStatus.value.oxygen = Math.floor(80 + Math.random() * 20)
  }, 5000)
})
</script>

<style scoped>
.dashboard-container {
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
  width: 20px;
  height: 20px;
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
.dashboard-content {
  position: relative;
  z-index: 10;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Welcome section */
.welcome-section {
  margin-bottom: 3rem;
}

.welcome-card {
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

.welcome-icon {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.welcome-text {
  flex: 1;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.welcome-stats {
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

/* Quick actions */
.quick-actions {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #f1f5f9;
  margin-bottom: 1.5rem;
  text-align: center;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-card:hover {
  transform: translateY(-5px);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
}

.action-icon {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.icon-hover {
  transform: scale(1.1) rotate(5deg);
}

.action-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #f1f5f9;
  margin-bottom: 0.5rem;
}

.action-description {
  color: #94a3b8;
  margin-bottom: 1rem;
}

.action-arrow {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #64748b;
  transition: all 0.3s ease;
}

.arrow-hover {
  color: #3b82f6;
  transform: translateX(5px);
}

/* Monitoring section */
.monitoring-section {
  margin-bottom: 3rem;
}

.monitoring-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.monitor-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.monitor-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
}

.monitor-title {
  font-weight: bold;
  color: #f1f5f9;
  flex: 1;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-indicator.online {
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.monitor-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
}

.status-label {
  color: #94a3b8;
}

.status-value {
  font-weight: bold;
  color: #3b82f6;
}

.camera-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.camera-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.camera-item.camera-active {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.camera-name {
  font-size: 0.9rem;
  color: #f1f5f9;
}

/* Activity section */
.activity-section {
  margin-bottom: 2rem;
}

.activity-timeline {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.info {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.activity-icon.warning {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.activity-icon.success {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: #f1f5f9;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.8rem;
  color: #64748b;
}

/* Responsive design */
@media (max-width: 768px) {
  .dashboard-content {
    padding: 1rem;
  }
  
  .welcome-card {
    flex-direction: column;
    text-align: center;
  }
  
  .welcome-stats {
    justify-content: center;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .monitoring-grid {
    grid-template-columns: 1fr;
  }
  
  .camera-grid {
    grid-template-columns: 1fr;
  }
}
</style>
