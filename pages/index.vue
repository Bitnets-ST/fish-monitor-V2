<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div v-if="loading" class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p v-else class="text-gray-700 dark:text-gray-200">Redirigiendo...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { navigateTo } from "#app";

const authStore = useAuthStore();
const loading = ref(true);

onMounted(async () => {
  try {
    // Si no está autenticado, intentar obtener el usuario actual
    if (!authStore.isAuthenticated) {
      await authStore.fetchCurrentUser();
    }

    // Después de verificar la autenticación, redirigir
    if (authStore.isAuthenticated) {
      await navigateTo("/dashboard", { replace: true });
    } else {
      await navigateTo("/auth/login", { replace: true });
    }
  } catch (error) {
    console.error("Error during authentication check:", error);
    await navigateTo("/auth/login", { replace: true });
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
