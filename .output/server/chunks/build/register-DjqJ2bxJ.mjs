import { _ as _export_sfc, a as __nuxt_component_1$1 } from './server.mjs';
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-AnSpNAX4.mjs';
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
import 'vue-router';
import '@iconify/vue';
import '@vue/shared';
import './asyncData-Cn9zLTlz.mjs';

const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const user_description = ref("");
    const passwordMismatch = computed(() => {
      return password.value && confirmPassword.value && password.value !== confirmPassword.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900" }, _attrs))} data-v-920903c9><div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md" data-v-920903c9><h1 class="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6" data-v-920903c9> Crear Cuenta </h1><form data-v-920903c9><div class="mb-4" data-v-920903c9><label for="name" class="block text-sm font-medium text-gray-600 dark:text-gray-300" data-v-920903c9>Nombre Completo</label><input type="text" id="name"${ssrRenderAttr("value", name.value)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Tu Nombre" data-v-920903c9></div><div class="mb-4" data-v-920903c9><label for="email" class="block text-sm font-medium text-gray-600 dark:text-gray-300" data-v-920903c9>Email</label><input type="email" id="email"${ssrRenderAttr("value", email.value)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="tu@email.com" data-v-920903c9></div><div class="mb-4" data-v-920903c9><label for="password" class="block text-sm font-medium text-gray-600 dark:text-gray-300" data-v-920903c9>Contrase\xF1a</label><input type="password" id="password"${ssrRenderAttr("value", password.value)} required minlength="6" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="M\xEDnimo 6 caracteres" data-v-920903c9></div><div class="mb-6" data-v-920903c9><label for="confirmPassword" class="block text-sm font-medium text-gray-600 dark:text-gray-300" data-v-920903c9>Confirmar Contrase\xF1a</label><input type="password" id="confirmPassword"${ssrRenderAttr("value", confirmPassword.value)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Repite tu contrase\xF1a" data-v-920903c9></div><div class="mb-4" data-v-920903c9><label for="user_description" class="block text-sm font-medium text-gray-600 dark:text-gray-300" data-v-920903c9>Descripci\xF3n (Opcional)</label><textarea id="user_description" rows="2" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Breve descripci\xF3n sobre ti o tu rol" data-v-920903c9>${ssrInterpolate(user_description.value)}</textarea></div>`);
      if (unref(authStore).error || passwordMismatch.value) {
        _push(`<div class="mb-4 text-red-500 text-sm" data-v-920903c9>`);
        if (passwordMismatch.value) {
          _push(`<p data-v-920903c9>Las contrase\xF1as no coinciden.</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(authStore).error) {
          _push(`<p data-v-920903c9>${ssrInterpolate(unref(authStore).error)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(authStore).loading || passwordMismatch.value) ? " disabled" : ""} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50" data-v-920903c9>`);
      if (unref(authStore).loading) {
        _push(`<span data-v-920903c9>Registrando...</span>`);
      } else {
        _push(`<span data-v-920903c9>Crear Cuenta</span>`);
      }
      _push(`</button><div class="mt-6 text-center" data-v-920903c9>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/auth/login",
        class: "text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \xBFYa tienes una cuenta? Inicia Sesi\xF3n `);
          } else {
            return [
              createTextVNode(" \xBFYa tienes una cuenta? Inicia Sesi\xF3n ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-920903c9"]]);

export { register as default };
//# sourceMappingURL=register-DjqJ2bxJ.mjs.map
