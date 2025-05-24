import { defineStore } from 'pinia';
import { computed, toValue, reactive, watch } from 'vue';
import { N as hash, O as getRequestHeaders } from '../_/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { n as navigateTo, f as fetchDefaults, u as useNuxtApp } from './server.mjs';
import { u as useAsyncData } from './asyncData-Cn9zLTlz.mjs';

function useRequestEvent(nuxtApp) {
  var _a;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  if (!include || !event) {
    return _headers;
  }
  const headers = /* @__PURE__ */ Object.create(null);
  for (const _key of include) {
    const key = _key.toLowerCase();
    const header = _headers[key];
    if (header) {
      headers[key] = header;
    }
  }
  return headers;
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  if (!immediate) {
    let setImmediate = function() {
      _asyncDataOptions.immediate = true;
    };
    watch(key, setImmediate, { flush: "sync", once: true });
    watch([...watchSources || [], _fetchOptions], setImmediate, { flush: "sync", once: true });
  }
  let controller;
  const asyncData = useAsyncData(watchSources === false ? key.value : key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller, new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),
  getters: {
    isAdmin: (state) => {
      var _a;
      return ((_a = state.user) == null ? void 0 : _a.role) === "administrador";
    },
    isSupervisor: (state) => {
      var _a, _b;
      return ((_a = state.user) == null ? void 0 : _a.role) === "supervisor" || ((_b = state.user) == null ? void 0 : _b.role) === "administrador";
    }
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch("/api/auth/login", {
          method: "POST",
          body: credentials
        }, "$V74nxrewpB");
        if (error.value) {
          throw error.value.data || new Error("Error en el inicio de sesi\xF3n");
        }
        if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
          navigateTo("/dashboard");
        } else {
          throw new Error("Respuesta inv\xE1lida del servidor");
        }
      } catch (err) {
        this.error = err.message || "Error desconocido en el inicio de sesi\xF3n";
        this.isAuthenticated = false;
        this.user = null;
      }
      this.loading = false;
    },
    async register(userInfo) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch("/api/auth/register", {
          method: "POST",
          body: userInfo
        }, "$gBMUQvqFYE");
        if (error.value) {
          throw error.value.data || new Error("Error en el registro");
        }
        if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
          navigateTo("/dashboard");
        } else {
          throw new Error("Respuesta inv\xE1lida del servidor tras el registro");
        }
      } catch (err) {
        this.error = err.message || "Error desconocido durante el registro";
        this.isAuthenticated = false;
        this.user = null;
      }
      this.loading = false;
    },
    async logout() {
      this.loading = true;
      this.error = null;
      try {
        await useFetch("/api/auth/logout", { method: "POST" }, "$zo1Yv5CxZQ");
        this.user = null;
        this.isAuthenticated = false;
        navigateTo("/auth/login");
      } catch (err) {
        this.error = err.message || "Error al cerrar sesi\xF3n";
        this.user = null;
        this.isAuthenticated = false;
      }
      this.loading = false;
    },
    async fetchCurrentUser() {
      if (this.isAuthenticated) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch("/api/auth/me", {
          headers: useRequestHeaders(["cookie"])
          // Asegura que las cookies se envíen
        }, "$OCNVnf8NQQ");
        if (error.value) {
          if (error.value.statusCode === 401) {
            this.user = null;
            this.isAuthenticated = false;
          } else {
            throw error.value.data || new Error("Error al obtener datos del usuario desde store");
          }
        } else if (data.value && data.value.user) {
          this.user = data.value.user;
          this.isAuthenticated = true;
        } else {
          this.user = null;
          this.isAuthenticated = false;
        }
      } catch (err) {
        this.error = err.message || "Error desconocido al obtener datos del usuario desde store";
        this.user = null;
        this.isAuthenticated = false;
        throw err;
      }
      this.loading = false;
    },
    // Opcional: acción para intentar refrescar el token si el de acceso expira
    // Esto requeriría un interceptor en useFetch o $axios si se usara
    async refreshToken() {
      this.loading = true;
      try {
        const { data, error } = await useFetch("/api/auth/refresh", {
          method: "POST",
          headers: useRequestHeaders(["cookie"])
        }, "$jljuTGeI07");
        if (error.value) {
          this.logout();
          throw error.value.data || new Error("No se pudo refrescar el token");
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
    }
  }
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

export { useAuthStore as u };
//# sourceMappingURL=auth-AnSpNAX4.mjs.map
