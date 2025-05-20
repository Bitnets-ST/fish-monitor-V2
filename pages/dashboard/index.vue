<template>
  <q-page class="flex flex-center">
    <q-btn @click="handleLogout">Logout</q-btn>
  </q-page>
</template>

<script>
import { defineComponent} from 'vue';
import { definePageMeta } from '#imports';

definePageMeta({
  middleware: 'auth' // o ['auth'] si tienes varios
});

export default defineComponent({
  name: 'DashboardPage',
});
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>