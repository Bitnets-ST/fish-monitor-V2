import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),
  getters: {
    isAdmin: (state) => state.user?.role === 'administrador',
    isSupervisor: (state) => state.user?.role === 'supervisor' || state.user?.role === 'administrador',
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
        });

        if (error.value) {
          throw error.value.data || new Error('Error en el inicio de sesión');
        }

        if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
          navigateTo('/dashboard'); // Redirigir al dashboard después del login
        } else {
          throw new Error('Respuesta inválida del servidor');
        }
      } catch (err) {
        this.error = err.message || 'Error desconocido en el inicio de sesión';
        this.isAuthenticated = false;
        this.user = null;
        // No lanzar el error aquí para que el componente de login pueda manejarlo
      }
      this.loading = false;
    },

    async register(userInfo) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch('/api/auth/register', {
          method: 'POST',
          body: userInfo,
        });

        if (error.value) {
          // El error.value.data ya debería tener un campo 'message' del servidor
          throw error.value.data || new Error('Error en el registro');
        }

        if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
          // Si el registro también inicia sesión (como lo configuramos en el backend):
          navigateTo('/dashboard'); 
        } else {
          throw new Error('Respuesta inválida del servidor tras el registro');
        }
      } catch (err) {
        this.error = err.message || 'Error desconocido durante el registro';
        this.isAuthenticated = false;
        this.user = null;
      }
      this.loading = false;
    },

    async logout() {
      this.loading = true;
      this.error = null;
      try {
        await useFetch('/api/auth/logout', { method: 'POST' });
        this.user = null;
        this.isAuthenticated = false;
        navigateTo('/auth/login'); // Redirigir al login después del logout
      } catch (err) {
        this.error = err.message || 'Error al cerrar sesión';
        // Incluso si hay error, limpiar el estado local
        this.user = null;
        this.isAuthenticated = false;
      }
      this.loading = false;
    },

    async fetchCurrentUser() {
      console.log('[AuthStore] fetchCurrentUser: Iniciando...');
      if (this.isAuthenticated) {
        console.log('[AuthStore] fetchCurrentUser: Ya autenticado, saltando.');
        return;
      } 
      this.loading = true;
      this.error = null;
      try {
        console.log('[AuthStore] fetchCurrentUser: Realizando useFetch a /api/auth/me');
        const { data, error } = await useFetch('/api/auth/me', {
          headers: useRequestHeaders(['cookie']) // Asegura que las cookies se envíen
        });

        if (error.value) {
          console.error('[AuthStore] fetchCurrentUser: Error de useFetch:', error.value);
          if (error.value.statusCode === 401) {
            console.log('[AuthStore] fetchCurrentUser: Error 401, usuario no autenticado.');
            this.user = null;
            this.isAuthenticated = false;
          } else {
            throw error.value.data || new Error('Error al obtener datos del usuario desde store');
          }
        } else if (data.value && data.value.user) {
          console.log('[AuthStore] fetchCurrentUser: Usuario obtenido:', data.value.user);
          this.user = data.value.user;
          this.isAuthenticated = true;
        } else {
          console.log('[AuthStore] fetchCurrentUser: No hay datos de usuario o estructura inesperada en la respuesta.');
          this.user = null;
          this.isAuthenticated = false;
        }
      } catch (err) {
        console.error('[AuthStore] fetchCurrentUser: Excepción capturada:', err.message);
        this.error = err.message || 'Error desconocido al obtener datos del usuario desde store';
        this.user = null;
        this.isAuthenticated = false;
        throw err;
      }
      this.loading = false;
      console.log('[AuthStore] fetchCurrentUser: Finalizado. isAuthenticated:', this.isAuthenticated);
    },

    // Opcional: acción para intentar refrescar el token si el de acceso expira
    // Esto requeriría un interceptor en useFetch o $axios si se usara
    async refreshToken() {
      this.loading = true;
      try {
        const { data, error } = await useFetch('/api/auth/refresh', {
          method: 'POST',
          headers: useRequestHeaders(['cookie'])
        });
        if (error.value) {
          this.logout(); // Si el refresh falla, desloguear
          throw error.value.data || new Error('No se pudo refrescar el token');
        }
        if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
          return true;
        }
        return false;
      } catch (err) {
        this.logout();
        return false;
      }
      this.loading = false;
    }
  },
  // Configuración para pinia-plugin-persistedstate (opcional, si quieres persistir en localStorage/sessionStorage)
  // Como usamos cookies HTTP-only para los tokens, la persistencia del store es más para el estado de UI
  // y no es estrictamente necesaria para la autenticación en sí.
  // Si la habilitas, considera que `user` no debería persistirse directamente o solo partes no sensibles.
  /*
  persist: {
    // storage: persistedState.cookies, // Si quieres usar cookies para el estado de Pinia (diferente a las cookies de auth)
    // paths: ['isAuthenticated'], // Solo persistir ciertos campos
  }
  */
});
