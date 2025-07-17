import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
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
import '@iconify/vue';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const tanks = ref([]);
    const isLoading = ref(true);
    const formatCapacity = (capacity) => {
      if (!capacity) return "N/A";
      return capacity >= 1e3 ? `${(capacity / 1e3).toFixed(1)}K L` : `${capacity} L`;
    };
    const formatBiomass = (biomass) => {
      if (!biomass) return "N/A";
      return `${biomass} kg`;
    };
    const formatDate = (date) => {
      if (!date) return "No disponible";
      return new Date(date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getStatusClass = (status) => {
      const statusMap = {
        "activo": "status-active",
        "inactivo": "status-inactive",
        "mantenimiento": "status-maintenance",
        "operativo": "status-active"
      };
      return statusMap[status == null ? void 0 : status.toLowerCase()] || "status-unknown";
    };
    const getOccupancyPercentage = (tank) => {
      var _a;
      if (!tank.capacidad || !((_a = tank.poblaci\u00F3n) == null ? void 0 : _a.biomasa_kg)) return 0;
      const idealDensity = tank.capacidad / 10;
      return Math.min(Math.round(tank.poblaci\u00F3n.biomasa_kg / idealDensity * 100), 100);
    };
    const getProgressClass = (percentage) => {
      if (percentage <= 50) return "progress-low";
      if (percentage <= 80) return "progress-medium";
      return "progress-high";
    };
    const getBubbleStyle = (index) => {
      const size = Math.random() * 60 + 20;
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 5;
      const animationDuration = Math.random() * 3 + 2;
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "estanques-page" }, _attrs))} data-v-2b974233><div class="animated-background" data-v-2b974233><div class="floating-bubbles" data-v-2b974233><!--[-->`);
      ssrRenderList(8, (i) => {
        _push(`<div class="bubble" style="${ssrRenderStyle(getBubbleStyle())}" data-v-2b974233></div>`);
      });
      _push(`<!--]--></div><div class="wave-animation" data-v-2b974233><svg viewBox="0 0 1200 120" preserveAspectRatio="none" data-v-2b974233><path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" fill="rgba(99, 102, 241, 0.05)" data-v-2b974233></path></svg></div></div><div class="page-header" data-v-2b974233><button class="back-btn-new" data-v-2b974233><div class="btn-icon" data-v-2b974233><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2b974233><path d="M19 12H5M12 19l-7-7 7-7" data-v-2b974233></path></svg></div><span data-v-2b974233>Volver a Zonas</span></button><div class="header-content" data-v-2b974233><h1 class="page-title" data-v-2b974233>Estanques de la Zona</h1><p class="page-subtitle" data-v-2b974233>Gesti\xF3n y monitoreo de estanques acu\xEDcolas</p></div></div><div class="tanks-container" data-v-2b974233><div class="tanks-grid" data-v-2b974233><!--[-->`);
      ssrRenderList(tanks.value, (tank, index) => {
        var _a, _b;
        _push(`<div class="tank-card-new" style="${ssrRenderStyle({ animationDelay: `${index * 0.1}s` })}" data-v-2b974233><div class="card-header" data-v-2b974233><div class="${ssrRenderClass([getStatusClass(tank.estado), "tank-status"])}" data-v-2b974233><div class="status-indicator" data-v-2b974233></div><span data-v-2b974233>${ssrInterpolate(tank.estado || "Sin estado")}</span></div><div class="card-actions" data-v-2b974233><button class="action-btn info-btn" title="Ver detalles" data-v-2b974233><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2b974233><circle cx="12" cy="12" r="10" data-v-2b974233></circle><line x1="12" y1="16" x2="12" y2="12" data-v-2b974233></line><line x1="12" y1="8" x2="12.01" y2="8" data-v-2b974233></line></svg></button><button class="action-btn pdf-btn-new" title="Generar PDF" data-v-2b974233><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2b974233><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-2b974233></path><polyline points="14,2 14,8 20,8" data-v-2b974233></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-2b974233></line><line x1="16" y1="17" x2="8" y2="17" data-v-2b974233></line><polyline points="10,9 9,9 8,9" data-v-2b974233></polyline></svg></button></div></div><div class="tank-name" data-v-2b974233><div class="tank-icon" data-v-2b974233><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-2b974233><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12z" data-v-2b974233></path></svg></div><h3 data-v-2b974233>${ssrInterpolate(tank.nombre || "Estanque sin nombre")}</h3></div><div class="metrics-grid" data-v-2b974233><div class="metric-item" data-v-2b974233><div class="metric-icon capacity" data-v-2b974233><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2b974233><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-2b974233></path></svg></div><div class="metric-content" data-v-2b974233><span class="metric-label" data-v-2b974233>Capacidad</span><span class="metric-value" data-v-2b974233>${ssrInterpolate(formatCapacity(tank.capacidad))}</span></div></div><div class="metric-item" data-v-2b974233><div class="metric-icon biomass" data-v-2b974233><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2b974233><path d="M6.5 12c.94-3.46 4.94-6 8.5-6s7.56 2.54 8.5 6c-.94 3.46-4.94 6-8.5 6s-7.56-2.54-8.5-6z" data-v-2b974233></path><circle cx="12" cy="14" r="3" data-v-2b974233></circle></svg></div><div class="metric-content" data-v-2b974233><span class="metric-label" data-v-2b974233>Biomasa</span><span class="metric-value" data-v-2b974233>${ssrInterpolate(formatBiomass((_a = tank.poblaci\u00F3n) == null ? void 0 : _a.biomasa_kg))}</span></div></div><div class="metric-item" data-v-2b974233><div class="metric-icon type" data-v-2b974233><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2b974233><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-v-2b974233></rect><circle cx="9" cy="9" r="2" data-v-2b974233></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" data-v-2b974233></path></svg></div><div class="metric-content" data-v-2b974233><span class="metric-label" data-v-2b974233>Tipo</span><span class="metric-value" data-v-2b974233>${ssrInterpolate(tank.tipo || "N/A")}</span></div></div><div class="metric-item" data-v-2b974233><div class="metric-icon material" data-v-2b974233><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2b974233><path d="M12 2L2 7l10 5 10-5-10-5z" data-v-2b974233></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5" data-v-2b974233></path></svg></div><div class="metric-content" data-v-2b974233><span class="metric-label" data-v-2b974233>Material</span><span class="metric-value" data-v-2b974233>${ssrInterpolate(tank.material || "N/A")}</span></div></div></div>`);
        if (tank.capacidad && ((_b = tank.poblaci\u00F3n) == null ? void 0 : _b.biomasa_kg)) {
          _push(`<div class="progress-section" data-v-2b974233><div class="progress-label" data-v-2b974233><span data-v-2b974233>Ocupaci\xF3n</span><span class="progress-percentage" data-v-2b974233>${ssrInterpolate(getOccupancyPercentage(tank))}%</span></div><div class="progress-bar" data-v-2b974233><div style="${ssrRenderStyle({ width: getOccupancyPercentage(tank) + "%" })}" class="${ssrRenderClass([getProgressClass(getOccupancyPercentage(tank)), "progress-fill"])}" data-v-2b974233></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="card-footer" data-v-2b974233><div class="last-update" data-v-2b974233><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2b974233><circle cx="12" cy="12" r="10" data-v-2b974233></circle><polyline points="12,6 12,12 16,14" data-v-2b974233></polyline></svg><span data-v-2b974233>\xDAltima actualizaci\xF3n: ${ssrInterpolate(formatDate(tank.\u00FAltima_inspecci\u00F3n))}</span></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (tanks.value.length === 0) {
        _push(`<div class="empty-state" data-v-2b974233><div class="empty-icon" data-v-2b974233><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" data-v-2b974233><circle cx="12" cy="12" r="10" data-v-2b974233></circle><path d="M8 12h8M12 8v8" data-v-2b974233></path></svg></div><h3 data-v-2b974233>No hay estanques registrados</h3><p data-v-2b974233>Esta zona a\xFAn no tiene estanques configurados. Contacta al administrador para agregar estanques.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (isLoading.value) {
        _push(`<div class="loading-overlay" data-v-2b974233><div class="loading-spinner" data-v-2b974233><div class="spinner" data-v-2b974233></div><p data-v-2b974233>Cargando estanques...</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/tank/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2b974233"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-D3GwheGv.mjs.map
