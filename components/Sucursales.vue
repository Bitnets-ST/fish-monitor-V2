<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sucursales-container">
    <h2 class="text-lg font-bold mb-6">Sucursales</h2>
    <div class="flex flex-wrap gap-6 mb-6 justify-center">
      <div
        v-for="branch in branches"
        :key="branch._id"
        class="branch-card group"
        @click="goToZonas(branch._id)"
      >
        <div class="avatar">
          {{ branch.name.charAt(0).toUpperCase() }}
        </div>
        <span class="branch-name">{{ branch.name }}</span>
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
      branches.value = response.branches;
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
.branch-card:hover, .branch-card:focus, .branch-card:active {
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
.branch-name {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}
</style> 