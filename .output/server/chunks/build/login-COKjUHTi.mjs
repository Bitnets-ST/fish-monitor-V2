import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-AnSpNAX4.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'pinia';
import '../_/nitro.mjs';
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
import '@vue/shared';
import './asyncData-Cn9zLTlz.mjs';
import 'vue-router';
import '@iconify/vue';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900" }, _attrs))} data-v-70133850><div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md" data-v-70133850><h1 class="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6" data-v-70133850> Iniciar Sesi\xF3n </h1><form data-v-70133850><div class="mb-4" data-v-70133850><label for="email" class="block text-sm font-medium text-gray-600 dark:text-gray-300" data-v-70133850>Email</label><input type="email" id="email"${ssrRenderAttr("value", email.value)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="tu@email.com" data-v-70133850></div><div class="mb-6" data-v-70133850><label for="password" class="block text-sm font-medium text-gray-600 dark:text-gray-300" data-v-70133850>Contrase\xF1a</label><input type="password" id="password"${ssrRenderAttr("value", password.value)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" data-v-70133850></div>`);
      if (unref(authStore).error) {
        _push(`<div class="mb-4 text-red-500 text-sm" data-v-70133850>${ssrInterpolate(unref(authStore).error)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(authStore).loading) ? " disabled" : ""} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50" data-v-70133850>`);
      if (unref(authStore).loading) {
        _push(`<span data-v-70133850>Cargando...</span>`);
      } else {
        _push(`<span data-v-70133850>Ingresar</span>`);
      }
      _push(`</button></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-70133850"]]);

export { login as default };
//# sourceMappingURL=login-COKjUHTi.mjs.map
