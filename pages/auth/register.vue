<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">Crear Cuenta</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Nombre Completo</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Tu Nombre"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="tu@email.com"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            minlength="6"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Confirmar Contraseña</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Repite tu contraseña"
          />
        </div>
         <div class="mb-4">
          <label for="user_description" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Descripción (Opcional)</label>
          <textarea 
            id="user_description" 
            v-model="user_description" 
            rows="2"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            placeholder="Breve descripción sobre ti o tu rol"
          ></textarea>
        </div>

        <div v-if="authStore.error || passwordMismatch" class="mb-4 text-red-500 text-sm">
          <p v-if="passwordMismatch">Las contraseñas no coinciden.</p>
          <p v-if="authStore.error">{{ authStore.error }}</p>
        </div>

        <button 
          type="submit" 
          :disabled="authStore.loading || passwordMismatch" 
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <span v-if="authStore.loading">Registrando...</span>
          <span v-else>Crear Cuenta</span>
        </button>

        <div class="mt-6 text-center">
          <nuxt-link to="/auth/login" class="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            ¿Ya tienes una cuenta? Inicia Sesión
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { definePageMeta } from '#imports';

// Esta página tampoco usará el layout por defecto
definePageMeta({
  layout: false,
});

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const authStore = useAuthStore();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const user_description = ref('');

    const passwordMismatch = computed(() => {
      return password.value && confirmPassword.value && password.value !== confirmPassword.value;
    });

    const handleRegister = async () => {
      if (passwordMismatch.value) {
        // El error ya se muestra por el computed property
        return;
      }
      // La acción de register la crearemos en el store a continuación
      await authStore.register({
        name: name.value,
        email: email.value,
        password: password.value,
        user_description: user_description.value
      });
      // La redirección se manejará dentro de la acción de register si es exitosa
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      user_description,
      handleRegister,
      authStore,
      passwordMismatch
    };
  }
});
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>
