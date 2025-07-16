<template>
  <div class="min-h-screen bg-gray-900 text-gray-200">
    <!-- Header Container -->
    <div
      :style="{ marginLeft: isSidebarOpen ? '16rem' : '4rem' }"
      class="fixed top-0 right-0 left-0 z-40 transition-all duration-300"
    >
      <AppHeader
        @toggle-sidebar="toggleSidebar"
        :is-sidebar-open="isSidebarOpen"
      />
    </div>

    <AppSidebar :is-open="isSidebarOpen" />

    <main
      class="transition-all duration-300"
      :style="{
        paddingTop: '4rem',
        marginLeft: isSidebarOpen ? '16rem' : '4rem',
      }"
    >
      <div>
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
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
</style>
