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
  // Permitir acceso si es supervisor o administrador (un administrador puede acceder a rutas de supervisor)
  if (authStore.user?.role !== 'supervisor' && authStore.user?.role !== 'administrador') {
    // Si no es supervisor ni administrador, redirigir
    return navigateTo('/dashboard'); // O una página de acceso denegado
  }
});
