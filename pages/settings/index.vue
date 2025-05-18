<template>
  <h1 class="text-2xl font-semibold">Settings</h1>
</template>
<script>
import { defineComponent } from "vue";
import { definePageMeta } from "#imports"; // O Nuxt lo auto-importa

definePageMeta({
  middleware: "auth", // o ['auth'] si tienes varios
});

export default defineComponent({
  name: "SettingsPage",
});
</script>
<style scoped></style>
