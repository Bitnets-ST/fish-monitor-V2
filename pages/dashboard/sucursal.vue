<template>
  <q-page class="flex flex-center">
    <div class="w-full flex flex-col items-center">
      <button class="back-btn" @click="goBack">
        <span class="material-icons"/> Volver a Sucursales
      </button>
      <h2 class="text-lg font-bold mb-6">Zonas de la sucursal</h2>
      <div class="flex flex-wrap gap-6 mb-6 justify-center">
        <div
          v-for="zone in zones"
          :key="zone._id"
          class="zone-card group"
        >
          <span class="zone-name">{{ zone.name }}</span>
          <div class="tank-list" v-if="zone.estanques && zone.estanques.length">
            <div class="tank-list-title">Estanques:</div>
            <ul>
              <li v-for="tank in zone.estanques" :key="tank._id">{{ tank.nombre }}</li>
            </ul>
          </div>
          <div v-else class="tank-list-empty">No hay estanques</div>
          <button class="ver-btn" @click="goToEstanques(zone._id)">Ver</button>
        </div>
      </div>
      <div v-if="zones.length === 0" class="text-gray-500">No hay zonas registradas.</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const zones = ref([]);

const fetchZones = async () => {
  try {
    const branchId = route.query.id;
    const response = await $fetch(`/api/get/zone?branch_id=${branchId}`);
    const tanksRes = await $fetch(`/api/get/tank`);
    if (response.success && response.zones) {
      const zonesWithTanks = response.zones.map(zone => ({
        ...zone,
        estanques: (tanksRes.success && tanksRes.tanks)
          ? tanksRes.tanks.filter(t => {
              if (!t.zone_id) return false;
              if (typeof t.zone_id === 'string') return t.zone_id === zone._id;
              if (typeof t.zone_id === 'object') return t.zone_id._id === zone._id;
              return false;
            })
          : []
      }));
      zones.value = zonesWithTanks;
    }
  } catch (error) {
    // Manejo de error opcional
  }
};

const goBack = () => {
  window.history.length > 1 ? router.back() : router.push('/dashboard');
};

const goToEstanques = (zoneId) => {
  router.push({ path: '/dashboard/estanques', query: { id: zoneId } });
};

onMounted(() => {
  fetchZones();
});
</script>

<style scoped>
.back-btn {
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 1.5rem;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
  transition: background 0.18s, transform 0.18s;
}
.back-btn:hover {
  background: #4338ca;
  transform: translateY(-2px) scale(1.03);
}
.material-icons {
  font-size: 1.4rem;
}
.zone-card {
  background: #6366f1;
  color: #fff;
  border-radius: 2rem;
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  font-weight: 700;
  font-size: 1.3rem;
  box-shadow: 0 4px 24px rgba(99,102,241,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  outline: none;
  text-align: center;
  min-width: 220px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  border: 2px solid transparent;
  cursor: default;
  transition: none;
}
.zone-card:hover, .zone-card:focus, .zone-card:active {
  background: #6366f1;
  color: #fff;
  transform: none;
  box-shadow: 0 4px 24px rgba(99,102,241,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  border-color: #6366f1;
}
.zone-name {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.ver-btn {
  background: #232946;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 1rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.18s, transform 0.18s, border 0.18s;
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
}
.ver-btn:hover {
  background: #232946cc;
  border: 2px solid #a5b4fc;
  transform: translateY(-2px) scale(1.03);
}
.tank-list {
  margin-top: 0.7rem;
  text-align: left;
}
.tank-list-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.tank-list-empty {
  margin-top: 0.7rem;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 700;
}
</style> 