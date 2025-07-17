import __nuxt_component_0 from './index-dB8gwxpQ.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const zones = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-container" }, _attrs))} data-v-5a6f5860><div class="content-wrapper" data-v-5a6f5860><div class="header-section" data-v-5a6f5860><button class="back-btn" data-v-5a6f5860>`);
      _push(ssrRenderComponent(_component_Icon, { name: "material-symbols:arrow-back" }, null, _parent));
      _push(` Volver </button><h1 class="page-title" data-v-5a6f5860>Zonas de la Sucursal</h1></div>`);
      if (zones.value.length === 0) {
        _push(`<div class="empty-state" data-v-5a6f5860>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols:location-off",
          class: "empty-icon",
          size: "64"
        }, null, _parent));
        _push(`<h3 data-v-5a6f5860>No hay zonas registradas</h3><p data-v-5a6f5860>Esta sucursal no tiene zonas configuradas a\xFAn.</p></div>`);
      } else {
        _push(`<div class="zones-grid" data-v-5a6f5860><!--[-->`);
        ssrRenderList(zones.value, (zone) => {
          _push(`<div class="zone-card" data-v-5a6f5860><div class="zone-header" data-v-5a6f5860><div class="zone-icon" data-v-5a6f5860>`);
          _push(ssrRenderComponent(_component_Icon, { name: "material-symbols:location-on" }, null, _parent));
          _push(`</div><div class="zone-title-section" data-v-5a6f5860><h3 class="zone-name" data-v-5a6f5860>${ssrInterpolate(zone.name)}</h3><span class="zone-status" data-v-5a6f5860>Activa</span></div></div><div class="tank-section" data-v-5a6f5860><h4 class="section-title" data-v-5a6f5860>Estanques (${ssrInterpolate(zone.estanques.length)})</h4>`);
          if (zone.estanques.length === 0) {
            _push(`<div class="no-tanks" data-v-5a6f5860> No hay estanques en esta zona </div>`);
          } else {
            _push(`<div class="tank-grid" data-v-5a6f5860><!--[-->`);
            ssrRenderList(zone.estanques.slice(0, 4), (tank) => {
              _push(`<div class="tank-item" data-v-5a6f5860><div class="tank-indicator" data-v-5a6f5860></div><span class="tank-name" data-v-5a6f5860>${ssrInterpolate(tank.nombre || tank.name || "Estanque")}</span></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`<button class="view-details-btn" data-v-5a6f5860>`);
          _push(ssrRenderComponent(_component_Icon, { name: "material-symbols:visibility" }, null, _parent));
          _push(` Ver Estanques </button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/branch/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5a6f5860"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CEiEi0ly.mjs.map
