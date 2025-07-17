import __nuxt_component_0 from './index-dB8gwxpQ.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
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
    const stats = ref({
      activeTanks: 12,
      totalCameras: 8,
      zones: 4
    });
    const systemStatus = ref({
      temperature: 24.5,
      oxygen: 85,
      ph: 7.2
    });
    const activeCameras = ref([
      { id: 1, name: "C\xE1mara 1", active: true },
      { id: 2, name: "C\xE1mara 2", active: true },
      { id: 3, name: "C\xE1mara 3", active: false },
      { id: 4, name: "C\xE1mara 4", active: true }
    ]);
    const recentActivity = ref([
      {
        id: 1,
        type: "info",
        icon: "material-symbols:info",
        message: "Nueva medici\xF3n de temperatura registrada",
        time: "Hace 2 minutos"
      },
      {
        id: 2,
        type: "warning",
        icon: "material-symbols:warning",
        message: "Nivel de ox\xEDgeno bajo en Zona 2",
        time: "Hace 5 minutos"
      },
      {
        id: 3,
        type: "success",
        icon: "material-symbols:check-circle",
        message: "Sistema de alimentaci\xF3n activado",
        time: "Hace 10 minutos"
      },
      {
        id: 4,
        type: "info",
        icon: "material-symbols:videocam",
        message: "C\xE1mara 3 desconectada para mantenimiento",
        time: "Hace 15 minutos"
      }
    ]);
    const quickActions = ref([
      {
        id: 1,
        title: "Ver C\xE1maras",
        description: "Monitorear en tiempo real",
        icon: "material-symbols:security",
        route: "/cameras",
        hover: false
      },
      {
        id: 2,
        title: "Gestionar Sucursales",
        description: "Administrar ubicaciones",
        icon: "material-symbols:business",
        route: "/settings/control-panel",
        hover: false
      },
      {
        id: 3,
        title: "Configuraci\xF3n",
        description: "Ajustes del sistema",
        icon: "material-symbols:settings",
        route: "/settings",
        hover: false
      },
      {
        id: 4,
        title: "Reportes",
        description: "Generar informes",
        icon: "material-symbols:assessment",
        route: "/reports",
        hover: false
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-container" }, _attrs))} data-v-3a0b70fc><div class="animated-bg" data-v-3a0b70fc><div class="floating-bubbles" data-v-3a0b70fc><!--[-->`);
      ssrRenderList(20, (i) => {
        _push(`<div class="bubble" style="${ssrRenderStyle({
          left: Math.random() * 100 + "%",
          animationDelay: Math.random() * 10 + "s",
          animationDuration: Math.random() * 10 + 10 + "s"
        })}" data-v-3a0b70fc></div>`);
      });
      _push(`<!--]--></div></div><div class="dashboard-content" data-v-3a0b70fc><div class="welcome-section" data-v-3a0b70fc><div class="welcome-card" data-v-3a0b70fc><div class="welcome-icon" data-v-3a0b70fc>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:water",
        class: "text-6xl text-blue-400"
      }, null, _parent));
      _push(`</div><div class="welcome-text" data-v-3a0b70fc><h1 class="welcome-title" data-v-3a0b70fc>Fish Monitor</h1><p class="welcome-subtitle" data-v-3a0b70fc>Sistema de Monitoreo Inteligente</p><div class="welcome-stats" data-v-3a0b70fc><div class="stat-item" data-v-3a0b70fc><span class="stat-number" data-v-3a0b70fc>${ssrInterpolate(stats.value.activeTanks)}</span><span class="stat-label" data-v-3a0b70fc>Estanques Activos</span></div><div class="stat-item" data-v-3a0b70fc><span class="stat-number" data-v-3a0b70fc>${ssrInterpolate(stats.value.totalCameras)}</span><span class="stat-label" data-v-3a0b70fc>C\xE1maras</span></div><div class="stat-item" data-v-3a0b70fc><span class="stat-number" data-v-3a0b70fc>${ssrInterpolate(stats.value.zones)}</span><span class="stat-label" data-v-3a0b70fc>Zonas</span></div></div></div></div></div><div class="quick-actions" data-v-3a0b70fc><h2 class="section-title" data-v-3a0b70fc>Acciones R\xE1pidas</h2><div class="actions-grid" data-v-3a0b70fc><!--[-->`);
      ssrRenderList(quickActions.value, (action) => {
        _push(`<div class="action-card" data-v-3a0b70fc><div class="${ssrRenderClass([{ "icon-hover": action.hover }, "action-icon"])}" data-v-3a0b70fc>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: action.icon,
          class: "text-3xl"
        }, null, _parent));
        _push(`</div><h3 class="action-title" data-v-3a0b70fc>${ssrInterpolate(action.title)}</h3><p class="action-description" data-v-3a0b70fc>${ssrInterpolate(action.description)}</p><div class="${ssrRenderClass([{ "arrow-hover": action.hover }, "action-arrow"])}" data-v-3a0b70fc>`);
        _push(ssrRenderComponent(_component_Icon, { name: "material-symbols:arrow-forward" }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div><div class="monitoring-section" data-v-3a0b70fc><h2 class="section-title" data-v-3a0b70fc>Monitoreo en Tiempo Real</h2><div class="monitoring-grid" data-v-3a0b70fc><div class="monitor-card" data-v-3a0b70fc><div class="monitor-header" data-v-3a0b70fc>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:monitoring",
        class: "text-2xl text-green-400"
      }, null, _parent));
      _push(`<span class="monitor-title" data-v-3a0b70fc>Estado del Sistema</span><div class="status-indicator online" data-v-3a0b70fc></div></div><div class="monitor-content" data-v-3a0b70fc><div class="status-item" data-v-3a0b70fc><span class="status-label" data-v-3a0b70fc>Temperatura Promedio</span><span class="status-value" data-v-3a0b70fc>${ssrInterpolate(systemStatus.value.temperature)}\xB0C</span></div><div class="status-item" data-v-3a0b70fc><span class="status-label" data-v-3a0b70fc>Nivel de Ox\xEDgeno</span><span class="status-value" data-v-3a0b70fc>${ssrInterpolate(systemStatus.value.oxygen)}%</span></div><div class="status-item" data-v-3a0b70fc><span class="status-label" data-v-3a0b70fc>pH del Agua</span><span class="status-value" data-v-3a0b70fc>${ssrInterpolate(systemStatus.value.ph)}</span></div></div></div><div class="monitor-card" data-v-3a0b70fc><div class="monitor-header" data-v-3a0b70fc>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:security",
        class: "text-2xl text-blue-400"
      }, null, _parent));
      _push(`<span class="monitor-title" data-v-3a0b70fc>C\xE1maras Activas</span><div class="status-indicator online" data-v-3a0b70fc></div></div><div class="monitor-content" data-v-3a0b70fc><div class="camera-grid" data-v-3a0b70fc><!--[-->`);
      ssrRenderList(activeCameras.value, (camera) => {
        _push(`<div class="${ssrRenderClass([{ "camera-active": camera.active }, "camera-item"])}" data-v-3a0b70fc>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols:videocam",
          class: "text-xl"
        }, null, _parent));
        _push(`<span class="camera-name" data-v-3a0b70fc>${ssrInterpolate(camera.name)}</span></div>`);
      });
      _push(`<!--]--></div></div></div></div></div><div class="activity-section" data-v-3a0b70fc><h2 class="section-title" data-v-3a0b70fc>Actividad Reciente</h2><div class="activity-timeline" data-v-3a0b70fc><!--[-->`);
      ssrRenderList(recentActivity.value, (activity) => {
        _push(`<div class="activity-item" data-v-3a0b70fc><div class="${ssrRenderClass([activity.type, "activity-icon"])}" data-v-3a0b70fc>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: activity.icon
        }, null, _parent));
        _push(`</div><div class="activity-content" data-v-3a0b70fc><p class="activity-text" data-v-3a0b70fc>${ssrInterpolate(activity.message)}</p><span class="activity-time" data-v-3a0b70fc>${ssrInterpolate(activity.time)}</span></div></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a0b70fc"]]);

export { index as default };
//# sourceMappingURL=index-DO-zwLz0.mjs.map
