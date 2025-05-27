<template>
  <div class="dashboard-container">
    <div class="content-wrapper">
      <!-- Header Section -->
      <div class="header-section">
        <button class="back-btn" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="currentColor" />
          </svg>
          Volver a Zonas
        </button>
        <h1 class="page-title">Gestión y monitoreo de salas</h1>
      </div>

      <!-- Zones Grid -->
      <div class="zones-grid">
        <div v-for="zone in zones" :key="zone._id" class="zone-card">
          <div class="zone-header">
            <div class="zone-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
              </svg>
            </div>
            <div class="zone-title-section">
              <h3 class="zone-name">{{ zone.name }}</h3>
              <span class="zone-status">Activa</span>
            </div>

          </div>



          <!-- Tank List -->
          <div class="tank-section">
            <div class="section-title">Estanques</div>
            <div v-if="zone.estanques && zone.estanques.length" class="tank-grid">
              <div v-for="tank in zone.estanques" :key="tank._id" class="tank-item">
                <div class="tank-indicator"></div>
                <span class="tank-name">{{ tank.nombre }}</span>
              </div>
            </div>
            <div v-else class="no-tanks">
              <span>Sin estanques configurados</span>
            </div>
          </div>

          <!-- Action Button -->
          <button 
            v-if="zone.estanques && zone.estanques.length" 
            class="view-details-btn" 
            @click="goToEstanques(zone._id)"
          >
            <span>Ver Estanques</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="zones.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm1-5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1H9v2h1v3h4v-3h1v-2h-2z" fill="currentColor" />
          </svg>
        </div>
        <h3>No hay zonas registradas</h3>
        <p>Comience agregando zonas para organizar sus estanques</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const zones = ref([]);

const fetchZones = async () => {
  try {
    const branchId = route.params.id;
    const response = await $fetch(`/api/get/zone?branch_id=${branchId}`);
    const tanksRes = await $fetch(`/api/get/tank`);
    if (response.success && response.zones) {
      const zonesWithTanks = response.zones.map((zone) => ({
        ...zone,
        estanques:
          tanksRes.success && tanksRes.tanks
            ? tanksRes.tanks.filter((t) => {
                if (!t.zone_id) return false;
                if (typeof t.zone_id === "string")
                  return t.zone_id === zone._id;
                if (typeof t.zone_id === "object")
                  return t.zone_id._id === zone._id;
                return false;
              })
            : [],
      }));
      zones.value = zonesWithTanks;
    }
  } catch (error) {
    console.error('Error fetching zones:', error);
  }
};

const goBack = () => {
  window.history.length > 1 ? router.back() : router.push("/dashboard");
};

const goToEstanques = (zoneId) => {
  router.push({ path: `/dashboard/tank/${zoneId}` });
};

onMounted(() => {
  fetchZones();
});
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 2rem;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header Section */
.header-section {
  margin-bottom: 3rem;
}

.back-btn {
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #94a3b8;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
}

.back-btn:hover {
  background: rgba(148, 163, 184, 0.15);
  color: #e2e8f0;
  transform: translateX(-2px);
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
  line-height: 1.2;
}

/* Zones Grid */
.zones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  align-items: start;
}

.zone-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(51, 65, 85, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  height: 280px;
}

.zone-card:hover {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Zone Header */
.zone-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
}

.zone-icon {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 0.75rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.zone-title-section {
  flex: 1;
}

.zone-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 0.25rem 0;
}

.zone-status {
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 500;
}

.zone-actions {
  display: none;
}

.action-btn {
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  color: #94a3b8;
  border-radius: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(71, 85, 105, 0.7);
  color: #e2e8f0;
}

/* Zone Statistics */
.zone-stats {
  display: none;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(51, 65, 85, 0.3);
  border-radius: 0.75rem;
  border: 1px solid rgba(71, 85, 105, 0.3);
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.capacity {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stat-icon.productivity {
  background: linear-gradient(135deg, #10b981, #047857);
}

.stat-icon.status {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: #f1f5f9;
}

.stat-value.status-active {
  color: #10b981;
}

/* Tank Section */
.tank-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.tank-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.tank-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 0.5rem;
  border: 1px solid rgba(100, 116, 139, 0.2);
}

.tank-indicator {
  width: 0.5rem;
  height: 0.5rem;
  background: #10b981;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.tank-name {
  font-size: 0.875rem;
  color: #e2e8f0;
  font-weight: 500;
  flex: 1;
}

.no-tanks {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  font-style: italic;
}

/* View Details Button */
.view-details-btn {
  width: 100%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.875rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  margin-top: auto;
}

.view-details-btn:hover {
  background: linear-gradient(135deg, #5b21b6, #7c3aed);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
}

.empty-icon {
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #94a3b8;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  font-size: 1rem;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }
  
  .zones-grid {
    grid-template-columns: 1fr;
  }
  
  .zone-stats {
    grid-template-columns: 1fr;
  }
  
  .tank-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style>