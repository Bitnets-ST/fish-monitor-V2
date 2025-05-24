import __nuxt_component_0 from './index-DTWANCmL.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './asyncData-Cn9zLTlz.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const cameras = ref([]);
    const loading = ref(true);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "camera-page-container" }, _attrs))} data-v-f1b740d7><div class="camera-content-wrapper" data-v-f1b740d7><h2 class="page-title mb-6" data-v-f1b740d7>Lista de C\xE1maras</h2>`);
      if (loading.value) {
        _push(`<div class="text-center text-gray-500" data-v-f1b740d7>Cargando c\xE1maras...</div>`);
      } else if (error.value) {
        _push(`<div class="text-center text-red-500" data-v-f1b740d7>Error: ${ssrInterpolate(error.value)}</div>`);
      } else if (cameras.value.length === 0) {
        _push(`<div class="text-center text-gray-500" data-v-f1b740d7>No hay c\xE1maras registradas.</div>`);
      } else {
        _push(`<div class="camera-grid" data-v-f1b740d7><!--[-->`);
        ssrRenderList(cameras.value, (camera) => {
          var _a, _b;
          _push(`<div class="camera-card" data-v-f1b740d7><div class="camera-placeholder" data-v-f1b740d7>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:camera",
            size: "48",
            class: "text-gray-400"
          }, null, _parent));
          _push(`</div><div class="camera-info" data-v-f1b740d7><h3 class="camera-name" data-v-f1b740d7>${ssrInterpolate(camera.name)}</h3><p data-v-f1b740d7><b data-v-f1b740d7>IP:</b> ${ssrInterpolate(camera.camera_IP)}</p><p data-v-f1b740d7><b data-v-f1b740d7>Tipo:</b> ${ssrInterpolate(((_a = camera.camera_type) == null ? void 0 : _a.name) || "N/A")}</p><p data-v-f1b740d7><b data-v-f1b740d7>Zona:</b> ${ssrInterpolate(((_b = camera.zone_id) == null ? void 0 : _b.name) || camera.zone_id || "N/A")}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cameras/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f1b740d7"]]);

export { index as default };
//# sourceMappingURL=index-Dk4vFKsC.mjs.map
