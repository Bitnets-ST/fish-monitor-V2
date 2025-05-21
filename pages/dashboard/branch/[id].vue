<template>
  <div class="ocean-background">
    <div class="wave-container">
      <div class="wave"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
    </div>

    <div class="sucursales-container">
      <div class="page-header">
        <button class="back-btn" @click="goBack">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
              fill="currentColor"
            />
          </svg>
          Volver a Sucursales
        </button>

        <div class="title-bubble">
          <h2 class="page-title">Zonas de la sucursal</h2>
        </div>
      </div>

      <div class="flex flex-wrap gap-8 mb-6 justify-center">
        <div v-for="zone in zones" :key="zone._id" class="zone-card">
          <div class="card-content">
            <div class="zone-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 6v2h8V9h-8zm0 4v2h8v-2h-8zm0 4v2h8v-2h-8zM7 9v2h2V9H7zm0 4v2h2v-2H7zm0 4v2h2v-2H7z"
                  fill="rgba(255,255,255,0.9)"
                />
              </svg>
            </div>
            <span class="zone-name">{{ zone.name }}</span>

            <div
              class="tank-list"
              v-if="zone.estanques && zone.estanques.length"
            >
              <div class="tank-list-title">Estanques:</div>
              <div class="tank-tags">
                <span
                  v-for="tank in zone.estanques"
                  :key="tank._id"
                  class="tank-tag"
                >
                  {{ tank.nombre }}
                </span>
              </div>
            </div>
            <div v-else class="tank-list-empty">No hay estanques</div>

            <button class="ver-btn" @click="goToEstanques(zone._id)">
              <span>Ver Estanques</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <div class="bubbles">
            <div class="bubble bubble-1"></div>
            <div class="bubble bubble-2"></div>
          </div>
        </div>
      </div>

      <div v-if="zones.length === 0" class="empty-state">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="48"
          height="48"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm1-5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1H9v2h1v3h4v-3h1v-2h-2zM8.567 4.813A8.528 8.528 0 0 0 7.4 8H4.746a10.028 10.028 0 0 1 3.82-3.187zm6.866 0A10.028 10.028 0 0 1 19.254 8H16.6a8.528 8.528 0 0 0-1.167-3.187z"
            fill="rgba(255,255,255,0.7)"
          />
        </svg>
        <p>No hay zonas registradas</p>
      </div>

      <!-- Decoración: peces -->
      <div class="fish fish-1"></div>
      <div class="fish fish-2"></div>
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
    // Manejo de error opcional
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
/* Estilos base del ejemplo anterior (océano, olas, peces, etc.) */
.ocean-background {
  min-height: 100vh;
  background: linear-gradient(180deg, #05445e 0%, #022c45 70%, #021926 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
}

.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
  pointer-events: none;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 120px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%2375E6DA" fill-opacity="0.4" d="M0,192L60,186.7C120,181,240,171,360,149.3C480,128,600,96,720,90.7C840,85,960,107,1080,112C1200,117,1320,107,1380,101.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>');
  background-repeat: repeat-x;
  background-position: 0 bottom;
  background-size: 50% 120px;
  animation: wave 15s linear infinite;
  opacity: 0.8;
}

/* Resto de animaciones y estilos de waves... */

/* Botón Volver */
.back-btn {
  background: linear-gradient(
    135deg,
    rgba(117, 230, 218, 0.3) 0%,
    rgba(189, 224, 254, 0.2) 100%
  );
  backdrop-filter: blur(10px);
  color: #effffd;
  border: 2px solid rgba(189, 224, 254, 0.3);
  border-radius: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.back-btn:hover {
  background: linear-gradient(
    135deg,
    rgba(117, 230, 218, 0.5) 0%,
    rgba(189, 224, 254, 0.4) 100%
  );
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Tarjetas de Zona */
.zone-card {
  background: linear-gradient(
    135deg,
    rgba(189, 224, 254, 0.3) 0%,
    rgba(117, 230, 218, 0.2) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  min-width: 280px;
  max-width: 320px;
  height: 320px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.zone-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.card-content {
  background: rgba(6, 90, 130, 0.8);
  border-radius: 1.5rem;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(189, 224, 254, 0.3);
}

.zone-icon {
  background: rgba(189, 224, 254, 0.2);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.zone-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #effffd;
  margin-bottom: 1rem;
  text-align: center;
}

.tank-list-title {
  font-size: 1rem;
  font-weight: 600;
  color: #75e6da;
  margin-bottom: 0.7rem;
}

.tank-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-height: 100px;
  overflow-y: auto;
}

.tank-tag {
  background: rgba(189, 224, 254, 0.2);
  border-radius: 1rem;
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  color: #effffd;
  border: 1px solid rgba(189, 224, 254, 0.3);
}

.empty-state {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
}

.ver-btn {
  background: linear-gradient(135deg, #189ab4 0%, #05445e 100%);
  color: #effffd;
  border: none;
  border-radius: 1.5rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ver-btn:hover {
  background: linear-gradient(135deg, #157a8f 0%, #04334d 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Mantener estilos de burbujas, peces y responsive del ejemplo anterior */
</style>
