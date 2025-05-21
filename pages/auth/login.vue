<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"
  >
    <div
      class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <h1
        class="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6"
      >
        Iniciar Sesión
      </h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="tu@email.com"
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >Contraseña</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="••••••••"
          />
        </div>
        <div v-if="authStore.error" class="mb-4 text-red-500 text-sm">
          {{ authStore.error }}
        </div>
        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <span v-if="authStore.loading">Cargando...</span>
          <span v-else>Ingresar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { definePageMeta } from "#imports";

// Indicar a Nuxt que esta página no debe usar el layout por defecto
definePageMeta({
  layout: false,
});

const authStore = useAuthStore();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  await authStore.login({ email: email.value, password: password.value });
  // La redirección se maneja dentro de la acción de login si es exitosa
};
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>
