import { mergeProps, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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

const _sfc_main$1 = {
  __name: "Sucursales",
  __ssrInlineRender: true,
  setup(__props) {
    const branches = ref([]);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ocean-background" }, _attrs))} data-v-2ed4e518><div class="wave-container" data-v-2ed4e518><div class="wave" data-v-2ed4e518></div><div class="wave wave2" data-v-2ed4e518></div><div class="wave wave3" data-v-2ed4e518></div></div><div class="sucursales-page-container" data-v-2ed4e518><div class="page-header" data-v-2ed4e518><div class="title-bubble" data-v-2ed4e518><h2 class="page-title" data-v-2ed4e518>Sucursales</h2></div></div><div class="flex flex-wrap gap-8 mb-6 justify-center" data-v-2ed4e518><!--[-->`);
      ssrRenderList(branches.value, (branch) => {
        _push(`<div class="branch-card" data-v-2ed4e518><div class="card-content" data-v-2ed4e518><div class="branch-icon" data-v-2ed4e518><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" data-v-2ed4e518><path fill="none" d="M0 0h24v24H0z" data-v-2ed4e518></path><path d="M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm14 8h-2v7h2v-7z" fill="rgba(255,255,255,0.9)" data-v-2ed4e518></path></svg></div><span class="branch-name" data-v-2ed4e518>${ssrInterpolate(branch.name)}</span>`);
        if (branch.zonas && branch.zonas.length) {
          _push(`<div class="zone-list" data-v-2ed4e518><div class="zone-list-title" data-v-2ed4e518>Zonas:</div><div class="zone-tags" data-v-2ed4e518><!--[-->`);
          ssrRenderList(branch.zonas, (zona) => {
            _push(`<span class="zone-tag" data-v-2ed4e518>${ssrInterpolate(zona.name)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<div class="zone-list-empty" data-v-2ed4e518>No hay zonas registradas</div>`);
        }
        _push(`<button class="ver-btn" data-v-2ed4e518><span data-v-2ed4e518>Ver</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" data-v-2ed4e518><path fill="none" d="M0 0h24v24H0z" data-v-2ed4e518></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" data-v-2ed4e518></path></svg></button></div><div class="bubbles" data-v-2ed4e518><div class="bubble bubble-1" data-v-2ed4e518></div><div class="bubble bubble-2" data-v-2ed4e518></div><div class="bubble bubble-3" data-v-2ed4e518></div><div class="bubble bubble-4" data-v-2ed4e518></div></div></div>`);
      });
      _push(`<!--]--></div><div class="fish fish-1" data-v-2ed4e518></div><div class="fish fish-2" data-v-2ed4e518></div><div class="fish fish-3" data-v-2ed4e518></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sucursales.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Sucursales = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2ed4e518"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-center w-full" }, _attrs))} data-v-0ac437f2><div class="w-full flex flex-col items-center" data-v-0ac437f2>`);
      _push(ssrRenderComponent(Sucursales, { class: "mt-8" }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ac437f2"]]);

export { index as default };
//# sourceMappingURL=index-sAgBjR9X.mjs.map
