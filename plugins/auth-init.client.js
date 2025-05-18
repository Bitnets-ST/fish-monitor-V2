// plugins/auth-init.client.js
import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
  // Solo ejecutar en el cliente
  if (process.server) return;

  const authStore = useAuthStore(nuxtApp.$pinia); // Asegúrate de pasar la instancia de Pinia si es necesario

  // Si no estamos autenticados y no hay usuario cargado, intentar obtenerlo
  // Esto es útil para cuando el usuario refresca la página o abre una nueva pestaña
  if (!authStore.isAuthenticated && !authStore.user) {
    try {
      // console.log('Auth-init plugin: Intentando cargar usuario actual...');
      await authStore.fetchCurrentUser();
      // console.log('Auth-init plugin: Usuario cargado:', authStore.user?.email);
    } catch (error) {
      // console.error('Auth-init plugin: Error al cargar usuario actual:', error.message);
      // No es necesario redirigir aquí, los middlewares de ruta se encargarán de eso.
      // Si el token es inválido o no existe, fetchCurrentUser manejará el estado.
    }
  }
});
