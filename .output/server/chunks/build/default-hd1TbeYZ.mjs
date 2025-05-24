import __nuxt_component_0$1 from './index-DTWANCmL.mjs';
import { mergeProps, defineComponent, ref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, computed, useSSRContext } from 'vue';
import { u as useAuthStore } from './auth-AnSpNAX4.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, a as __nuxt_component_1$1 } from './server.mjs';
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
import '@vue/shared';

const _sfc_main$3 = defineComponent({
  name: "AppHeader",
  emits: ["toggle-sidebar"],
  setup() {
    const authStore = useAuthStore();
    const handleLogout = async () => {
      await authStore.logout();
    };
    return {
      authStore,
      handleLogout
    };
  }
  // Si prefieres Options API y no usar setup():
  // computed: {
  //   authStore() {
  //     return useAuthStore();
  //   }
  // },
  // methods: {
  //   async handleLogout() {
  //     await this.authStore.logout();
  //   }
  // }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Icon = __nuxt_component_0$1;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 bg-gray-800 z-30 h-16" }, _attrs))}><div class="flex items-center justify-between h-full px-4"><button class="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "material-symbols:menu-rounded",
    class: "h-6 w-6 text-white"
  }, null, _parent));
  _push(`</button><div class="flex-1 text-center"><h1 class="text-xl font-semibold text-white">Fish Monitor</h1></div><div class="flex items-center space-x-4">`);
  if (_ctx.authStore.isAuthenticated && _ctx.authStore.user) {
    _push(`<div class="text-white"><span class="text-sm">Hola, ${ssrInterpolate(_ctx.authStore.user.name)}</span></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.authStore.isAuthenticated) {
    _push(`<button class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md shadow-sm font-medium transition duration-150 ease-in-out"> Salir </button>`);
  } else {
    _push(`<div class="w-8"></div>`);
  }
  _push(`</div></div></header>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/appHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = {
  __name: "GlobalStatsHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const stats = ref(null);
    const loading = ref(true);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      if (stats.value && !loading.value && !error.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-700 text-white p-4" }, _attrs))} data-v-7af87f75><div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center" data-v-7af87f75><div class="bg-blue-600 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[100px]" data-v-7af87f75>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:fishbowl-outline",
          class: "text-3xl mb-2"
        }, null, _parent));
        _push(`<p class="text-sm font-medium" data-v-7af87f75>Total Estanques</p><p class="text-2xl font-bold" data-v-7af87f75>${ssrInterpolate(stats.value.totalTanks !== null ? stats.value.totalTanks : "N/A")}</p></div><div class="bg-green-600 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[100px]" data-v-7af87f75>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:fish",
          class: "text-3xl mb-2"
        }, null, _parent));
        _push(`<p class="text-sm font-medium" data-v-7af87f75>Total Peces</p><p class="text-2xl font-bold" data-v-7af87f75>${ssrInterpolate(stats.value.totalFish !== null ? stats.value.totalFish : "N/A")}</p></div><div class="bg-yellow-500 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[100px]" data-v-7af87f75>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:thermometer",
          class: "text-3xl mb-2"
        }, null, _parent));
        _push(`<p class="text-sm font-medium" data-v-7af87f75>Temp. Promedio</p><p class="text-2xl font-bold" data-v-7af87f75>${ssrInterpolate(stats.value.averageTemperature !== null ? stats.value.averageTemperature + "\xB0C" : "N/A")}</p></div><div class="bg-purple-600 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[100px]" data-v-7af87f75>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:weight-kilogram",
          class: "text-3xl mb-2"
        }, null, _parent));
        _push(`<p class="text-sm font-medium" data-v-7af87f75>Biomasa Total</p><p class="text-2xl font-bold" data-v-7af87f75>${ssrInterpolate(stats.value.totalBiomassKg !== null ? stats.value.totalBiomassKg + " kg" : "N/A")}</p></div></div></div>`);
      } else if (loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800 text-white p-4 text-center" }, _attrs))} data-v-7af87f75> Cargando estad\xEDsticas... </div>`);
      } else if (error.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-red-700 text-white p-4 text-center" }, _attrs))} data-v-7af87f75> Error al cargar estad\xEDsticas: ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GlobalStatsHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7af87f75"]]);
const _sfc_main$1 = {
  name: "AppSidebar",
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const authStore = useAuthStore();
    const baseMenuItems = [
      {
        path: "/dashboard",
        title: "Dashboard",
        icon: "material-symbols:dashboard-outline-rounded"
      },
      {
        path: "/settings",
        title: "Ajustes",
        icon: "material-symbols:settings-outline-rounded"
      },
      {
        path: "/cameras",
        title: "Camaras",
        icon: "material-symbols:security"
      }
    ];
    const visibleMenuItems = computed(() => {
      const items = [...baseMenuItems];
      if (authStore.isAdmin) {
        items.push({
          path: "/settings/control-panel",
          // Ruta a tu panel de control
          title: "Panel de Control",
          icon: "material-symbols:admin-panel-settings-outline-rounded"
          // Ejemplo de ícono
        });
      }
      return items;
    });
    return {
      visibleMenuItems
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Icon = __nuxt_component_0$1;
  const _component_NuxtLink = __nuxt_component_1$1;
  _push(`<aside${ssrRenderAttrs(mergeProps({
    class: ["fixed top-16 left-0 bottom-0 bg-gray-800 text-white transition-none z-20", $props.isOpen ? "w-64" : "w-16"],
    style: { "transition-property": "width", "transition-duration": "0ms" }
  }, _attrs))}><div class="h-full flex flex-col"><div class="${ssrRenderClass([$props.isOpen ? "justify-start" : "justify-center", "p-4 flex items-center"])}">`);
  if (!$props.isOpen) {
    _push(ssrRenderComponent(_component_Icon, {
      name: "material-symbols:water- \u092E\u091B\u0932\u0940",
      class: "h-8 w-8 text-blue-400"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($props.isOpen) {
    _push(`<span class="text-xl font-bold ml-2">FishMonitor</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><nav class="mt-4 flex-grow"><ul><!--[-->`);
  ssrRenderList($setup.visibleMenuItems, (item) => {
    _push(`<li class="mb-1">`);
    _push(ssrRenderComponent(_component_NuxtLink, {
      to: item.path,
      class: "flex items-center py-2 px-3 mx-2 rounded hover:bg-gray-700",
      title: item.title,
      "active-class": "bg-gray-600 font-semibold"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<span class="flex items-center justify-center w-8 h-8"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: item.icon,
            class: "h-5 w-5"
          }, null, _parent2, _scopeId));
          _push2(`</span>`);
          if ($props.isOpen) {
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
          } else {
            _push2(`<!---->`);
          }
        } else {
          return [
            createVNode("span", { class: "flex items-center justify-center w-8 h-8" }, [
              createVNode(_component_Icon, {
                name: item.icon,
                class: "h-5 w-5"
              }, null, 8, ["name"])
            ]),
            $props.isOpen ? (openBlock(), createBlock("span", {
              key: 0,
              class: "ml-3"
            }, toDisplayString(item.title), 1)) : createCommentVNode("", true)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</li>`);
  });
  _push(`<!--]--></ul></nav></div></aside>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/appSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "DefaultLayout",
  // components: { // Descomenta si necesitas importación explícita
  //   AppHeader,
  //   AppSidebar
  // },
  data() {
    return {
      isSidebarOpen: true
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AppHeader = __nuxt_component_0;
  const _component_GlobalStatsHeader = __nuxt_component_1;
  const _component_AppSidebar = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-900 text-gray-200" }, _attrs))}><div style="${ssrRenderStyle({ marginLeft: $data.isSidebarOpen ? "16rem" : "4rem" })}" class="fixed top-0 right-0 left-0 z-40 transition-all duration-300">`);
  _push(ssrRenderComponent(_component_AppHeader, {
    onToggleSidebar: $options.toggleSidebar,
    "is-sidebar-open": $data.isSidebarOpen
  }, null, _parent));
  _push(`</div><div style="${ssrRenderStyle({ marginLeft: $data.isSidebarOpen ? "16rem" : "4rem" })}" class="fixed top-16 right-0 left-0 z-30">`);
  _push(ssrRenderComponent(_component_GlobalStatsHeader, null, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_AppSidebar, { "is-open": $data.isSidebarOpen }, null, _parent));
  _push(`<main class="transition-all duration-300" style="${ssrRenderStyle({
    paddingTop: "calc(4rem + 150px)",
    marginLeft: $data.isSidebarOpen ? "16rem" : "4rem"
  })}"><div>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></main></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-hd1TbeYZ.mjs.map
