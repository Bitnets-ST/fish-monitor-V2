export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Asegurarse de que el usuario esté autenticado primero
  if (!authStore.isAuthenticated) {
    try {
      await authStore.fetchCurrentUser();
    } catch (error) {
      return navigateTo('/auth/login');
    }
  }

  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login');
  }

  // Verificar el rol del usuario
  if (authStore.user?.role !== 'administrador') {
    // Si no es administrador, redirigir a una página de acceso denegado o al dashboard
    // Por ahora, redirigimos al dashboard
    // En una aplicación real, podrías tener una página específica de 'acceso denegado'
    return navigateTo('/dashboard'); 
  }
});
