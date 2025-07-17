<template>
  <div class="dashboard-container">
    <div class="content-wrapper">
      <!-- Header Section -->
      <div class="header-section">
        <button @click="goBack" class="back-btn">
          <Icon name="material-symbols:arrow-back" />
          Volver
        </button>
        <h1 class="page-title">Zonas de la Sucursal</h1>
      </div>

      <!-- Zones Grid -->
      <div v-if="zones.length === 0" class="empty-state">
        <Icon name="material-symbols:location-off" class="empty-icon" size="64" />
        <h3>No hay zonas registradas</h3>
        <p>Esta sucursal no tiene zonas configuradas aún.</p>
      </div>

      <div v-else class="zones-grid">
        <div v-for="zone in zones" :key="zone._id" class="zone-card">
          <!-- Zone Header -->
          <div class="zone-header">
            <div class="zone-icon">
              <Icon name="material-symbols:location-on" />
            </div>
            <div class="zone-title-section">
              <h3 class="zone-name">{{ zone.name }}</h3>
              <span class="zone-status">Activa</span>
            </div>
          </div>

          <!-- Tank Section -->
          <div class="tank-section">
            <h4 class="section-title">Estanques ({{ zone.estanques.length }})</h4>
            
            <div v-if="zone.estanques.length === 0" class="no-tanks">
              No hay estanques en esta zona
            </div>
            
            <div v-else class="tank-grid">
              <div v-for="tank in zone.estanques.slice(0, 4)" :key="tank._id" class="tank-item">
                <div class="tank-indicator"></div>
                <span class="tank-name">{{ tank.nombre || tank.name || 'Estanque' }}</span>
              </div>
            </div>

            <button @click="goToEstanques(zone._id)" class="view-details-btn">
              <Icon name="material-symbols:visibility" />
              Ver Estanques
            </button>
          </div>
        </div>
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
  
  .tank-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style>