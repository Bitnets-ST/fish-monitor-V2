import { J as executeAsync } from '../_/nitro.mjs';
import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-AnSpNAX4.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'mongoose';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';
import 'node:path';
import 'vue';
import 'pinia';
import 'vue-router';
import '@iconify/vue';
import 'vue/server-renderer';
import '@vue/shared';
import './asyncData-Cn9zLTlz.mjs';

const admin = defineNuxtRouteMiddleware(async (to, from) => {
  var _a;
  let __temp, __restore;
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    try {
      ;
      [__temp, __restore] = executeAsync(() => authStore.fetchCurrentUser()), await __temp, __restore();
      ;
    } catch (error) {
      return navigateTo("/auth/login");
    }
  }
  if (!authStore.isAuthenticated) {
    return navigateTo("/auth/login");
  }
  if (((_a = authStore.user) == null ? void 0 : _a.role) !== "administrador") {
    return navigateTo("/dashboard");
  }
});

export { admin as default };
//# sourceMappingURL=admin-D9nsj6Rr.mjs.map
