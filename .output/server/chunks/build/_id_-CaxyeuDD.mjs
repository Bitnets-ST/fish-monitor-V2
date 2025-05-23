import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
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
import 'pinia';
import '@iconify/vue';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const zones = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ocean-background" }, _attrs))} data-v-df7d6850><div class="wave-container" data-v-df7d6850><div class="wave" data-v-df7d6850></div><div class="wave wave2" data-v-df7d6850></div><div class="wave wave3" data-v-df7d6850></div></div><div class="sucursales-container" data-v-df7d6850><div class="page-header" data-v-df7d6850><button class="back-btn" data-v-df7d6850><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" data-v-df7d6850><path fill="none" d="M0 0h24v24H0z" data-v-df7d6850></path><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="currentColor" data-v-df7d6850></path></svg> Volver a Sucursales </button><div class="title-bubble" data-v-df7d6850><h2 class="page-title" data-v-df7d6850>Zonas de la sucursal</h2></div></div><div class="flex flex-wrap gap-8 mb-6 justify-center" data-v-df7d6850><!--[-->`);
      ssrRenderList(zones.value, (zone) => {
        _push(`<div class="zone-card" data-v-df7d6850><div class="card-content" data-v-df7d6850><div class="zone-icon" data-v-df7d6850><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" data-v-df7d6850><path fill="none" d="M0 0h24v24H0z" data-v-df7d6850></path><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 6v2h8V9h-8zm0 4v2h8v-2h-8zm0 4v2h8v-2h-8zM7 9v2h2V9H7zm0 4v2h2v-2H7zm0 4v2h2v-2H7z" fill="rgba(255,255,255,0.9)" data-v-df7d6850></path></svg></div><span class="zone-name" data-v-df7d6850>${ssrInterpolate(zone.name)}</span>`);
        if (zone.estanques && zone.estanques.length) {
          _push(`<div class="tank-list" data-v-df7d6850><div class="tank-list-title" data-v-df7d6850>Estanques:</div><div class="tank-tags" data-v-df7d6850><!--[-->`);
          ssrRenderList(zone.estanques, (tank) => {
            _push(`<span class="tank-tag" data-v-df7d6850>${ssrInterpolate(tank.nombre)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<div class="tank-list-empty" data-v-df7d6850>No hay estanques</div>`);
        }
        _push(`<button class="ver-btn" data-v-df7d6850><span data-v-df7d6850>Ver Estanques</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" data-v-df7d6850><path fill="none" d="M0 0h24v24H0z" data-v-df7d6850></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" data-v-df7d6850></path></svg></button></div><div class="bubbles" data-v-df7d6850><div class="bubble bubble-1" data-v-df7d6850></div><div class="bubble bubble-2" data-v-df7d6850></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (zones.value.length === 0) {
        _push(`<div class="empty-state" data-v-df7d6850><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" data-v-df7d6850><path fill="none" d="M0 0h24v24H0z" data-v-df7d6850></path><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm1-5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1H9v2h1v3h4v-3h1v-2h-2zM8.567 4.813A8.528 8.528 0 0 0 7.4 8H4.746a10.028 10.028 0 0 1 3.82-3.187zm6.866 0A10.028 10.028 0 0 1 19.254 8H16.6a8.528 8.528 0 0 0-1.167-3.187z" fill="rgba(255,255,255,0.7)" data-v-df7d6850></path></svg><p data-v-df7d6850>No hay zonas registradas</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="fish fish-1" data-v-df7d6850></div><div class="fish fish-2" data-v-df7d6850></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/branch/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-df7d6850"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CaxyeuDD.mjs.map
