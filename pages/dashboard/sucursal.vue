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
          @click="goToEstanques(zone._id)"
        >
          <div class="avatar">
            {{ zone.name.charAt(0).toUpperCase() }}
          </div>
          <span class="zone-name">{{ zone.name }}</span>
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
    if (response.success && response.zones) {
      zones.value = response.zones;
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Manejo de error opcional
  }
};

const goBack = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
  background: #232946;
  color: #fff;
  border-radius: 2rem;
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.3rem;
  box-shadow: 0 4px 24px rgba(99,102,241,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
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
}
.zone-card:hover, .zone-card:focus, .zone-card:active {
  background: #6366f1;
  color: #fff;
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 8px 32px rgba(99,102,241,0.18), 0 2px 8px rgba(0,0,0,0.10);
  border-color: #6366f1;
}
.avatar {
  width: 48px;
  height: 48px;
  background: #fff;
  color: #6366f1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  font-weight: 800;
  margin-bottom: 0.3rem;
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
}
.zone-name {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}
</style> 