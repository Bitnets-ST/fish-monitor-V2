<template>
  <div>
    <!-- Puedes mostrar un loader mientras se verifica la autenticación -->
    <p class="text-gray-700 dark:text-gray-200">Cargando...</p>
    <!-- The div with bg-gray-900 can be removed if not needed for other styling -->
    <!-- The layout now provides text-gray-200 by default -->
    <h1 class="text-2xl font-semibold">Inicio</h1> 
    <!-- Add more content here, it should inherit light text color -->
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { navigateTo } from '#app'; // O useRouter si prefieres

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const authStore = useAuthStore();

    onMounted(async () => {
      // Intenta cargar el usuario actual si aún no se ha hecho
      // El plugin auth-init.client.js ya debería haberlo intentado,
      // pero esto es una doble verificación o si el plugin tarda.
      if (!authStore.isAuthenticated && !authStore.loading) {
        try {
          await authStore.fetchCurrentUser();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // El error ya se maneja en el store, no es necesario hacer nada aquí
        }
      }

      if (authStore.isAuthenticated) {
        navigateTo('/dashboard');
      } else {
        navigateTo('/auth/login');
      }
    });

    return {};
  }
});
</script>

<style scoped>
/* Estilos si son necesarios */
</style>