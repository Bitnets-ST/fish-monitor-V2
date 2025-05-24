<template>
  <div>
    <!-- Puedes mostrar un loader mientras se verifica la autenticación -->
    <p class="text-gray-700 dark:text-gray-200">Cargando...</p>
    <h1 class="text-2xl font-semibold">Inicio</h1>
    <!-- Add more content here, it should inherit light text color -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { navigateTo } from "#app";
import { definePageMeta } from "#imports";
const authStore = useAuthStore();
definePageMeta({
  layout: false,
});
onMounted(async () => {
  if (!authStore.isAuthenticated && !authStore.loading) {
    try {
      await authStore.fetchCurrentUser();
    } catch (error) {
      // El error ya se maneja en el store
    }
  }

  if (authStore.isAuthenticated) {
    navigateTo("/dashboard");
  } else {
    navigateTo("/auth/login");
  }
});
</script>

<style scoped>
/* Estilos si son necesarios */
</style>
