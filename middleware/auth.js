export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log('[Auth Middleware] Ejecutando para la ruta:', to.path);
  const authStore = useAuthStore();

  // console.log('[Auth Middleware] Estado inicial de isAuthenticated:', authStore.isAuthenticated);

  if (!authStore.isAuthenticated) {
    // console.log('[Auth Middleware] No autenticado, intentando fetchCurrentUser...');
    try {
      await authStore.fetchCurrentUser();
      // console.log('[Auth Middleware] fetchCurrentUser completado. Nuevo estado isAuthenticated:', authStore.isAuthenticated);
    } catch (error) {
      // console.error('[Auth Middleware] Error en fetchCurrentUser:', error.message);
      // console.log('[Auth Middleware] Redirigiendo a /auth/login debido a error en fetchCurrentUser.');
      return navigateTo("/auth/login");
    }
  }

  if (!authStore.isAuthenticated) {
    // console.log('[Auth Middleware] Sigue sin estar autenticado después del intento. Redirigiendo a /auth/login.');
    return navigateTo("/auth/login");
  }

  // console.log('[Auth Middleware] Usuario autenticado. Permitiendo acceso a:', to.path);
});
