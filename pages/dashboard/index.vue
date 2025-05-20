<template>
  <q-page class="flex flex-center">
    <div class="w-full flex flex-col items-center">
      <q-btn @click="handleLogout">Logout</q-btn>
      <Sucursales class="mt-8" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { definePageMeta } from '#imports';
import Sucursales from '~/components/Sucursales.vue';

definePageMeta({
  middleware: 'auth' // o ['auth'] si tienes varios
});

export default defineComponent({
  name: 'DashboardPage',
  components: {
    Sucursales
  },
  methods: {
    handleLogout() {
      // aquí va tu lógica de logout
      console.log('Cerrar sesión');
    }
  }
});
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
