export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const publicRoutes = ['/auth/login', '/auth/register'];

  // Si la ruta es pública, permitir el acceso
  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Si no está autenticado, intentar obtener el usuario
  if (!authStore.isAuthenticated) {
    try {
      const isAuthenticated = await authStore.fetchCurrentUser();
      if (!isAuthenticated) {
        return navigateTo('/auth/login', { replace: true });
      }
    } catch (error) {
      return navigateTo('/auth/login', { replace: true });
    }
  }

  // Si está intentando acceder a rutas de autenticación estando autenticado
  if (authStore.isAuthenticated && publicRoutes.includes(to.path)) {
    return navigateTo('/dashboard', { replace: true });
  }
});
