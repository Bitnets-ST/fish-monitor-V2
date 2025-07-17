import __nuxt_component_0$1 from './index-dB8gwxpQ.mjs';
import { mergeProps, defineComponent, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, a as __nuxt_component_1$1 } from './server.mjs';
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

const _sfc_main$2 = defineComponent({
  name: "AppHeader",
  emits: ["toggle-sidebar"]
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Icon = __nuxt_component_0$1;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 bg-gray-800 z-30 h-16" }, _attrs))}><div class="flex items-center justify-between h-full px-4"><button class="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "material-symbols:menu-rounded",
    class: "h-6 w-6 text-white"
  }, null, _parent));
  _push(`</button><div class="flex-1 text-center"><h1 class="text-xl font-semibold text-white">Fish Monitor</h1></div><div class="flex items-center space-x-4"></div></div></header>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/appHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {
  name: "AppSidebar",
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const menuItems = [
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
      },
      {
        path: "/settings/control-panel",
        title: "Panel de Control",
        icon: "material-symbols:admin-panel-settings-outline-rounded"
      }
    ];
    return {
      menuItems
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
  ssrRenderList($setup.menuItems, (item) => {
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
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "DefaultLayout",
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
  const _component_AppSidebar = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-900 text-gray-200" }, _attrs))}><div style="${ssrRenderStyle({ marginLeft: $data.isSidebarOpen ? "16rem" : "4rem" })}" class="fixed top-0 right-0 left-0 z-40 transition-all duration-300">`);
  _push(ssrRenderComponent(_component_AppHeader, {
    onToggleSidebar: $options.toggleSidebar,
    "is-sidebar-open": $data.isSidebarOpen
  }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_AppSidebar, { "is-open": $data.isSidebarOpen }, null, _parent));
  _push(`<main class="transition-all duration-300" style="${ssrRenderStyle({
    paddingTop: "4rem",
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
//# sourceMappingURL=default-uxEOymaB.mjs.map
