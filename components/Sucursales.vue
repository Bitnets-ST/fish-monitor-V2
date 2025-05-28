<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="ocean-background">
    <div class="wave-container">
      <div class="wave"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
    </div>

    <div class="sucursales-page-container">
      <div class="page-header">
        <div class="title-bubble">
          <h2 class="page-title">Psiculturas</h2>
        </div>
      </div>

      <div class="flex flex-wrap gap-8 mb-6 justify-center">
        <div v-for="branch in branches" :key="branch._id" class="branch-card">
          <div class="card-content">
            <div class="branch-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm14 8h-2v7h2v-7z"
                  fill="rgba(255,255,255,0.9)"
                />
              </svg>
            </div>
            <span class="branch-name">{{ branch.name }}</span>

            <div class="zone-list" v-if="branch.zonas && branch.zonas.length">
              <div class="zone-list-title">Zonas:</div>
              <div class="zone-tags">
                <span
                  v-for="zona in branch.zonas"
                  :key="zona._id"
                  class="zone-tag"
                >
                  {{ zona.name }}
                </span>
              </div>
            </div>
            <div v-else class="zone-list-empty">No hay zonas registradas</div>

            <button class="ver-btn" @click="goToZonas(branch._id)">
              <span>Ver</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <!-- Burbujas decorativas -->
          <div class="bubbles">
            <div class="bubble bubble-1"></div>
            <div class="bubble bubble-2"></div>
            <div class="bubble bubble-3"></div>
            <div class="bubble bubble-4"></div>
          </div>
        </div>
      </div>

      <!-- Decoración: peces -->
      <div class="fish fish-1"></div>
      <div class="fish fish-2"></div>
      <div class="fish fish-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const branches = ref([]);
const router = useRouter();

const fetchBranches = async () => {
  try {
    const response = await $fetch("/api/get/branch");
    if (response.success && response.branches) {
      // Para cada sucursal, obtener sus zonas
      const branchesWithZones = await Promise.all(
        response.branches.map(async (branch) => {
          const zonesRes = await $fetch(
            `/api/get/zone?branch_id=${branch._id}`
          );
          return {
            ...branch,
            zonas: zonesRes.success && zonesRes.zones ? zonesRes.zones : [],
          };
        })
      );
      branches.value = branchesWithZones;
    }
  } catch (error) {
    // Manejo de error opcional
  }
};

const goToZonas = (branchId) => {
  router.push({ path: `/dashboard/branch/${branchId}` });
};

onMounted(() => {
  fetchBranches();
});
</script>

<style scoped>
/* Fondo marino - Asegurarnos que tenga min-height 100vh */
.ocean-background {
  min-height: 100vh;
  height: auto; /* Permitir que la altura se ajuste al contenido si supera 100vh */
  background: linear-gradient(180deg, #05445e 0%, #022c45 70%, #021926 100%);
  /* Usar posicionamiento absoluto para cubrir el padre */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  padding: 2rem 1rem;
}

/* Efecto de olas en el fondo */
.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
  pointer-events: none;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 120px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%2375E6DA" fill-opacity="0.4" d="M0,192L60,186.7C120,181,240,171,360,149.3C480,128,600,96,720,90.7C840,85,960,107,1080,112C1200,117,1320,107,1380,101.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>');
  background-repeat: repeat-x;
  background-position: 0 bottom;
  background-size: 50% 120px;
  animation: wave 15s linear infinite;
  opacity: 0.8;
}

.wave2 {
  animation: wave2 10s linear infinite;
  opacity: 0.6;
  background-position: 100px bottom;
}

.wave3 {
  animation: wave 18s linear infinite;
  opacity: 0.4;
  bottom: 10px;
  background-position: -150px bottom;
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes wave2 {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Contenedor principal - Ajustar para que se parezca al de la página de zonas */
.sucursales-page-container {
  max-width: 1000px;
  margin: 0 auto;
  /* Ajustar el padding vertical para dar espacio y empujar el contenido */
  padding: 2rem 0; /* padding vertical de 2rem, horizontal 0 (ya que el padre tiene) */
  /* Posicionamiento relativo y z-index para estar encima del fondo absoluto */
  position: relative;
  z-index: 2;
  display: block;
  /* Añadir padding-top para dar espacio sobre el contenido - Aumentado */
  padding-top: 10rem; /* Ajusta este valor si necesitas más o menos espacio desde arriba */
}

/* Encabezado */
.page-header {
  text-align: center;
  /* Eliminar margen inferior si el padding del contenedor ya maneja el espacio */
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  position: relative; /* Necesario para que el z-index funcione correctamente en algunos casos */
  z-index: 3; /* Asegurar que el encabezado esté encima de todo si hay solapamiento */
}

.title-bubble {
  background: rgba(117, 230, 218, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 0.8rem 2.5rem;
  border: 2px solid rgba(189, 224, 254, 0.4);
  display: inline-block;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: #effffd;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
  margin: 0;
}

/* Tarjetas de sucursales */
/* Seleccionar el div que contiene las tarjetas */
.sucursales-page-container > .flex.flex-wrap.gap-8.mb-6.justify-center {
  /* Ajustar el margen superior para separar del encabezado */
  margin-top: 2rem; /* Espacio entre el encabezado y las tarjetas */
  margin-bottom: 1.5rem; /* Mantener o ajustar si es necesario */
}

.branch-card {
  background: linear-gradient(
    135deg,
    rgba(189, 224, 254, 0.3) 0%,
    rgba(117, 230, 218, 0.2) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  min-width: 280px;
  max-width: 320px;
  height: 320px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.branch-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.card-content {
  background: rgba(6, 90, 130, 0.8);
  border-radius: 1.5rem;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(189, 224, 254, 0.3);
}

/* Icono de sucursal */
.branch-icon {
  background: rgba(189, 224, 254, 0.2);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.branch-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #effffd;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Lista de zonas */
.zone-list {
  width: 100%;
  margin-top: 0.5rem;
  text-align: center;
}

.zone-list-title {
  font-size: 1rem;
  font-weight: 600;
  color: #75e6da;
  margin-bottom: 0.7rem;
}

.zone-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.zone-tag {
  background: rgba(189, 224, 254, 0.2);
  border-radius: 1rem;
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  color: #effffd;
  border: 1px solid rgba(189, 224, 254, 0.3);
}

.zone-list-empty {
  color: #bde0fe;
  font-size: 0.95rem;
  opacity: 0.8;
  margin-top: 1rem;
  text-align: center;
}

/* Botón Ver */
.ver-btn {
  background: #189ab4;
  color: #effffd;
  border: none;
  border-radius: 1.5rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: auto;
  cursor: pointer;
  transition: background 0.18s, transform 0.18s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ver-btn:hover {
  background: #05445e;
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Burbujas decorativas */
.bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.bubble {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: bubble-float 8s infinite ease-in;
  opacity: 0;
}

.bubble-1 {
  width: 20px;
  height: 20px;
  bottom: 20px;
  left: 30%;
  animation-delay: 0s;
}

.bubble-2 {
  width: 15px;
  height: 15px;
  bottom: 40px;
  right: 30%;
  animation-delay: 2s;
}

.bubble-3 {
  width: 10px;
  height: 10px;
  bottom: 80px;
  left: 20%;
  animation-delay: 4s;
}

.bubble-4 {
  width: 25px;
  height: 25px;
  bottom: 15px;
  right: 20%;
  animation-delay: 6s;
}

@keyframes bubble-float {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-280px);
    opacity: 0;
  }
}

/* Peces decorativos */
.fish {
  position: absolute;
  width: 40px;
  height: 20px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%2375E6DA" d="M5.414 7H9a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5v-6A.5.5 0 0 1 3 1h6a.5.5 0 0 1 0 1H5.414l3.293 3.293a1 1 0 0 1 0 1.414L5.414 7Z"/></svg>');
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.6;
  z-index: 0;
}

.fish-1 {
  top: 15%;
  left: 5%;
  animation: fish-swim 20s linear infinite;
}

.fish-2 {
  top: 40%;
  right: 5%;
  transform: scaleX(-1);
  animation: fish-swim-reverse 25s linear infinite;
}

.fish-3 {
  bottom: 20%;
  left: 10%;
  animation: fish-swim 30s linear infinite;
}

@keyframes fish-swim {
  0% {
    transform: translateX(-100px);
  }
  50% {
    transform: translateX(calc(100vw + 100px));
  }
  50.1% {
    transform: translateX(calc(100vw + 100px)) scaleX(-1);
  }
  100% {
    transform: translateX(-100px) scaleX(-1);
  }
}

@keyframes fish-swim-reverse {
  0% {
    transform: translateX(calc(100vw + 100px)) scaleX(-1);
  }
  50% {
    transform: translateX(-100px) scaleX(-1);
  }
  50.1% {
    transform: translateX(-100px) scaleX(1);
  }
  100% {
    transform: translateX(calc(100vw + 100px)) scaleX(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.8rem;
  }

  .branch-card {
    min-width: 260px;
    height: 300px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5rem;
  }

  .branch-card {
    min-width: 100%;
    height: 280px;
  }

  .title-bubble {
    padding: 0.7rem 1.5rem;
  }
}
</style>
