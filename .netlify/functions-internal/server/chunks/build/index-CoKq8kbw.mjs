import __nuxt_component_0 from './index-dB8gwxpQ.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const cameras = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const activeCameras = computed(() => {
      return cameras.value.filter((camera) => camera.active !== false).length;
    });
    const cameraTypes = computed(() => {
      const types = /* @__PURE__ */ new Set();
      cameras.value.forEach((camera) => {
        var _a;
        if ((_a = camera.camera_type) == null ? void 0 : _a.name) {
          types.add(camera.camera_type.name);
        }
      });
      return Array.from(types);
    });
    const getLastConnection = (camera) => {
      const times = ["Hace 2 minutos", "Hace 5 minutos", "Hace 10 minutos", "Hace 1 hora"];
      return times[Math.floor(Math.random() * times.length)];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cameras-container" }, _attrs))} data-v-ae580eef><div class="animated-bg" data-v-ae580eef><div class="floating-bubbles" data-v-ae580eef><!--[-->`);
      ssrRenderList(15, (i) => {
        _push(`<div class="bubble" style="${ssrRenderStyle({
          left: Math.random() * 100 + "%",
          animationDelay: Math.random() * 10 + "s",
          animationDuration: Math.random() * 10 + 10 + "s"
        })}" data-v-ae580eef></div>`);
      });
      _push(`<!--]--></div></div><div class="cameras-content" data-v-ae580eef><div class="header-section" data-v-ae580eef><div class="header-card" data-v-ae580eef><div class="header-icon" data-v-ae580eef>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:security",
        class: "text-6xl text-blue-400"
      }, null, _parent));
      _push(`</div><div class="header-text" data-v-ae580eef><h1 class="header-title" data-v-ae580eef>Sistema de C\xE1maras</h1><p class="header-subtitle" data-v-ae580eef>Monitoreo en Tiempo Real</p><div class="header-stats" data-v-ae580eef><div class="stat-item" data-v-ae580eef><span class="stat-number" data-v-ae580eef>${ssrInterpolate(cameras.value.length)}</span><span class="stat-label" data-v-ae580eef>C\xE1maras Totales</span></div><div class="stat-item" data-v-ae580eef><span class="stat-number" data-v-ae580eef>${ssrInterpolate(activeCameras.value)}</span><span class="stat-label" data-v-ae580eef>C\xE1maras Activas</span></div><div class="stat-item" data-v-ae580eef><span class="stat-number" data-v-ae580eef>${ssrInterpolate(cameraTypes.value.length)}</span><span class="stat-label" data-v-ae580eef>Tipos de C\xE1mara</span></div></div></div></div></div><div class="cameras-section" data-v-ae580eef><h2 class="section-title" data-v-ae580eef>C\xE1maras del Sistema</h2>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-ae580eef><div class="loading-spinner" data-v-ae580eef></div><p class="loading-text" data-v-ae580eef>Cargando c\xE1maras...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-ae580eef>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols:error",
          class: "text-4xl text-red-400 mb-4"
        }, null, _parent));
        _push(`<p class="error-text" data-v-ae580eef>${ssrInterpolate(error.value)}</p><button class="retry-button" data-v-ae580eef>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols:refresh",
          class: "mr-2"
        }, null, _parent));
        _push(` Reintentar </button></div>`);
      } else if (cameras.value.length === 0) {
        _push(`<div class="empty-state" data-v-ae580eef>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols:videocam-off",
          class: "text-4xl text-gray-400 mb-4"
        }, null, _parent));
        _push(`<p class="empty-text" data-v-ae580eef>No hay c\xE1maras registradas</p><p class="empty-subtext" data-v-ae580eef>Agrega tu primera c\xE1mara para comenzar el monitoreo</p></div>`);
      } else {
        _push(`<div class="cameras-grid" data-v-ae580eef><!--[-->`);
        ssrRenderList(cameras.value, (camera) => {
          var _a, _b;
          _push(`<div class="camera-card" data-v-ae580eef><div class="camera-video-placeholder" data-v-ae580eef><div class="video-overlay" data-v-ae580eef>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:videocam",
            class: "text-4xl text-white opacity-60"
          }, null, _parent));
          _push(`<div class="${ssrRenderClass([{ "status-active": camera.active !== false }, "camera-status"])}" data-v-ae580eef><div class="status-dot" data-v-ae580eef></div><span class="status-text" data-v-ae580eef>${ssrInterpolate(camera.active !== false ? "Activa" : "Inactiva")}</span></div></div><div class="video-controls" data-v-ae580eef><button class="control-btn" title="Ver en vivo" data-v-ae580eef>`);
          _push(ssrRenderComponent(_component_Icon, { name: "material-symbols:play-arrow" }, null, _parent));
          _push(`</button><button class="control-btn" title="Configurar" data-v-ae580eef>`);
          _push(ssrRenderComponent(_component_Icon, { name: "material-symbols:settings" }, null, _parent));
          _push(`</button><button class="control-btn" title="Grabar" data-v-ae580eef>`);
          _push(ssrRenderComponent(_component_Icon, { name: "material-symbols:fiber-manual-record" }, null, _parent));
          _push(`</button></div></div><div class="camera-info" data-v-ae580eef><div class="camera-header" data-v-ae580eef><h3 class="camera-name" data-v-ae580eef>${ssrInterpolate(camera.name)}</h3><div class="camera-type-badge" data-v-ae580eef>${ssrInterpolate(((_a = camera.camera_type) == null ? void 0 : _a.name) || "Gen\xE9rica")}</div></div><div class="camera-details" data-v-ae580eef><div class="detail-item" data-v-ae580eef>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:router",
            class: "detail-icon"
          }, null, _parent));
          _push(`<span class="detail-label" data-v-ae580eef>IP:</span><span class="detail-value" data-v-ae580eef>${ssrInterpolate(camera.camera_IP || "No configurada")}</span></div><div class="detail-item" data-v-ae580eef>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:location-on",
            class: "detail-icon"
          }, null, _parent));
          _push(`<span class="detail-label" data-v-ae580eef>Zona:</span><span class="detail-value" data-v-ae580eef>${ssrInterpolate(((_b = camera.zone_id) == null ? void 0 : _b.name) || camera.zone_id || "Sin asignar")}</span></div><div class="detail-item" data-v-ae580eef>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:schedule",
            class: "detail-icon"
          }, null, _parent));
          _push(`<span class="detail-label" data-v-ae580eef>\xDAltima conexi\xF3n:</span><span class="detail-value" data-v-ae580eef>${ssrInterpolate(getLastConnection())}</span></div></div><div class="camera-actions" data-v-ae580eef><button class="action-btn primary" data-v-ae580eef>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:visibility",
            class: "mr-2"
          }, null, _parent));
          _push(` Ver </button><button class="action-btn secondary" data-v-ae580eef>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:edit",
            class: "mr-2"
          }, null, _parent));
          _push(` Editar </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cameras/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ae580eef"]]);

export { index as default };
//# sourceMappingURL=index-CoKq8kbw.mjs.map
