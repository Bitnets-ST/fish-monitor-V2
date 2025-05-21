<template>
  <q-page class="flex flex-center">
    <div class="w-full flex flex-col items-center">
      <button class="back-btn" @click="goBack">
        <span class="material-icons"> Volver a Zonas
      </span></button>
      <h2 class="text-lg font-bold mb-6">Estanques de la zona</h2>
      <div class="flex flex-wrap gap-6 mb-6 justify-center">
        <div v-for="tank in tanks" :key="tank._id" class="tank-card">
          <div class="tank-title">{{ tank.nombre }}</div>
          <div class="tank-info"><b>Capacidad:</b> {{ tank.capacidad || 'N/A' }}</div>
          <div class="tank-info"><b>Tipo:</b> {{ tank.tipo || 'N/A' }}</div>
          <div class="tank-info"><b>Material:</b> {{ tank.material || 'N/A' }}</div>
          <div class="tank-info"><b>Estado:</b> {{ tank.estado || 'N/A' }}</div>
          <button class="pdf-btn" @click="downloadPDF(tank)">PDF</button>
        </div>
      </div>
      <div v-if="tanks.length === 0" class="text-gray-500">No hay estanques registrados en esta zona.</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import jsPDF from 'jspdf';

const router = useRouter();
const route = useRoute();
const tanks = ref([]);

const fetchTanks = async () => {
  try {
    const zoneId = route.query.id;
    const response = await $fetch(`/api/get/tank`);
    if (response.success && response.tanks) {
      // Filtrar los estanques por zone_id (soporte para string u objeto)
      tanks.value = response.tanks.filter(t => {
        if (!t.zone_id) return false;
        if (typeof t.zone_id === 'string') return t.zone_id === zoneId;
        if (typeof t.zone_id === 'object') return t.zone_id._id === zoneId;
        return false;
      });
    }
  } catch (error) {
    // Manejo de error opcional
  }
};

const goBack = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  window.history.length > 1 ? router.back() : router.push('/dashboard/sucursal');
};

const downloadPDF = (tank) => {
  const doc = new jsPDF();
  doc.text(`Detalles del Estanque`, 10, 10);
  doc.text(`Nombre: ${tank.nombre || ''}`, 10, 20);
  doc.text(`Capacidad: ${tank.capacidad || 'N/A'}`, 10, 30);
  doc.text(`Tipo: ${tank.tipo || 'N/A'}`, 10, 40);
  doc.text(`Material: ${tank.material || 'N/A'}`, 10, 50);
  doc.text(`Estado: ${tank.estado || 'N/A'}`, 10, 60);
  doc.save(`Estanque_${tank.nombre || 'detalle'}.pdf`);
};

onMounted(() => {
  fetchTanks();
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
.tank-card {
  background: #232946;
  color: #fff;
  border-radius: 1.5rem;
  padding: 1.5rem 2.5rem;
  min-width: 260px;
  min-height: 160px;
  box-shadow: 0 4px 24px rgba(99,102,241,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
.tank-title {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #a5b4fc;
}
.tank-info {
  font-size: 1.05rem;
}
.pdf-btn {
  background: #f59e42;
  color: #fff;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.18s, transform 0.18s;
}
.pdf-btn:hover {
  background: #d97706;
  transform: translateY(-2px) scale(1.03);
}
</style> 