<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sucursales-container">
    <h2 class="text-lg font-bold mb-6">Sucursales</h2>
    <div class="flex flex-wrap gap-6 mb-6 justify-center">
      <div
        v-for="branch in branches"
        :key="branch._id"
        class="branch-card group"
      >
        <span class="branch-name">{{ branch.name }}</span>
        <div class="zone-list" v-if="branch.zonas && branch.zonas.length">
          <div class="zone-list-title">Zonas:</div>
          <ul>
            <li v-for="zona in branch.zonas" :key="zona._id">{{ zona.name }}</li>
          </ul>
        </div>
        <div v-else class="zone-list-empty">No hay zonas</div>
        <button class="ver-btn" @click="goToZonas(branch._id)">Ver</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const branches = ref([]);
const router = useRouter();

const fetchBranches = async () => {
  try {
    const response = await $fetch('/api/get/branch');
    if (response.success && response.branches) {
      // Para cada sucursal, obtener sus zonas
      const branchesWithZones = await Promise.all(response.branches.map(async (branch) => {
        const zonesRes = await $fetch(`/api/get/zone?branch_id=${branch._id}`);
        return {
          ...branch,
          zonas: zonesRes.success && zonesRes.zones ? zonesRes.zones : []
        };
      }));
      branches.value = branchesWithZones;
    }
  } catch (error) {
    // Manejo de error opcional
  }
};

const goToZonas = (branchId) => {
  router.push({ path: '/dashboard/sucursal', query: { id: branchId } });
};

onMounted(() => {
  fetchBranches();
});
</script>

<style scoped>
.sucursales-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.branch-card {
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
.branch-card:hover, .branch-card:focus, .branch-card:active {
  background: #6366f1;
  color: #fff;
  transform: none;
  box-shadow: 0 4px 24px rgba(99,102,241,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  border-color: #6366f1;
}
.branch-name {
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
.zone-list {
  margin-top: 0.7rem;
  text-align: left;
}
.zone-list-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.zone-list-empty {
  margin-top: 0.7rem;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 700;
}
</style> 