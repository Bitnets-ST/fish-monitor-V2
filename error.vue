<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
    <div class="text-center max-w-2xl mx-auto">
      <div class="text-9xl font-bold text-blue-500 mb-4">404</div>
      <h1 class="text-4xl font-bold mb-4">¡Ups! Página no encontrada</h1>
      <p class="text-xl text-gray-300 mb-8">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <div class="flex justify-center gap-4">
        <NuxtLink 
          to="/"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Volver al inicio
        </NuxtLink>
        <button 
          @click="goBack"
          class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Volver atrás
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};

definePageMeta({
  layout: false, // No usar ningún layout para la página de error
});
</script>

<style scoped>
/* Estilos específicos para la página de error */
</style>
