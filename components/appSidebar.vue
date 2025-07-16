<template>
  <aside
    class="fixed top-16 left-0 bottom-0 bg-gray-800 text-white transition-none z-20"
    :class="isOpen ? 'w-64' : 'w-16'"
    style="transition-property: width; transition-duration: 0ms"
  >
    <div class="h-full flex flex-col">
      <div
        class="p-4 flex items-center"
        :class="isOpen ? 'justify-start' : 'justify-center'"
      >
        <Icon
          v-if="!isOpen"
          name="material-symbols:water- मछली"
          class="h-8 w-8 text-blue-400"
        />
        <span v-if="isOpen" class="text-xl font-bold ml-2">FishMonitor</span>
      </div>

      <nav class="mt-4 flex-grow">
        <ul>
          <li v-for="item in menuItems" :key="item.path" class="mb-1">
            <NuxtLink
              :to="item.path"
              class="flex items-center py-2 px-3 mx-2 rounded hover:bg-gray-700"
              :title="item.title"
              active-class="bg-gray-600 font-semibold"
            >
              <span class="flex items-center justify-center w-8 h-8">
                <Icon :name="item.icon" class="h-5 w-5" />
              </span>
              <span v-if="isOpen" class="ml-3">{{ item.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: "AppSidebar",
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const menuItems = [
      {
        path: "/dashboard",
        title: "Dashboard",
        icon: "material-symbols:dashboard-outline-rounded",
      },
      {
        path: "/settings",
        title: "Ajustes",
        icon: "material-symbols:settings-outline-rounded",
      },
      {
        path: "/cameras",
        title: "Camaras",
        icon: "material-symbols:security",
      },
      {
        path: "/settings/control-panel",
        title: "Panel de Control",
        icon: "material-symbols:admin-panel-settings-outline-rounded",
      }
    ];

    return {
      menuItems,
    };
  },
};
</script>
