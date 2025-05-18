<template>
  <div class="min-h-screen bg-gray-900 text-gray-200">
    <!-- Header Container -->
    <div :style="{ marginLeft: isSidebarOpen ? '16rem' : '4rem' }" class="fixed top-0 right-0 left-0 z-40 transition-all duration-300">
      <AppHeader @toggle-sidebar="toggleSidebar" :is-sidebar-open="isSidebarOpen" />
      <GlobalStatsHeader />
    </div>

    <AppSidebar :is-open="isSidebarOpen" />

    <main
      class="transition-all duration-300"
      :style="{
        paddingTop: 'calc(4rem + 110px)',
        marginLeft: isSidebarOpen ? '16rem' : '4rem',
      }"
    >
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
// Nuxt 3 auto-importa componentes de la carpeta /components.
// Si prefieres ser explícito o la auto-importación falla por alguna razón:
// import AppHeader from '~/components/appHeader.vue';
// import AppSidebar from '~/components/appSidebar.vue';

export default {
  name: "DefaultLayout",
  // components: { // Descomenta si necesitas importación explícita
  //   AppHeader,
  //   AppSidebar
  // },
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}

/* Ensure AppHeader adapts if its content changes based on sidebar state */
/* You might need to adjust AppHeader's internal styling or pass isSidebarOpen to it if its width needs to change */
</style>
