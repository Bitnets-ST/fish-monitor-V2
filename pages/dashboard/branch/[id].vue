<template>

  <div class="map-container">
    <div class="image-wrapper">
      <img src= "/public/mapa.png" alt="Piscicultura Mowi" ref="mapImage" @load="initMap" @click="logClickPosition">

      <!-- Capa de estanques interactivos -->
      <div class="pools-layer">
        <div v-for="(pool, index) in pools" :key="pool.id" class="pool-highlight" :style="getPoolStyle(pool, index)"
          @mouseenter="setActivePool(index)" @mouseleave="activePool = null">
          <div v-if="activePool === index" class="pool-tooltip"
               :style="pool.shape === 'circle' ? { backgroundColor: '#FFA500', borderTopColor: '#FFA500' } : {}">
            <h4>{{ pool.title }}</h4>
            <p>{{ pool.tooltip }}</p>
            <p>Biomasa: {{ pool.biomass }}</p>
            <p>pH: {{ pool.ph }}</p>
            <p>Temperatura: {{ pool.temperature }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activePool: null,
      imgSize: { width: 0, height: 0 },
      pools: [
        { id: 1, shape: "oval", coords: { cx: 342, cy: 622, r: 20 }, title: "Estanque 301", tooltip: "Capacidad: 10,000 peces", biomass: "500 kg", ph: "7.2", temperature: "15°C" },
        { id: 2, shape: "oval", coords: { cx: 340, cy: 500, r: 20 }, title: "Estanque 302", tooltip: "Capacidad: 9,500 peces", biomass: "480 kg", ph: "7.1", temperature: "15.5°C" },
        { id: 3, shape: "oval", coords: { cx: 382, cy: 619, r: 20 }, title: "Estanque 303", tooltip: "Capacidad: 11,000 peces", biomass: "550 kg", ph: "7.3", temperature: "14.8°C" },
        { id: 4, shape: "oval", coords: { cx: 379, cy: 498, r: 20 }, title: "Estanque 304", tooltip: "Capacidad: 8,500 peces", biomass: "400 kg", ph: "7.0", temperature: "15.2°C" },
        { id: 5, shape: "oval", coords: { cx: 421, cy: 617, r: 20 }, title: "Estanque 305", tooltip: "Capacidad: 12,000 peces", biomass: "600 kg", ph: "7.4", temperature: "16°C" },
        { id: 6, shape: "oval", coords: { cx: 424, cy: 495, r: 20 }, title: "Estanque 306", tooltip: "Capacidad: 10,500 peces", biomass: "520 kg", ph: "7.2", temperature: "15.8°C" },
        { id: 7, shape: "oval", coords: { cx: 464, cy: 614, r: 20 }, title: "Estanque 307", tooltip: "Capacidad: 9,000 peces", biomass: "450 kg", ph: "7.1", temperature: "15.1°C" },
        { id: 8, shape: "oval", coords: { cx: 466, cy: 489, r: 20 }, title: "Estanque 308", tooltip: "Capacidad: 11,500 peces", biomass: "580 kg", ph: "7.3", temperature: "15.6°C" },
        { id: 601, shape: "circle", coords: { cx: 936, cy: 382, r: 25 }, title: "Estanque 601", tooltip: "Capacidad: Desconocida", biomass: "300 kg", ph: "7.5", temperature: "17°C" },
        { id: 602, shape: "circle", coords: { cx: 1000, cy: 348, r: 25 }, title: "Estanque 602", tooltip: "Capacidad: Desconocida", biomass: "320 kg", ph: "7.4", temperature: "16.8°C" },
        { id: 603, shape: "circle", coords: { cx: 944, cy: 473, r: 25 }, title: "Estanque 603", tooltip: "Capacidad: Desconocida", biomass: "280 kg", ph: "7.6", temperature: "17.1°C" },
        { id: 604, shape: "circle", coords: { cx: 1006, cy: 438, r: 25 }, title: "Estanque 604", tooltip: "Capacidad: Desconocida", biomass: "350 kg", ph: "7.3", temperature: "16.5°C" },
        { id: 605, shape: "circle", coords: { cx: 939, cy: 549, r: 25 }, title: "Estanque 605", tooltip: "Capacidad: Desconocida", biomass: "310 kg", ph: "7.5", temperature: "17.2°C" },
        { id: 606, shape: "circle", coords: { cx: 1005, cy: 532, r: 25 }, title: "Estanque 606", tooltip: "Capacidad: Desconocida", biomass: "330 kg", ph: "7.4", temperature: "16.9°C" }
      ]
    }
  },
  methods: {
    initMap() {
      this.updateImageSize();
      window.addEventListener('resize', this.updateImageSize);
    },
    updateImageSize() {
      if (this.$refs.mapImage) {
        this.imgSize = {
          width: this.$refs.mapImage.offsetWidth,
          height: this.$refs.mapImage.offsetHeight
        };
      }
    },
    logClickPosition(event) {
      const rect = this.$refs.mapImage.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left);
      const y = Math.round(event.clientY - rect.top);
      console.log(`Coordenadas: ${x}, ${y}`);
    },
    setActivePool(index) {
      this.activePool = index;
    },
    getPoolStyle(pool, index) {
      if (pool.shape === "circle") {
        // Styles for circle shape (white pools)
        const highlightColor = this.activePool === index ? 'rgba(255, 165, 0, 0.4)' : 'transparent'; // Orange color
        const borderColor = this.activePool === index ? '2px solid rgba(255, 165, 0, 0.8)' : 'none'; // Orange border

        return {
          left: `${pool.coords.cx - pool.coords.r}px`,
          top: `${pool.coords.cy - pool.coords.r}px`,
          width: `${pool.coords.r * 2}px`,
          height: `${pool.coords.r * 2}px`,
          borderRadius: '50%',
          backgroundColor: highlightColor,
          border: borderColor,
          pointerEvents: 'auto'
        };
      } else if (pool.shape === "oval") {
        // Styles for oval shape (black pools)
        const highlightColor = this.activePool === index ? 'rgba(0, 255, 0, 0.4)' : 'transparent'; // Green color for black pools
        const borderColor = this.activePool === index ? '2px solid rgba(0, 255, 0, 0.8)' : 'none'; // Green border for black pools
        const verticalScale = 1.3; // Adjust this value to make the oval taller or shorter

        return {
          left: `${pool.coords.cx - pool.coords.r}px`,
          top: `${pool.coords.cy - pool.coords.r * verticalScale}px`, // Adjust top based on scale
          width: `${pool.coords.r * 2}px`,
          height: `${pool.coords.r * 2 * verticalScale}px`, // Adjust height based on scale
          borderRadius: '50%', // Still use 50% for oval base shape
          backgroundColor: highlightColor,
          border: borderColor,
          pointerEvents: 'auto'
        };
      }
      return {}; // Return empty style for unknown shapes
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateImageSize);
  }
}
</script>

<style scoped>
.map-container {
  position: relative;
  max-width: 100%;
  margin: 0 auto;
}

.image-wrapper {
  position: relative;
  display: inline-block;
}

.image-wrapper img {
  display: block;
  max-width: 100%;
  height: auto;
}

.pools-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.pool-highlight {
  position: absolute;
  transition: all 0.3s ease;
  cursor: pointer;
  pointer-events: auto;
}

.pool-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  min-width: 180px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 100;
}

.pool-tooltip h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.pool-tooltip p {
  margin: 0;
  font-size: 14px;
}

.pool-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: #4CAF50 transparent transparent transparent;
}

.pool-highlight {
  position: absolute;
  transition: all 0.3s ease;
  cursor: pointer;
  pointer-events: auto;
}

.pools-layer {
  pointer-events: none;
=======
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