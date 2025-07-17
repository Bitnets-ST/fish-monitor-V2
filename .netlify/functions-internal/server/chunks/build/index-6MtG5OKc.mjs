import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'mongoose';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:module';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'pinia';
import 'vue-router';
import '@iconify/vue';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 bg-gray-50 dark:bg-gray-800 min-h-screen" }, _attrs))} data-v-2269b811><div class="max-w-4xl mx-auto" data-v-2269b811><div class="flex justify-between items-center mb-8" data-v-2269b811><h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100" data-v-2269b811> AJUSTES </h1></div><div class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6" data-v-2269b811><h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2" data-v-2269b811> Configuraci\xF3n del Sistema </h2><p class="text-gray-600 dark:text-gray-300" data-v-2269b811> Aqu\xED puedes configurar los par\xE1metros del sistema de monitoreo de peces. </p></div><div class="mt-8" data-v-2269b811><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4" data-v-2269b811> Contenido del Dashboard </h3><p class="text-gray-600 dark:text-gray-300" data-v-2269b811> Aqu\xED puedes agregar los componentes principales de tu dashboard, como gr\xE1ficos, tablas de datos, etc. </p><div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-md" data-v-2269b811><h4 class="text-lg font-semibold text-blue-700 dark:text-blue-300" data-v-2269b811> Panel de Control </h4><p class="text-blue-600 dark:text-blue-400" data-v-2269b811> Acceso completo al sistema de monitoreo. </p></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2269b811"]]);

export { index as default };
//# sourceMappingURL=index-6MtG5OKc.mjs.map
