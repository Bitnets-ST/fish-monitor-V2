<template>
  <div class="login-screen">
    <!-- Fondo de partículas -->
    <MouseEffectBackground class="effect-canvas" />

    <!-- Contenedor principal -->
    <div class="login-container">
      <!-- Columna izquierda: Formulario -->
      <div class="form-side">
        <div class="logo-wrapper">
          <div class="logo-container">
            <img src="/Logo1.png" alt="FishMonitor Logo" class="logo-img" />
          </div>
          <div class="glow"></div>
        </div>
        <div class="form-box">
          <h2 class="title">Bienvenido</h2>
          <form class="space-y-4" @submit.prevent="handleLogin">
            <div class="mb-4 w-full">
              <label for="email" class="block text-sm font-medium text-gray-600">Correo electrónico</label>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="tu@email.com"
              />
            </div>
            <div class="mb-4 w-full">
              <label for="password" class="block text-sm font-medium text-gray-600">Contraseña</label>
              <input
                type="password"
                id="password"
                v-model="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
              <div class="flex items-center">
                <input id="remember" type="checkbox" class="mr-2 w-4 h-4 accent-blue-500">
                <label for="remember" class="text-gray-600 text-sm select-none">Recuérdame</label>
              </div>
              <a href="#" class="text-blue-500 text-sm hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <div v-if="authStore.error" class="p-3 bg-red-100 text-red-700 border border-red-200 rounded-md text-sm w-full">
              {{ authStore.error }}
            </div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors tracking-wide uppercase disabled:opacity-50"
            >
              <span v-if="authStore.loading">CARGANDO...</span>
              <span v-else>INGRESAR</span>
            </button>
          </form>
          <div class="text-center mt-4">
            <p class="text-gray-600 text-sm">
              ¿No tienes una cuenta?
              <NuxtLink to="/auth/register" class="text-pink-500 font-semibold hover:underline ml-1">
                Regístrate
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
      <!-- Columna derecha: Imagen (solo en desktop) -->
      <div class="image-side">
        <img src="/Fondo.png" alt="Piscicultura" class="side-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { definePageMeta } from "#imports";
import MouseEffectBackground from '~/components/MouseEffectBackground.vue';

// Indicar a Nuxt que esta página no debe usar el layout por defecto
definePageMeta({
  layout: false,
});

const authStore = useAuthStore();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  await authStore.login({ email: email.value, password: password.value });
  // La redirección se maneja dentro de la acción de login si es exitosa
};
</script>

<style scoped>
.login-screen {
  min-height: 100vh;
  width: 100vw;
  background: #01374a;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.effect-canvas {
  position: absolute;
  top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0;
}
.login-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: rgba(255,255,255,0.05);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  margin: 2rem 0;
}
.form-side {
  width: 100%;
  max-width: 420px;
  background: rgba(255,255,255,0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem 2rem 2rem;
  position: relative;
  z-index: 2;
}
.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
}
.logo-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 15px rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite ease-in-out;
  position: relative;
  z-index: 2;
}
.logo-img {
  width: 85px;
  height: 85px;
  object-fit: contain;
  border-radius: 50%;
}
.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(30,144,255,0.4) 40%, rgba(0,0,0,0) 70%);
  z-index: 1;
  opacity: 0.7;
  animation: glowPulse 2s infinite alternate;
}
@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 15px rgba(255,255,255,0.8);}
  50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(255,255,255,0.9);}
  100% { transform: scale(1); box-shadow: 0 0 15px rgba(255,255,255,0.8);}
}
@keyframes glowPulse {
  0% { opacity: 0.4; width: 120px; height: 120px;}
  100% { opacity: 0.7; width: 150px; height: 150px;}
}
.form-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  color: #01374a;
  margin-bottom: 1.2rem;
  text-align: center;
}
.image-side {
  display: none;
  background: #01374a;
}
.side-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-width: 350px;
  min-height: 100%;
  max-height: 500px;
  display: block;
}
@media (min-width: 900px) {
  .login-container {
    min-width: 700px;
    max-width: 900px;
    height: 500px;
  }
  .form-side {
    max-width: 420px;
    min-width: 350px;
    height: 100%;
    padding: 2.5rem 2rem 2rem 2rem;
  }
  .image-side {
    display: block;
    width: 100%;
    min-width: 350px;
    height: 100%;
    position: relative;
    z-index: 1;
  }
}
@media (max-width: 899px) {
  .login-container {
    flex-direction: column;
    min-width: 320px;
    max-width: 95vw;
    height: auto;
  }
  .image-side {
    display: none;
  }
}
</style>
