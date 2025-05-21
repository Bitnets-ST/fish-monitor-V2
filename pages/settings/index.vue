<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
          AJUSTES
        </h1>
        <button
          v-if="authStore.isAuthenticated"
          class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm font-medium transition duration-150 ease-in-out"
          @click="handleLogout"
        >
          Cerrar Sesión
        </button>
      </div>

      <div
        v-if="authStore.isAuthenticated && authStore.user"
        class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6"
      >
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Bienvenido, {{ authStore.user.name }}!
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Tu rol es:
          <span class="font-medium text-indigo-600 dark:text-indigo-400">{{
            authStore.user.role
          }}</span>
        </p>
        <p class="text-gray-600 dark:text-gray-300 mt-1">
          Email: {{ authStore.user.email }}
        </p>
      </div>

      <div v-else-if="authStore.loading" class="text-center py-10">
        <p class="text-gray-600 dark:text-gray-300">
          Cargando información del usuario...
        </p>
      </div>

      <div class="mt-8">
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Contenido del Dashboard
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Aquí puedes agregar los componentes principales de tu dashboard, como
          gráficos, tablas de datos, etc.
        </p>
        <!-- Ejemplo de contenido protegido por rol -->
        <div
          v-if="authStore.isAdmin"
          class="mt-6 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-md"
        >
          <h4 class="text-lg font-semibold text-blue-700 dark:text-blue-300">
            Panel de Administrador
          </h4>
          <p class="text-blue-600 dark:text-blue-400">
            Este contenido solo es visible para administradores.
          </p>
        </div>
        <div
          v-if="authStore.isSupervisor"
          class="mt-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md"
        >
          <h4 class="text-lg font-semibold text-green-700 dark:text-green-300">
            Panel de Supervisor
          </h4>
          <p class="text-green-600 dark:text-green-400">
            Este contenido es visible para supervisores y administradores.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  // La redirección se maneja en la acción de logout
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
