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
          <div class="back-button-container">
            <NuxtLink to="/auth/login" class="back-button">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Volver al Login
            </NuxtLink>
          </div>
          <h2 class="title">Crear Cuenta</h2>
          <form class="space-y-6" @submit.prevent="handleRegister">
            <div class="modern-input-group">
              <input
                type="text"
                id="name"
                v-model="name"
                required
                class="modern-input peer"
                placeholder=" "
              />
              <label for="name" class="modern-label">Nombre Completo</label>
            </div>
            <div class="modern-input-group">
              <input
                type="email"
                id="email"
                v-model="email"
                required
                class="modern-input peer"
                placeholder=" "
              />
              <label for="email" class="modern-label">Correo electrónico</label>
            </div>
            <div class="modern-input-group">
              <input
                type="password"
                id="password"
                v-model="password"
                required
                minlength="6"
                class="modern-input peer"
                placeholder=" "
              />
              <label for="password" class="modern-label">Contraseña</label>
            </div>
            <div v-if="authStore.error" class="p-3 bg-red-100 text-red-700 border border-red-200 rounded-md text-sm w-full">
              {{ authStore.error }}
            </div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="modern-btn"
            >
              <span v-if="authStore.loading">Registrando...</span>
              <span v-else>Crear Cuenta</span>
            </button>
          </form>
          <div class="text-center mt-4">
            <p class="text-gray-600 text-sm">
              ¿Ya tienes una cuenta?
              <NuxtLink to="/auth/login" class="text-blue-500 font-semibold hover:underline ml-1">
                Inicia Sesión
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

definePageMeta({
  layout: false,
});

const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");

const handleRegister = async () => {
  await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
  });
  // La redirección se maneja en el store si es exitosa
};
</script>

<style scoped>
/* --- Modern input styles --- */
.modern-input-group {
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
}
.modern-input {
  width: 100%;
  padding: 1.1rem 1rem 0.5rem 1rem;
  font-size: 1rem;
  background: #fff;
  border: 1.5px solid #d1d5db;
  border-radius: 0.75rem;
  outline: none;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.07);
  transition: border 0.2s, box-shadow 0.2s;
}
.modern-input:focus {
  border-color: #2563eb;
  box-shadow: 0 4px 16px 0 rgba(37, 99, 235, 0.10);
}
.modern-label {
  position: absolute;
  left: 1rem;
  top: 1.1rem;
  color: #6b7280;
  font-size: 1rem;
  pointer-events: none;
  background: transparent;
  transition: all 0.18s cubic-bezier(.4,0,.2,1);
}
.modern-input:focus + .modern-label,
.modern-input:not(:placeholder-shown) + .modern-label {
  top: 0.2rem;
  left: 0.9rem;
  font-size: 0.85rem;
  color: #2563eb;
  background: #fff;
  padding: 0 0.2rem;
}

.modern-btn {
  width: 100%;
  padding: 0.85rem 0;
  background: #2563eb;
  color: #fff;
  font-weight: bold;
  font-size: 1.08rem;
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.13);
  transition: background 0.2s, box-shadow 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.modern-btn:hover:not(:disabled) {
  background: #1d4ed8;
  box-shadow: 0 4px 16px 0 rgba(37, 99, 235, 0.18);
}
.modern-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
/* --- Mantén el resto de los estilos del layout igual que login --- */
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
  padding: 2rem 2rem 2rem 2rem;
  position: relative;
  z-index: 2;
}
.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;
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
.back-button-container {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  background: rgba(37, 99, 235, 0.1);
}

.back-button:hover {
  background: rgba(37, 99, 235, 0.15);
  transform: translateX(-2px);
}

.back-button svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
