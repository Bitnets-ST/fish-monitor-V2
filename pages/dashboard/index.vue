<template>
  <div class="flex flex-center w-full">
    <div class="w-full flex flex-col items-center">
      <Sucursales class="mt-8" />
    </div>
  </div>
</template>

<script setup>
import { definePageMeta } from "#imports";
import Sucursales from "~/components/Sucursales.vue";

definePageMeta({
  middleware: "auth", // o ['auth'] si tienes varios
});
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
