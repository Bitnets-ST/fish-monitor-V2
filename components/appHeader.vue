<template>
  <header class="fixed top-0 left-0 right-0 bg-gray-800 z-30 h-16">
    <div class="flex items-center justify-between h-full px-4">
      <button
      class="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      @click="$emit('toggle-sidebar')"
      >
        <Icon
          name="material-symbols:menu-rounded"
          class="h-6 w-6 text-white"
        />
      </button>

      <div class="flex-1 text-center">
        <h1 class="text-xl font-semibold text-white">Fish Monitor</h1>
      </div>

      <div class="flex items-center space-x-4">
        <div v-if="authStore.isAuthenticated && authStore.user" class="text-white">
          <span class="text-sm">Hola, {{ authStore.user.name }}</span>
        </div>
        <button 
          v-if="authStore.isAuthenticated"
          
          class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md shadow-sm font-medium transition duration-150 ease-in-out"
          @click="handleLogout"
        >
          Salir
        </button>
        <!-- Placeholder si no está autenticado o para balancear el espacio -->
        <div v-else class="w-8"/> 
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '~/stores/auth';

export default defineComponent({
  name: "AppHeader",
  emits: ["toggle-sidebar"],
  setup() {
    const authStore = useAuthStore();

    const handleLogout = async () => {
      await authStore.logout();
      // La redirección se maneja en la acción de logout del store
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
</script>
