import { ssrRenderAttrs } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
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
    useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a0ff46e2><p class="text-gray-700 dark:text-gray-200" data-v-a0ff46e2>Cargando...</p><h1 class="text-2xl font-semibold" data-v-a0ff46e2>Inicio</h1></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a0ff46e2"]]);

export { index as default };
//# sourceMappingURL=index-CFshEitp.mjs.map
