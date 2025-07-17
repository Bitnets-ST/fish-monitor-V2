import { _ as _export_sfc, a as __nuxt_component_1$1 } from './server.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8" }, _attrs))} data-v-6c4348d8><div class="max-w-4xl mx-auto text-center" data-v-6c4348d8><h1 class="text-4xl font-bold text-white mb-4" data-v-6c4348d8>Fish Monitor</h1><p class="text-xl text-gray-300 mb-8" data-v-6c4348d8>Sistema de Monitoreo de Peces</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" data-v-6c4348d8><div class="bg-gray-800 p-6 rounded-lg" data-v-6c4348d8><h3 class="text-xl font-semibold mb-4" data-v-6c4348d8>Dashboard</h3><p class="text-gray-300 mb-4" data-v-6c4348d8>Accede al panel principal del sistema</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ir al Dashboard `);
          } else {
            return [
              createTextVNode(" Ir al Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-gray-800 p-6 rounded-lg" data-v-6c4348d8><h3 class="text-xl font-semibold mb-4" data-v-6c4348d8>C\xE1maras</h3><p class="text-gray-300 mb-4" data-v-6c4348d8>Monitorear c\xE1maras de seguridad</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cameras",
        class: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ver C\xE1maras `);
          } else {
            return [
              createTextVNode(" Ver C\xE1maras ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-gray-800 p-6 rounded-lg" data-v-6c4348d8><h3 class="text-xl font-semibold mb-4" data-v-6c4348d8>Configuraci\xF3n</h3><p class="text-gray-300 mb-4" data-v-6c4348d8>Ajustes del sistema</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/settings",
        class: "bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Configuraci\xF3n `);
          } else {
            return [
              createTextVNode(" Configuraci\xF3n ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c4348d8"]]);

export { index as default };
//# sourceMappingURL=index-D79D61j3.mjs.map
