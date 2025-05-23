import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 bg-gray-50 dark:bg-gray-800 min-h-screen" }, _attrs))} data-v-0d9a5ea1><div class="max-w-4xl mx-auto" data-v-0d9a5ea1><div class="flex justify-between items-center mb-8" data-v-0d9a5ea1><h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100" data-v-0d9a5ea1> AJUSTES </h1>`);
      if (unref(authStore).isAuthenticated) {
        _push(`<button class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm font-medium transition duration-150 ease-in-out" data-v-0d9a5ea1> Cerrar Sesi\xF3n </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(authStore).isAuthenticated && unref(authStore).user) {
        _push(`<div class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6" data-v-0d9a5ea1><h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2" data-v-0d9a5ea1> Bienvenido, ${ssrInterpolate(unref(authStore).user.name)}! </h2><p class="text-gray-600 dark:text-gray-300" data-v-0d9a5ea1> Tu rol es: <span class="font-medium text-indigo-600 dark:text-indigo-400" data-v-0d9a5ea1>${ssrInterpolate(unref(authStore).user.role)}</span></p><p class="text-gray-600 dark:text-gray-300 mt-1" data-v-0d9a5ea1> Email: ${ssrInterpolate(unref(authStore).user.email)}</p></div>`);
      } else if (unref(authStore).loading) {
        _push(`<div class="text-center py-10" data-v-0d9a5ea1><p class="text-gray-600 dark:text-gray-300" data-v-0d9a5ea1> Cargando informaci\xF3n del usuario... </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-8" data-v-0d9a5ea1><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4" data-v-0d9a5ea1> Contenido del Dashboard </h3><p class="text-gray-600 dark:text-gray-300" data-v-0d9a5ea1> Aqu\xED puedes agregar los componentes principales de tu dashboard, como gr\xE1ficos, tablas de datos, etc. </p>`);
      if (unref(authStore).isAdmin) {
        _push(`<div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-md" data-v-0d9a5ea1><h4 class="text-lg font-semibold text-blue-700 dark:text-blue-300" data-v-0d9a5ea1> Panel de Administrador </h4><p class="text-blue-600 dark:text-blue-400" data-v-0d9a5ea1> Este contenido solo es visible para administradores. </p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(authStore).isSupervisor) {
        _push(`<div class="mt-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md" data-v-0d9a5ea1><h4 class="text-lg font-semibold text-green-700 dark:text-green-300" data-v-0d9a5ea1> Panel de Supervisor </h4><p class="text-green-600 dark:text-green-400" data-v-0d9a5ea1> Este contenido es visible para supervisores y administradores. </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0d9a5ea1"]]);

export { index as default };
//# sourceMappingURL=index-BP4iaAzp.mjs.map
