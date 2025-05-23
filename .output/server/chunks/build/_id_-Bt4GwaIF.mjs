import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
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
import 'pinia';
import '@iconify/vue';

const _imports_0 = publicAssetsURL("/source.gif");
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const tanks = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "estanques-page flex flex-center" }, _attrs))} data-v-eb36a7c0><img${ssrRenderAttr("src", _imports_0)} class="background-gif" alt="Peces nadando de fondo" data-v-eb36a7c0> [] <div class="w-full flex flex-col items-center" data-v-eb36a7c0><button class="back-btn" data-v-eb36a7c0><span class="material-icons" data-v-eb36a7c0> Volver a Zonas </span></button><h2 class="text-lg font-bold mb-6" data-v-eb36a7c0>Estanques de la zona</h2><div class="flex flex-wrap gap-6 mb-6 justify-center" data-v-eb36a7c0><!--[-->`);
      ssrRenderList(tanks.value, (tank) => {
        var _a;
        _push(`<div class="tank-card" data-v-eb36a7c0><div class="tank-title" data-v-eb36a7c0>${ssrInterpolate(tank.nombre)}</div><div class="tank-info" data-v-eb36a7c0><b data-v-eb36a7c0>Capacidad:</b> ${ssrInterpolate(tank.capacidad || "N/A")}</div><div class="tank-info" data-v-eb36a7c0><b data-v-eb36a7c0>Tipo:</b> ${ssrInterpolate(tank.tipo || "N/A")}</div><div class="tank-info" data-v-eb36a7c0><b data-v-eb36a7c0>Material:</b> ${ssrInterpolate(tank.material || "N/A")}</div><div class="tank-info" data-v-eb36a7c0><b data-v-eb36a7c0>Biomasa:</b> ${ssrInterpolate(((_a = tank.poblaci\u00F3n) == null ? void 0 : _a.biomasa_kg) || "N/A")} kg </div><div class="tank-info" data-v-eb36a7c0><b data-v-eb36a7c0>Estado:</b> ${ssrInterpolate(tank.estado || "N/A")}</div><button class="pdf-btn" data-v-eb36a7c0>PDF</button></div>`);
      });
      _push(`<!--]--></div>`);
      if (tanks.value.length === 0) {
        _push(`<div class="text-gray-500" data-v-eb36a7c0> No hay estanques registrados en esta zona. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/tank/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb36a7c0"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Bt4GwaIF.mjs.map
