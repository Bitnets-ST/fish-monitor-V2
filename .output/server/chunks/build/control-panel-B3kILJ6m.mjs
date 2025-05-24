import __nuxt_component_0 from './index-DTWANCmL.mjs';
import { ref, mergeProps, reactive, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
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

const _sfc_main$b = {
  __name: "createBranchModal",
  __ssrInlineRender: true,
  emits: ["close", "branchCreated"],
  setup(__props, { emit: __emit }) {
    const form = reactive({
      name: "",
      location: "",
      description: ""
    });
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" }, _attrs))} data-v-e1d7ddec><div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg mx-4" data-v-e1d7ddec><div class="flex justify-between items-center pb-3 border-b dark:border-gray-700" data-v-e1d7ddec><h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200" data-v-e1d7ddec>Crear Nueva Sucursal</h2><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" data-v-e1d7ddec>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:close-rounded",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><form class="mt-4 space-y-4" data-v-e1d7ddec><div data-v-e1d7ddec><label for="branchName" class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-v-e1d7ddec>Nombre de la Sucursal <span class="text-red-500" data-v-e1d7ddec>*</span></label><input type="text" id="branchName"${ssrRenderAttr("value", form.name)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: Sucursal Principal" data-v-e1d7ddec></div><div data-v-e1d7ddec><label for="branchLocation" class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-v-e1d7ddec>Ubicaci\xF3n (Opcional)</label><input type="text" id="branchLocation"${ssrRenderAttr("value", form.location)} class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: Calle Falsa 123, Ciudad" data-v-e1d7ddec></div><div data-v-e1d7ddec><label for="branchDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-v-e1d7ddec>Descripci\xF3n (Opcional)</label><textarea id="branchDescription" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Informaci\xF3n adicional sobre la sucursal" data-v-e1d7ddec>${ssrInterpolate(form.description)}</textarea></div>`);
      if (errorMessage.value) {
        _push(`<div class="text-red-500 text-sm" data-v-e1d7ddec>${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-4 flex justify-end space-x-3" data-v-e1d7ddec><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-e1d7ddec> Cancelar </button><button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"${ssrIncludeBooleanAttr(loading.value || !form.name) ? " disabled" : ""} data-v-e1d7ddec>`);
      if (loading.value) {
        _push(`<span data-v-e1d7ddec>Creando...</span>`);
      } else {
        _push(`<span data-v-e1d7ddec>Crear Sucursal</span>`);
      }
      _push(`</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/createBranchModal.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const createBranchModal = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-e1d7ddec"]]);
const _sfc_main$a = {
  __name: "createCameraTypeModal",
  __ssrInlineRender: true,
  emits: ["close", "cameraTypeCreated"],
  setup(__props, { emit: __emit }) {
    const form = reactive({
      name: "",
      camera_type_description: ""
    });
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" }, _attrs))}><div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg mx-4"><div class="flex justify-between items-center pb-3 border-b dark:border-gray-700"><h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Crear Nuevo Tipo de C\xE1mara</h2><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:close-rounded",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><form class="mt-4 space-y-4"><div><label for="cameraTypeName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Tipo de C\xE1mara <span class="text-red-500">*</span></label><input type="text" id="cameraTypeName"${ssrRenderAttr("value", form.name)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: Domo PTZ"></div><div><label for="cameraTypeDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripci\xF3n (Opcional)</label><textarea id="cameraTypeDescription" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Caracter\xEDsticas principales del tipo de c\xE1mara">${ssrInterpolate(form.camera_type_description)}</textarea></div>`);
      if (errorMessage.value) {
        _push(`<div class="text-red-500 text-sm">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-4 flex justify-end space-x-3"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}> Cancelar </button><button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"${ssrIncludeBooleanAttr(loading.value || !form.name) ? " disabled" : ""}>`);
      if (loading.value) {
        _push(`<span>Creando...</span>`);
      } else {
        _push(`<span>Crear Tipo de C\xE1mara</span>`);
      }
      _push(`</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/createCameraTypeModal.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {
  __name: "createSensorTypeModal",
  __ssrInlineRender: true,
  emits: ["close", "sensorTypeCreated"],
  setup(__props, { emit: __emit }) {
    const form = reactive({
      name: "",
      sensor_type_description: ""
    });
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" }, _attrs))}><div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg mx-4"><div class="flex justify-between items-center pb-3 border-b dark:border-gray-700"><h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Crear Nuevo Tipo de Sensor</h2><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:close-rounded",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><form class="mt-4 space-y-4"><div><label for="sensorTypeName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Tipo de Sensor <span class="text-red-500">*</span></label><input type="text" id="sensorTypeName"${ssrRenderAttr("value", form.name)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: Temperatura"></div><div><label for="sensorTypeDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripci\xF3n (Opcional)</label><textarea id="sensorTypeDescription" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Detalles del tipo de sensor">${ssrInterpolate(form.sensor_type_description)}</textarea></div>`);
      if (errorMessage.value) {
        _push(`<div class="text-red-500 text-sm">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-4 flex justify-end space-x-3"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}> Cancelar </button><button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"${ssrIncludeBooleanAttr(loading.value || !form.name) ? " disabled" : ""}>`);
      if (loading.value) {
        _push(`<span>Creando...</span>`);
      } else {
        _push(`<span>Crear Tipo de Sensor</span>`);
      }
      _push(`</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/createSensorTypeModal.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  __name: "createZoneModal",
  __ssrInlineRender: true,
  emits: ["close", "zoneCreated"],
  setup(__props, { emit: __emit }) {
    const form = reactive({
      name: "",
      branch_id: "",
      zone_description: "",
      zone_manager: "",
      zone_direction: ""
    });
    const availableBranches = ref([]);
    const branchFetchError = ref("");
    const availableUsers = ref([]);
    const userFetchError = ref("");
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" }, _attrs))}><div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg mx-4"><div class="flex justify-between items-center pb-3 border-b dark:border-gray-700"><h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200"> Crear Nueva Zona </h2><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:close-rounded",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><form class="mt-4 space-y-4"><div><label for="zoneName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de la Zona <span class="text-red-500">*</span></label><input id="zoneName"${ssrRenderAttr("value", form.name)} type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: Zona de Procesamiento"></div><div><label for="branchId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sucursal Asociada <span class="text-red-500">*</span></label><select id="branchId" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.branch_id) ? ssrLooseContain(form.branch_id, "") : ssrLooseEqual(form.branch_id, "")) ? " selected" : ""}>Seleccione una sucursal</option><!--[-->`);
      ssrRenderList(availableBranches.value, (branch) => {
        _push(`<option${ssrRenderAttr("value", branch._id)}${ssrIncludeBooleanAttr(Array.isArray(form.branch_id) ? ssrLooseContain(form.branch_id, branch._id) : ssrLooseEqual(form.branch_id, branch._id)) ? " selected" : ""}>${ssrInterpolate(branch.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (branchFetchError.value) {
        _push(`<p class="text-sm text-red-500 mt-1">${ssrInterpolate(branchFetchError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="zoneManager" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Encargado de Zona <span class="text-red-500">*</span></label><select id="zoneManager" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.zone_manager) ? ssrLooseContain(form.zone_manager, "") : ssrLooseEqual(form.zone_manager, "")) ? " selected" : ""}>Seleccione un encargado</option><!--[-->`);
      ssrRenderList(availableUsers.value, (user) => {
        _push(`<option${ssrRenderAttr("value", user._id)}${ssrIncludeBooleanAttr(Array.isArray(form.zone_manager) ? ssrLooseContain(form.zone_manager, user._id) : ssrLooseEqual(form.zone_manager, user._id)) ? " selected" : ""}>${ssrInterpolate(user.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (userFetchError.value) {
        _push(`<p class="text-sm text-red-500 mt-1">${ssrInterpolate(userFetchError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="zoneDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripci\xF3n (Opcional)</label><textarea id="zoneDescription" rows="2" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Prop\xF3sito o detalles de la zona">${ssrInterpolate(form.zone_description)}</textarea></div><div><label for="zoneDirection" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Direcci\xF3n/Ubicaci\xF3n Espec\xEDfica (Opcional)</label><input id="zoneDirection"${ssrRenderAttr("value", form.zone_direction)} type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: Edificio B, Nivel 3"></div>`);
      if (errorMessage.value) {
        _push(`<div class="text-red-500 text-sm">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-4 flex justify-end space-x-3"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}> Cancelar </button><button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"${ssrIncludeBooleanAttr(
        loading.value || !form.name || !form.branch_id || !form.zone_manager
      ) ? " disabled" : ""}>`);
      if (loading.value) {
        _push(`<span>Creando...</span>`);
      } else {
        _push(`<span>Crear Zona</span>`);
      }
      _push(`</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/createZoneModal.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "createCameraModal",
  __ssrInlineRender: true,
  emits: ["close", "cameraCreated"],
  setup(__props, { emit: __emit }) {
    const form = reactive({
      name: "",
      camera_IP: "",
      camera_type: "",
      // Now required and selected via dropdown
      zone_id: ""
      // Now required and selected via dropdown
    });
    const availableCameraTypes = ref([]);
    const cameraTypeFetchError = ref("");
    const availableZones = ref([]);
    const zoneFetchError = ref("");
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" }, _attrs))}><div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg mx-4"><div class="flex justify-between items-center pb-3 border-b dark:border-gray-700"><h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Registrar Nueva C\xE1mara</h2><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:close-rounded",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><form class="mt-4 space-y-4"><div><label for="cameraName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de la C\xE1mara <span class="text-red-500">*</span></label><input type="text" id="cameraName"${ssrRenderAttr("value", form.name)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: C\xE1mara Entrada Principal"></div><div><label for="cameraIP" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Direcci\xF3n IP de la C\xE1mara <span class="text-red-500">*</span></label><input type="text" id="cameraIP"${ssrRenderAttr("value", form.camera_IP)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: 192.168.1.100"></div><div><label for="cameraType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de C\xE1mara <span class="text-red-500">*</span></label><select id="cameraType" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.camera_type) ? ssrLooseContain(form.camera_type, "") : ssrLooseEqual(form.camera_type, "")) ? " selected" : ""}>Seleccione un tipo de c\xE1mara</option><!--[-->`);
      ssrRenderList(availableCameraTypes.value, (type) => {
        _push(`<option${ssrRenderAttr("value", type._id)}${ssrIncludeBooleanAttr(Array.isArray(form.camera_type) ? ssrLooseContain(form.camera_type, type._id) : ssrLooseEqual(form.camera_type, type._id)) ? " selected" : ""}>${ssrInterpolate(type.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (cameraTypeFetchError.value) {
        _push(`<p class="text-sm text-red-500 mt-1">${ssrInterpolate(cameraTypeFetchError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="zoneId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Zona Asociada <span class="text-red-500">*</span></label><select id="zoneId" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.zone_id) ? ssrLooseContain(form.zone_id, "") : ssrLooseEqual(form.zone_id, "")) ? " selected" : ""}>Seleccione una zona</option><!--[-->`);
      ssrRenderList(availableZones.value, (zone) => {
        _push(`<option${ssrRenderAttr("value", zone._id)}${ssrIncludeBooleanAttr(Array.isArray(form.zone_id) ? ssrLooseContain(form.zone_id, zone._id) : ssrLooseEqual(form.zone_id, zone._id)) ? " selected" : ""}>${ssrInterpolate(zone.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (zoneFetchError.value) {
        _push(`<p class="text-sm text-red-500 mt-1">${ssrInterpolate(zoneFetchError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errorMessage.value) {
        _push(`<div class="text-red-500 text-sm">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-4 flex justify-end space-x-3"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}> Cancelar </button><button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"${ssrIncludeBooleanAttr(loading.value || !form.name || !form.camera_IP || !form.camera_type || !form.zone_id) ? " disabled" : ""}>`);
      if (loading.value) {
        _push(`<span>Registrando...</span>`);
      } else {
        _push(`<span>Registrar C\xE1mara</span>`);
      }
      _push(`</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/createCameraModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "createSensorModal",
  __ssrInlineRender: true,
  emits: ["close", "sensorCreated"],
  setup(__props, { emit: __emit }) {
    const form = reactive({
      name: "",
      sensor_IP: "",
      sensor_type: "",
      // Changed from sensor_type_id, now required
      zone_id: ""
      // Now required
    });
    const availableSensorTypes = ref([]);
    const sensorTypeFetchError = ref("");
    const availableZones = ref([]);
    const zoneFetchError = ref("");
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" }, _attrs))}><div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg mx-4"><div class="flex justify-between items-center pb-3 border-b dark:border-gray-700"><h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Registrar Nuevo Sensor</h2><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:close-rounded",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><form class="mt-4 space-y-4"><div><label for="sensorName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Sensor <span class="text-red-500">*</span></label><input type="text" id="sensorName"${ssrRenderAttr("value", form.name)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: Sensor Temperatura Pileta 1"></div><div><label for="sensorIP" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Direcci\xF3n IP del Sensor <span class="text-red-500">*</span></label><input type="text" id="sensorIP"${ssrRenderAttr("value", form.sensor_IP)} required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" placeholder="Ej: 192.168.1.101"></div><div><label for="sensorType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Sensor <span class="text-red-500">*</span></label><select id="sensorType" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.sensor_type) ? ssrLooseContain(form.sensor_type, "") : ssrLooseEqual(form.sensor_type, "")) ? " selected" : ""}>Seleccione un tipo de sensor</option><!--[-->`);
      ssrRenderList(availableSensorTypes.value, (type) => {
        _push(`<option${ssrRenderAttr("value", type._id)}${ssrIncludeBooleanAttr(Array.isArray(form.sensor_type) ? ssrLooseContain(form.sensor_type, type._id) : ssrLooseEqual(form.sensor_type, type._id)) ? " selected" : ""}>${ssrInterpolate(type.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (sensorTypeFetchError.value) {
        _push(`<p class="text-sm text-red-500 mt-1">${ssrInterpolate(sensorTypeFetchError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="zoneId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Zona Asociada <span class="text-red-500">*</span></label><select id="zoneId" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.zone_id) ? ssrLooseContain(form.zone_id, "") : ssrLooseEqual(form.zone_id, "")) ? " selected" : ""}>Seleccione una zona</option><!--[-->`);
      ssrRenderList(availableZones.value, (zone) => {
        _push(`<option${ssrRenderAttr("value", zone._id)}${ssrIncludeBooleanAttr(Array.isArray(form.zone_id) ? ssrLooseContain(form.zone_id, zone._id) : ssrLooseEqual(form.zone_id, zone._id)) ? " selected" : ""}>${ssrInterpolate(zone.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (zoneFetchError.value) {
        _push(`<p class="text-sm text-red-500 mt-1">${ssrInterpolate(zoneFetchError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errorMessage.value) {
        _push(`<div class="text-red-500 text-sm">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-4 flex justify-end space-x-3"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}> Cancelar </button><button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"${ssrIncludeBooleanAttr(loading.value || !form.name || !form.sensor_IP || !form.sensor_type || !form.zone_id) ? " disabled" : ""}>`);
      if (loading.value) {
        _push(`<span>Registrando...</span>`);
      } else {
        _push(`<span>Registrar Sensor</span>`);
      }
      _push(`</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/createSensorModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "createTankModal",
  __ssrInlineRender: true,
  emits: ["close", "tank-created"],
  setup(__props, { emit: __emit }) {
    useToast();
    const zones = ref([]);
    const availableSensors = ref([]);
    const isSubmitting = ref(false);
    const formData = reactive({
      nombre: "",
      ubicaci\u00F3n: {
        latitud: null,
        longitud: null,
        direcci\u00F3n: ""
      },
      capacidad: null,
      tipo: "",
      material: "",
      sensores: [],
      estado: "activo",
      especies: [],
      zone_id: "",
      fecha_creaci\u00F3n: /* @__PURE__ */ new Date()
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" }, _attrs))}><div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold text-gray-800 dark:text-gray-100"> Crear Nuevo Estanque </h2><button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:close",
        size: "24"
      }, null, _parent));
      _push(`</button></div><form class="space-y-4"><div class="space-y-4"><h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2"> Informaci\xF3n B\xE1sica </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Nombre del Estanque* </label><input${ssrRenderAttr("value", formData.nombre)} type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" placeholder="Ej: Estanque Principal"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Zona* </label><select required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"><option value="" disabled selected>Seleccionar zona</option><!--[-->`);
      ssrRenderList(zones.value, (zone) => {
        _push(`<option${ssrRenderAttr("value", zone._id)}${ssrIncludeBooleanAttr(Array.isArray(formData.zone_id) ? ssrLooseContain(formData.zone_id, zone._id) : ssrLooseEqual(formData.zone_id, zone._id)) ? " selected" : ""}>${ssrInterpolate(zone.name)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Capacidad (litros)* </label><input${ssrRenderAttr("value", formData.capacidad)} type="number" required min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" placeholder="Ej: 5000"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Tipo* </label><select required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"><option value="" disabled selected>Seleccionar tipo</option><option value="circular"${ssrIncludeBooleanAttr(Array.isArray(formData.tipo) ? ssrLooseContain(formData.tipo, "circular") : ssrLooseEqual(formData.tipo, "circular")) ? " selected" : ""}>Circular</option><option value="rectangular"${ssrIncludeBooleanAttr(Array.isArray(formData.tipo) ? ssrLooseContain(formData.tipo, "rectangular") : ssrLooseEqual(formData.tipo, "rectangular")) ? " selected" : ""}>Rectangular</option><option value="irregular"${ssrIncludeBooleanAttr(Array.isArray(formData.tipo) ? ssrLooseContain(formData.tipo, "irregular") : ssrLooseEqual(formData.tipo, "irregular")) ? " selected" : ""}>Irregular</option></select></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Material* </label><select required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"><option value="" disabled selected>Seleccionar material</option><option value="fibra de vidrio"${ssrIncludeBooleanAttr(Array.isArray(formData.material) ? ssrLooseContain(formData.material, "fibra de vidrio") : ssrLooseEqual(formData.material, "fibra de vidrio")) ? " selected" : ""}>Fibra de vidrio</option><option value="concreto"${ssrIncludeBooleanAttr(Array.isArray(formData.material) ? ssrLooseContain(formData.material, "concreto") : ssrLooseEqual(formData.material, "concreto")) ? " selected" : ""}>Concreto</option><option value="pl\xE1stico"${ssrIncludeBooleanAttr(Array.isArray(formData.material) ? ssrLooseContain(formData.material, "pl\xE1stico") : ssrLooseEqual(formData.material, "pl\xE1stico")) ? " selected" : ""}>Pl\xE1stico</option><option value="acero"${ssrIncludeBooleanAttr(Array.isArray(formData.material) ? ssrLooseContain(formData.material, "acero") : ssrLooseEqual(formData.material, "acero")) ? " selected" : ""}>Acero</option></select></div></div></div><div class="space-y-4"><h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2"> Ubicaci\xF3n </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Latitud* </label><input${ssrRenderAttr("value", formData.ubicaci\u00F3n.latitud)} type="number" required step="0.000001" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" placeholder="Ej: -33.456789"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Longitud* </label><input${ssrRenderAttr("value", formData.ubicaci\u00F3n.longitud)} type="number" required step="0.000001" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" placeholder="Ej: -70.123456"></div></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Direcci\xF3n* </label><input${ssrRenderAttr("value", formData.ubicaci\u00F3n.direcci\u00F3n)} type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" placeholder="Ej: Av. Principal 123, Ciudad"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Estado </label><select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"><option value="activo"${ssrIncludeBooleanAttr(Array.isArray(formData.estado) ? ssrLooseContain(formData.estado, "activo") : ssrLooseEqual(formData.estado, "activo")) ? " selected" : ""}>Activo</option><option value="inactivo"${ssrIncludeBooleanAttr(Array.isArray(formData.estado) ? ssrLooseContain(formData.estado, "inactivo") : ssrLooseEqual(formData.estado, "inactivo")) ? " selected" : ""}>Inactivo</option><option value="mantenimiento"${ssrIncludeBooleanAttr(Array.isArray(formData.estado) ? ssrLooseContain(formData.estado, "mantenimiento") : ssrLooseEqual(formData.estado, "mantenimiento")) ? " selected" : ""}>Mantenimiento</option></select></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Especies </label><div class="flex flex-wrap gap-2 items-center"><!--[-->`);
      ssrRenderList(formData.especies, (especie, index) => {
        _push(`<div class="flex items-center"><input${ssrRenderAttr("value", formData.especies[index])} type="text" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" placeholder="Nombre de especie"><button type="button" class="ml-1 text-red-500 hover:text-red-700">`);
        _push(ssrRenderComponent(_component_Icon, { name: "mdi:close-circle" }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><button type="button" class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800">`);
      _push(ssrRenderComponent(_component_Icon, { name: "mdi:plus" }, null, _parent));
      _push(` A\xF1adir </button></div></div></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Sensores </label><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(availableSensors.value, (sensor) => {
        _push(`<div class="flex items-center"><input type="checkbox"${ssrRenderAttr("id", sensor._id)}${ssrRenderAttr("value", sensor._id)}${ssrIncludeBooleanAttr(Array.isArray(formData.sensores) ? ssrLooseContain(formData.sensores, sensor._id) : formData.sensores) ? " checked" : ""} class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"><label${ssrRenderAttr("for", sensor._id)} class="ml-2 text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(sensor.nombre)}</label></div>`);
      });
      _push(`<!--]--></div></div><div class="flex justify-end space-x-3 pt-4 border-t"><button type="button" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (isSubmitting.value) {
        _push(`<span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:loading",
          class: "animate-spin"
        }, null, _parent));
        _push(` Guardando... </span>`);
      } else {
        _push(`<span>Crear Estanque</span>`);
      }
      _push(`</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/createTankModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "allBranches",
  __ssrInlineRender: true,
  emits: ["create-branch"],
  setup(__props, { emit: __emit }) {
    useRouter();
    const branches = ref([]);
    const loading = ref(true);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full" }, _attrs))}><div class="p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white"><div class="flex justify-between items-center"><h3 class="text-lg font-semibold flex items-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:source-branch",
        class: "mr-2"
      }, null, _parent));
      _push(` Sucursales </h3><span class="bg-white text-indigo-600 text-sm font-medium px-2.5 py-0.5 rounded-full">${ssrInterpolate(branches.value.length)}</span></div></div><div class="flex-grow flex flex-col">`);
      if (loading.value) {
        _push(`<div class="p-6 flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="p-6 text-center text-red-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:alert-circle",
          size: "32",
          class: "mx-auto mb-2"
        }, null, _parent));
        _push(`<p>${ssrInterpolate(error.value)}</p></div>`);
      } else if (branches.value.length === 0) {
        _push(`<div class="p-6 text-center text-gray-500 dark:text-gray-400 flex-grow">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:source-branch-off",
          size: "32",
          class: "mx-auto mb-2"
        }, null, _parent));
        _push(`<p>No hay sucursales registradas</p></div>`);
      } else {
        _push(`<div class="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-grow"><!--[-->`);
        ssrRenderList(branches.value, (branch) => {
          var _a;
          _push(`<div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"><div class="flex justify-between items-start"><div><h4 class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(branch.name)}</h4><p class="text-sm text-gray-500 dark:text-gray-400 mt-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:map-marker",
            class: "inline-block mr-1"
          }, null, _parent));
          _push(` ${ssrInterpolate(branch.location || "Sin direcci\xF3n")}</p>`);
          if (branch.description) {
            _push(`<p class="text-xs text-gray-400 mt-1">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:note-text-outline",
              class: "inline-block mr-1"
            }, null, _parent));
            _push(` ${ssrInterpolate(branch.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400 gap-3"><span class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: branch.isActive ? "mdi:check-circle" : "mdi:close-circle",
            class: ["mr-1", branch.isActive ? "text-green-500" : "text-red-500"]
          }, null, _parent));
          _push(` ${ssrInterpolate(branch.isActive ? "Activa" : "Inactiva")}</span><span class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:account-group",
            class: "mr-1"
          }, null, _parent));
          _push(` ${ssrInterpolate(((_a = branch.empleados) == null ? void 0 : _a.length) || 0)} empleados </span><span class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:calendar-plus",
            class: "mr-1"
          }, null, _parent));
          _push(` ${ssrInterpolate(new Date(branch.createdAt).toLocaleDateString())}</span><span class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:calendar-edit",
            class: "mr-1"
          }, null, _parent));
          _push(` ${ssrInterpolate(new Date(branch.updatedAt).toLocaleDateString())}</span>`);
          if (branch.telefono) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:phone",
              class: "mr-1"
            }, null, _parent));
            _push(` ${ssrInterpolate(branch.telefono)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex space-x-1"><button class="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-500" title="Ver detalles">`);
          _push(ssrRenderComponent(_component_Icon, { name: "mdi:eye" }, null, _parent));
          _push(`</button><button class="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-500" title="Editar sucursal">`);
          _push(ssrRenderComponent(_component_Icon, { name: "mdi:pencil" }, null, _parent));
          _push(`</button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="p-3 bg-gray-50 dark:bg-gray-900 flex justify-end items-center h-14 mt-auto"><button class="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-500 dark:hover:text-indigo-400 font-medium">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:source-branch-plus",
        class: "inline-block mr-1"
      }, null, _parent));
      _push(` Crear nueva sucursal </button></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/allBranches.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "allZone",
  __ssrInlineRender: true,
  emits: ["create-zone"],
  setup(__props, { emit: __emit }) {
    useRouter();
    const zones = ref([]);
    const loading = ref(true);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full" }, _attrs))}><div class="p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white"><div class="flex justify-between items-center"><h3 class="text-lg font-semibold flex items-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:map-marker-multiple",
        class: "mr-2"
      }, null, _parent));
      _push(` Zonas </h3><span class="bg-white text-amber-600 text-sm font-medium px-2.5 py-0.5 rounded-full">${ssrInterpolate(zones.value.length)}</span></div></div><div class="flex-grow flex flex-col">`);
      if (loading.value) {
        _push(`<div class="p-6 flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="p-6 text-center text-red-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:alert-circle",
          size: "32",
          class: "mx-auto mb-2"
        }, null, _parent));
        _push(`<p>${ssrInterpolate(error.value)}</p></div>`);
      } else if (zones.value.length === 0) {
        _push(`<div class="p-6 text-center text-gray-500 dark:text-gray-400 flex-grow">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:map-marker-off",
          size: "32",
          class: "mx-auto mb-2"
        }, null, _parent));
        _push(`<p>No hay zonas registradas</p></div>`);
      } else {
        _push(`<div class="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-grow"><!--[-->`);
        ssrRenderList(zones.value, (zone) => {
          _push(`<div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"><div class="flex justify-between items-start"><div><h4 class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(zone.name)}</h4>`);
          if (zone.zone_direction) {
            _push(`<p class="text-xs text-gray-400 mt-1">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:map-marker",
              class: "inline-block mr-1"
            }, null, _parent));
            _push(` ${ssrInterpolate(zone.zone_direction)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (zone.zone_description) {
            _push(`<p class="text-xs text-gray-400 mt-1">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:note-text-outline",
              class: "inline-block mr-1"
            }, null, _parent));
            _push(` ${ssrInterpolate(zone.zone_description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">`);
          if (zone.zone_manager) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:account-tie",
              class: "mr-1"
            }, null, _parent));
            _push(` Encargado: ${ssrInterpolate(zone.zone_manager)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (zone.branch_id) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:source-branch",
              class: "mr-1"
            }, null, _parent));
            _push(` Sucursal: ${ssrInterpolate(zone.branch_id.name || zone.branch_id)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (zone.createdAt) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:calendar",
              class: "mr-1"
            }, null, _parent));
            _push(` Creado: ${ssrInterpolate(new Date(zone.createdAt).toLocaleDateString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (zone.updatedAt) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:calendar-edit",
              class: "mr-1"
            }, null, _parent));
            _push(` Modificado: ${ssrInterpolate(new Date(zone.updatedAt).toLocaleDateString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex space-x-1"><button class="p-1 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-500" title="Ver detalles">`);
          _push(ssrRenderComponent(_component_Icon, { name: "mdi:eye" }, null, _parent));
          _push(`</button><button class="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500" title="Editar zona">`);
          _push(ssrRenderComponent(_component_Icon, { name: "mdi:pencil" }, null, _parent));
          _push(`</button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="p-3 bg-gray-50 dark:bg-gray-900 flex justify-end items-center h-14 mt-auto"><button class="text-sm text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 font-medium">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:plus",
        class: "inline-block mr-1"
      }, null, _parent));
      _push(` Crear nueva zona </button></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/allZone.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "allTanks",
  __ssrInlineRender: true,
  emits: ["create-tank"],
  setup(__props, { emit: __emit }) {
    useRouter();
    const tanks = ref([]);
    const loading = ref(true);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full" }, _attrs))}><div class="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white"><div class="flex justify-between items-center"><h3 class="text-lg font-semibold flex items-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:fish",
        class: "mr-2"
      }, null, _parent));
      _push(` Estanques </h3><span class="bg-white text-blue-600 text-sm font-medium px-2.5 py-0.5 rounded-full">${ssrInterpolate(tanks.value.length)}</span></div></div><div class="flex-grow flex flex-col">`);
      if (loading.value) {
        _push(`<div class="p-6 flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="p-6 text-center text-red-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:alert-circle",
          size: "32",
          class: "mx-auto mb-2"
        }, null, _parent));
        _push(`<p>${ssrInterpolate(error.value)}</p></div>`);
      } else if (tanks.value.length === 0) {
        _push(`<div class="p-6 text-center text-gray-500 dark:text-gray-400 flex-grow">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:fish-off",
          size: "32",
          class: "mx-auto mb-2"
        }, null, _parent));
        _push(`<p>No hay estanques registrados</p></div>`);
      } else {
        _push(`<div class="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-grow"><!--[-->`);
        ssrRenderList(tanks.value, (tank) => {
          var _a, _b, _c;
          _push(`<div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"><div class="flex justify-between items-start"><div><div class="flex items-center"><h4 class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(tank.nombre)}</h4><span class="${ssrRenderClass([{
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": tank.estado === "activo",
            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": tank.estado === "inactivo",
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300": tank.estado === "mantenimiento"
          }, "text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full"])}">${ssrInterpolate(tank.estado)}</span></div><p class="text-xs text-gray-400 mt-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:map-marker",
            class: "inline-block mr-1"
          }, null, _parent));
          _push(` ${ssrInterpolate(((_a = tank.ubicaci\u00F3n) == null ? void 0 : _a.direcci\u00F3n) || "Sin direcci\xF3n")} `);
          if (((_b = tank.ubicaci\u00F3n) == null ? void 0 : _b.latitud) && ((_c = tank.ubicaci\u00F3n) == null ? void 0 : _c.longitud)) {
            _push(`<span> (${ssrInterpolate(tank.ubicaci\u00F3n.latitud)}, ${ssrInterpolate(tank.ubicaci\u00F3n.longitud)}) </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p><div class="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400"><span class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:water",
            class: "mr-1"
          }, null, _parent));
          _push(` ${ssrInterpolate(tank.capacidad)} litros </span><span class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:shape",
            class: "mr-1"
          }, null, _parent));
          _push(` ${ssrInterpolate(tank.tipo)}</span><span class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:material-design",
            class: "mr-1"
          }, null, _parent));
          _push(` ${ssrInterpolate(tank.material)}</span>`);
          if (tank.sensores && tank.sensores.length) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:chip",
              class: "mr-1"
            }, null, _parent));
            _push(` Sensores: ${ssrInterpolate(tank.sensores.join(", "))}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (tank.especies && tank.especies.length) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:fish",
              class: "mr-1"
            }, null, _parent));
            _push(` Especies: ${ssrInterpolate(tank.especies.join(", "))}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (tank.poblaci\u00F3n) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:counter",
              class: "mr-1"
            }, null, _parent));
            _push(` ${ssrInterpolate(tank.poblaci\u00F3n.total_peces)} peces / ${ssrInterpolate(tank.poblaci\u00F3n.biomasa_kg)} kg </span>`);
          } else {
            _push(`<!---->`);
          }
          if (tank.condiciones) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:thermometer",
              class: "mr-1"
            }, null, _parent));
            _push(` ${ssrInterpolate(tank.condiciones.temperatura_c)} \xB0C `);
            if (tank.condiciones.ph) {
              _push(`<span>/ pH: ${ssrInterpolate(tank.condiciones.ph)}</span>`);
            } else {
              _push(`<!---->`);
            }
            if (tank.condiciones.ox\u00EDgeno) {
              _push(`<span>/ O\u2082: ${ssrInterpolate(tank.condiciones.ox\u00EDgeno)} mg/L</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          } else {
            _push(`<!---->`);
          }
          if (tank.fecha_creaci\u00F3n) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:calendar-plus",
              class: "mr-1"
            }, null, _parent));
            _push(` ${ssrInterpolate(new Date(tank.fecha_creaci\u00F3n).toLocaleDateString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (tank.\u00FAltima_inspecci\u00F3n) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:calendar-check",
              class: "mr-1"
            }, null, _parent));
            _push(` \xDAlt. inspecci\xF3n: ${ssrInterpolate(new Date(tank.\u00FAltima_inspecci\u00F3n).toLocaleDateString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (tank.createdAt) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:calendar",
              class: "mr-1"
            }, null, _parent));
            _push(` Creado: ${ssrInterpolate(new Date(tank.createdAt).toLocaleDateString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (tank.updatedAt) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:calendar-edit",
              class: "mr-1"
            }, null, _parent));
            _push(` Modificado: ${ssrInterpolate(new Date(tank.updatedAt).toLocaleDateString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (tank.branch_id) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:source-branch",
              class: "mr-1"
            }, null, _parent));
            _push(` Sucursal: ${ssrInterpolate(tank.branch_id.name || tank.branch_id)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (tank.zone_id) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:map",
              class: "mr-1"
            }, null, _parent));
            _push(` Zona: ${ssrInterpolate(tank.zone_id.name || tank.zone_id)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex space-x-1"><button class="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500" title="Ver detalles">`);
          _push(ssrRenderComponent(_component_Icon, { name: "mdi:eye" }, null, _parent));
          _push(`</button><button class="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500" title="Editar estanque">`);
          _push(ssrRenderComponent(_component_Icon, { name: "mdi:pencil" }, null, _parent));
          _push(`</button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="p-3 bg-gray-50 dark:bg-gray-900 flex justify-end items-center h-14 mt-auto"><button class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-medium">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:plus",
        class: "inline-block mr-1"
      }, null, _parent));
      _push(` Crear nuevo estanque </button></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/allTanks.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "allUsers",
  __ssrInlineRender: true,
  emits: ["create-user"],
  setup(__props, { emit: __emit }) {
    useRouter();
    const users = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const getUserInitials = (user) => {
      if (!user || !user.nombre && !user.apellido) return "?";
      const nombre = user.nombre || "";
      const apellido = user.apellido || "";
      return (nombre.charAt(0) + (apellido.charAt(0) || "")).toUpperCase();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full" }, _attrs))}><div class="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white"><div class="flex justify-between items-center"><h3 class="text-lg font-semibold flex items-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:account-group",
        class: "mr-2"
      }, null, _parent));
      _push(` Usuarios </h3><span class="bg-white text-purple-600 text-sm font-medium px-2.5 py-0.5 rounded-full">${ssrInterpolate(users.value.length)}</span></div></div><div class="flex-grow flex flex-col">`);
      if (loading.value) {
        _push(`<div class="p-6 flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="p-6 text-center text-red-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:alert-circle",
          size: "32",
          class: "mx-auto mb-2"
        }, null, _parent));
        _push(`<p>${ssrInterpolate(error.value)}</p></div>`);
      } else if (users.value.length === 0) {
        _push(`<div class="p-6 text-center text-gray-500 dark:text-gray-400 flex-grow">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:account-off",
          size: "32",
          class: "mx-auto mb-2"
        }, null, _parent));
        _push(`<p>No hay usuarios registrados</p></div>`);
      } else {
        _push(`<div class="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-grow"><!--[-->`);
        ssrRenderList(users.value, (user) => {
          _push(`<div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"><div class="flex justify-between items-start"><div class="flex items-start"><div class="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">`);
          if (user.avatar) {
            _push(`<span class="sr-only">${ssrInterpolate(user.nombre)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (user.avatar) {
            _push(`<img${ssrRenderAttr("src", user.avatar)}${ssrRenderAttr("alt", user.nombre)} class="h-10 w-10 rounded-full object-cover">`);
          } else {
            _push(`<span>${ssrInterpolate(getUserInitials(user))}</span>`);
          }
          _push(`</div><div><h4 class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(user.name)}</h4><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(user.email)}</p>`);
          if (user.user_description) {
            _push(`<p class="text-xs text-gray-400 mt-1">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:note-text-outline",
              class: "inline-block mr-1"
            }, null, _parent));
            _push(` ${ssrInterpolate(user.user_description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center mt-1 flex-wrap gap-2"><span class="${ssrRenderClass([{
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": user.role === "administrador",
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300": user.role === "supervisor"
          }, "text-xs font-medium px-2.5 py-0.5 rounded-full"])}">${ssrInterpolate(user.role)}</span>`);
          if (user.isActive !== void 0) {
            _push(`<span class="${ssrRenderClass([{
              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": user.isActive,
              "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": !user.isActive
            }, "text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full"])}">${ssrInterpolate(user.isActive ? "Activo" : "Inactivo")}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (user.lastLogin) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:clock-outline",
              class: "mr-1"
            }, null, _parent));
            _push(` \xDAltimo acceso: ${ssrInterpolate(new Date(user.lastLogin).toLocaleString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (user.createdAt) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:calendar",
              class: "mr-1"
            }, null, _parent));
            _push(` Creado: ${ssrInterpolate(new Date(user.createdAt).toLocaleDateString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (user.updatedAt) {
            _push(`<span class="flex items-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:calendar-edit",
              class: "mr-1"
            }, null, _parent));
            _push(` Modificado: ${ssrInterpolate(new Date(user.updatedAt).toLocaleDateString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div><div class="flex space-x-1"><button class="p-1 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500" title="Ver detalles">`);
          _push(ssrRenderComponent(_component_Icon, { name: "mdi:eye" }, null, _parent));
          _push(`</button><button class="p-1 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500" title="Editar usuario">`);
          _push(ssrRenderComponent(_component_Icon, { name: "mdi:pencil" }, null, _parent));
          _push(`</button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="p-3 bg-gray-50 dark:bg-gray-900 flex justify-end items-center h-14 mt-auto"><button class="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-500 dark:hover:text-purple-400 font-medium">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:account-plus",
        class: "inline-block mr-1"
      }, null, _parent));
      _push(` Crear nuevo usuario </button></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/allUsers.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "control-panel",
  __ssrInlineRender: true,
  setup(__props) {
    const activeFilter = ref("all");
    const isCreateBranchModalOpen = ref(false);
    const isCreateCameraTypeModalOpen = ref(false);
    const isCreateSensorTypeModalOpen = ref(false);
    const isCreateZoneModalOpen = ref(false);
    const isCreateCameraModalOpen = ref(false);
    const isCreateSensorModalOpen = ref(false);
    const isCreateTankModalOpen = ref(false);
    ref(false);
    const openCreateBranchModal = () => {
      isCreateBranchModalOpen.value = true;
    };
    const closeCreateBranchModal = () => {
      isCreateBranchModalOpen.value = false;
    };
    const handleBranchCreated = (newBranch) => {
      console.log("Sucursal creada:", newBranch);
      closeCreateBranchModal();
    };
    const closeCreateCameraTypeModal = () => {
      isCreateCameraTypeModalOpen.value = false;
    };
    const handleCameraTypeCreated = (newCameraType) => {
      console.log("Tipo de C\xE1mara creado:", newCameraType);
      closeCreateCameraTypeModal();
    };
    const closeCreateSensorTypeModal = () => {
      isCreateSensorTypeModalOpen.value = false;
    };
    const handleSensorTypeCreated = (newSensorType) => {
      console.log("Tipo de Sensor creado:", newSensorType);
      closeCreateSensorTypeModal();
    };
    const openCreateZoneModal = () => {
      isCreateZoneModalOpen.value = true;
    };
    const closeCreateZoneModal = () => {
      isCreateZoneModalOpen.value = false;
    };
    const handleZoneCreated = (newZone) => {
      console.log("Zona creada:", newZone);
      closeCreateZoneModal();
    };
    const closeCreateCameraModal = () => {
      isCreateCameraModalOpen.value = false;
    };
    const handleCameraCreated = (newCamera) => {
      console.log("C\xE1mara registrada:", newCamera);
      closeCreateCameraModal();
    };
    const closeCreateSensorModal = () => {
      isCreateSensorModalOpen.value = false;
    };
    const handleSensorCreated = (newSensor) => {
      console.log("Sensor registrado:", newSensor);
      closeCreateSensorModal();
    };
    const openCreateTankModal = () => {
      isCreateTankModalOpen.value = true;
    };
    const closeCreateTankModal = () => {
      isCreateTankModalOpen.value = false;
    };
    const handleTankCreated = (newTank) => {
      console.log("Estanque creado:", newTank);
      closeCreateTankModal();
    };
    const openCreateUserModal = () => {
      console.log("Abrir modal de creaci\xF3n de usuario");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<!--[--><div class="container mx-auto p-4" data-v-0a39439c><h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100" data-v-0a39439c> Panel de Control </h1><p class="mb-6 text-gray-600 dark:text-gray-400" data-v-0a39439c> En este panel puedes gestionar las entidades principales de la aplicaci\xF3n. </p><section class="mb-8" data-v-0a39439c><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4" data-v-0a39439c><h2 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:lightning-bolt",
        class: "mr-2 text-yellow-500"
      }, null, _parent));
      _push(` Accesos Directos </h2><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" data-v-0a39439c><button class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group" data-v-0a39439c><div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-2 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:source-branch-plus",
        class: "text-indigo-600 dark:text-indigo-400 text-2xl"
      }, null, _parent));
      _push(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors" data-v-0a39439c>Sucursal</span></button><button class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group" data-v-0a39439c><div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-2 group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:map-marker-plus-outline",
        class: "text-amber-600 dark:text-amber-400 text-2xl"
      }, null, _parent));
      _push(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors" data-v-0a39439c>Zona</span></button><button class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group" data-v-0a39439c><div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:fish",
        class: "text-blue-600 dark:text-blue-400 text-2xl"
      }, null, _parent));
      _push(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" data-v-0a39439c>Estanque</span></button><button class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group" data-v-0a39439c><div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-2 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:cctv",
        class: "text-purple-600 dark:text-purple-400 text-2xl"
      }, null, _parent));
      _push(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" data-v-0a39439c>C\xE1mara</span></button><button class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-900/30 dark:to-lime-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group" data-v-0a39439c><div class="w-12 h-12 rounded-full bg-lime-100 dark:bg-lime-900/50 flex items-center justify-center mb-2 group-hover:bg-lime-200 dark:group-hover:bg-lime-800/50 transition-colors" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:resistor-nodes",
        class: "text-lime-600 dark:text-lime-400 text-2xl"
      }, null, _parent));
      _push(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-lime-700 dark:group-hover:text-lime-300 transition-colors" data-v-0a39439c>Sensor</span></button><button class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group" data-v-0a39439c><div class="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center mb-2 group-hover:bg-sky-200 dark:group-hover:bg-sky-800/50 transition-colors" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:camera-plus-outline",
        class: "text-sky-600 dark:text-sky-400 text-2xl"
      }, null, _parent));
      _push(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors" data-v-0a39439c>Tipo C\xE1mara</span></button><button class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 rounded-lg hover:shadow-md transition duration-150 ease-in-out group" data-v-0a39439c><div class="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mb-2 group-hover:bg-teal-200 dark:group-hover:bg-teal-800/50 transition-colors" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:leak",
        class: "text-teal-600 dark:text-teal-400 text-2xl"
      }, null, _parent));
      _push(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors" data-v-0a39439c>Tipo Sensor</span></button></div></div></section><div class="mb-6 flex flex-wrap gap-2" data-v-0a39439c><button class="${ssrRenderClass([{
        "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200": activeFilter.value === "all",
        "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700": activeFilter.value !== "all"
      }, "px-4 py-2 rounded-md text-sm font-medium transition-colors"])}" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:view-dashboard",
        class: "mr-1"
      }, null, _parent));
      _push(` Todos </button><button class="${ssrRenderClass([{
        "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200": activeFilter.value === "branches",
        "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700": activeFilter.value !== "branches"
      }, "px-4 py-2 rounded-md text-sm font-medium transition-colors"])}" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:source-branch",
        class: "mr-1"
      }, null, _parent));
      _push(` Sucursales </button><button class="${ssrRenderClass([{
        "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200": activeFilter.value === "zones",
        "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700": activeFilter.value !== "zones"
      }, "px-4 py-2 rounded-md text-sm font-medium transition-colors"])}" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:map-marker-multiple",
        class: "mr-1"
      }, null, _parent));
      _push(` Zonas </button><button class="${ssrRenderClass([{
        "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200": activeFilter.value === "tanks",
        "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700": activeFilter.value !== "tanks"
      }, "px-4 py-2 rounded-md text-sm font-medium transition-colors"])}" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:fish",
        class: "mr-1"
      }, null, _parent));
      _push(` Estanques </button><button class="${ssrRenderClass([{
        "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200": activeFilter.value === "users",
        "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700": activeFilter.value !== "users"
      }, "px-4 py-2 rounded-md text-sm font-medium transition-colors"])}" data-v-0a39439c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:account-group",
        class: "mr-1"
      }, null, _parent));
      _push(` Usuarios </button></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr" data-v-0a39439c>`);
      if (activeFilter.value === "all" || activeFilter.value === "branches") {
        _push(ssrRenderComponent(_sfc_main$4, { onCreateBranch: openCreateBranchModal }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeFilter.value === "all" || activeFilter.value === "zones") {
        _push(ssrRenderComponent(_sfc_main$3, { onCreateZone: openCreateZoneModal }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeFilter.value === "all" || activeFilter.value === "tanks") {
        _push(ssrRenderComponent(_sfc_main$2, { onCreateTank: openCreateTankModal }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeFilter.value === "all" || activeFilter.value === "users") {
        _push(ssrRenderComponent(_sfc_main$1, { onCreateUser: openCreateUserModal }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (isCreateBranchModalOpen.value) {
        _push(ssrRenderComponent(createBranchModal, {
          onClose: closeCreateBranchModal,
          onBranchCreated: handleBranchCreated
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isCreateCameraTypeModalOpen.value) {
        _push(ssrRenderComponent(_sfc_main$a, {
          onClose: closeCreateCameraTypeModal,
          onCameraTypeCreated: handleCameraTypeCreated
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isCreateSensorTypeModalOpen.value) {
        _push(ssrRenderComponent(_sfc_main$9, {
          onClose: closeCreateSensorTypeModal,
          onSensorTypeCreated: handleSensorTypeCreated
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isCreateZoneModalOpen.value) {
        _push(ssrRenderComponent(_sfc_main$8, {
          onClose: closeCreateZoneModal,
          onZoneCreated: handleZoneCreated
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isCreateCameraModalOpen.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          onClose: closeCreateCameraModal,
          onCameraCreated: handleCameraCreated
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isCreateSensorModalOpen.value) {
        _push(ssrRenderComponent(_sfc_main$6, {
          onClose: closeCreateSensorModal,
          onSensorCreated: handleSensorCreated
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isCreateTankModalOpen.value) {
        _push(ssrRenderComponent(_sfc_main$5, {
          onClose: closeCreateTankModal,
          onTankCreated: handleTankCreated
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/control-panel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const controlPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a39439c"]]);

export { controlPanel as default };
//# sourceMappingURL=control-panel-B3kILJ6m.mjs.map
