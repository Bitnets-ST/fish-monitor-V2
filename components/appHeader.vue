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
        <!-- Removed authentication-related content -->
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "AppHeader",
  emits: ["toggle-sidebar"]
});
</script>
