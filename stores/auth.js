import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),
  getters: {
    isAdmin: (state) => state.user?.role === "administrador",
    isSupervisor: (state) =>
      state.user?.role === "supervisor" || state.user?.role === "administrador",
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch("/api/auth/login", {
          method: "POST",
          body: credentials,
        });

        if (error.value) {
          throw error.value.data || new Error("Error en el inicio de sesión");
        }

        if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
          await navigateTo("/dashboard", { replace: true });
        } else {
          throw new Error("Respuesta inválida del servidor");
        }
      } catch (err) {
        this.error = err.message || "Error desconocido en el inicio de sesión";
        this.isAuthenticated = false;
        this.user = null;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async register(userInfo) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch("/api/auth/register", {
          method: "POST",
          body: userInfo,
        });

        if (error.value) {
          throw error.value.data || new Error("Error en el registro");
        }

        if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
          await navigateTo("/dashboard", { replace: true });
        } else {
          throw new Error("Respuesta inválida del servidor tras el registro");
        }
      } catch (err) {
        this.error = err.message || "Error desconocido durante el registro";
        this.isAuthenticated = false;
        this.user = null;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      this.error = null;
      try {
        await useFetch("/api/auth/logout", { method: "POST" });
        this.user = null;
        this.isAuthenticated = false;
        await navigateTo("/auth/login", { replace: true });
      } catch (err) {
        this.error = err.message || "Error al cerrar sesión";
        this.user = null;
        this.isAuthenticated = false;
        await navigateTo("/auth/login", { replace: true });
      } finally {
        this.loading = false;
      }
    },

    async fetchCurrentUser() {
      if (this.isAuthenticated && this.user) {
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch("/api/auth/me", {
          headers: useRequestHeaders(["cookie"]),
        });

        if (error.value) {
          if (error.value.statusCode === 401) {
            this.user = null;
            this.isAuthenticated = false;
            return false;
          }
          throw error.value.data || new Error("Error al obtener datos del usuario");
        }

        if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
          return true;
        }

        this.user = null;
        this.isAuthenticated = false;
        return false;
      } catch (err) {
        this.error = err.message || "Error desconocido al obtener datos del usuario";
        this.user = null;
        this.isAuthenticated = false;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async refreshToken() {
      this.loading = true;
      try {
        const { data, error } = await useFetch("/api/auth/refresh", {
          method: "POST",
          headers: useRequestHeaders(["cookie"]),
        });

        if (error.value) {
          await this.logout();
          return false;
        }

        if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
          return true;
        }

        await this.logout();
        return false;
      } catch (err) {
        await this.logout();
        return false;
      } finally {
        this.loading = false;
      }
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
