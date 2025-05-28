<template>
  <div class="map-container">
    <div class="image-wrapper">
      <img src= "/public/mapa.png" alt="Piscicultura Mowi" ref="mapImage" @load="initMap" @click="logClickPosition">

      <!-- Capa de estanques interactivos -->
      <div class="pools-layer">
        <div v-for="(pool, index) in pools" :key="pool.id" class="pool-highlight" :style="getPoolStyle(pool, index)"
          @mouseenter="setActivePool(index)" @mouseleave="activePool = null">
          <div v-if="activePool === index" class="pool-tooltip">
            <h4>{{ pool.title }}</h4>
            <p>{{ pool.tooltip }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePool: null,
      imgSize: { width: 0, height: 0 },
      pools: [
        { id: 1, shape: "circle", coords: { cx: 353, cy: 368, r: 30 }, title: "Estanque 301", tooltip: "Capacidad: 10,000 peces" },
        { id: 2, shape: "circle", coords: { cx: 354, cy: 406, r: 30 }, title: "Estanque 302", tooltip: "Capacidad: 9,500 peces" },
        { id: 3, shape: "circle", coords: { cx: 359, cy: 453, r: 30 }, title: "Estanque 303", tooltip: "Capacidad: 11,000 peces" },
        { id: 4, shape: "circle", coords: { cx: 362, cy: 499, r: 30 }, title: "Estanque 304", tooltip: "Capacidad: 8,500 peces" },
        { id: 5, shape: "circle", coords: { cx: 486, cy: 362, r: 30 }, title: "Estanque 305", tooltip: "Capacidad: 12,000 peces" },
        { id: 6, shape: "circle", coords: { cx: 489, cy: 408, r: 30 }, title: "Estanque 306", tooltip: "Capacidad: 10,500 peces" },
        { id: 7, shape: "circle", coords: { cx: 494, cy: 455, r: 30 }, title: "Estanque 307", tooltip: "Capacidad: 9,000 peces" },
        { id: 8, shape: "circle", coords: { cx: 495, cy: 499, r: 30 }, title: "Estanque 308", tooltip: "Capacidad: 11,500 peces" }
      ]
    }
  },
  methods: {
    initMap() {
      this.updateImageSize();
      window.addEventListener('resize', this.updateImageSize);
    },
    updateImageSize() {
      if (this.$refs.mapImage) {
        this.imgSize = {
          width: this.$refs.mapImage.offsetWidth,
          height: this.$refs.mapImage.offsetHeight
        };
      }
    },
    logClickPosition(event) {
      const rect = this.$refs.mapImage.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left);
      const y = Math.round(event.clientY - rect.top);
      console.log(`Coordenadas: ${x}, ${y}`);
    },
    setActivePool(index) {
      this.activePool = index;
    },
    getPoolStyle(pool, index) {
      if (pool.shape === "circle") {
        return {
          left: `${pool.coords.cx - pool.coords.r}px`,
          top: `${pool.coords.cy - pool.coords.r}px`,
          width: `${pool.coords.r * 2}px`,
          height: `${pool.coords.r * 2}px`,
          borderRadius: '50%',
          backgroundColor: this.activePool === index ? 'rgba(255, 0, 0, 0.4)' : 'transparent',
          border: this.activePool === index ? '2px solid rgba(255, 0, 0, 0.8)' : 'none',
          pointerEvents: 'auto'
        };
      }
      return {};
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateImageSize);
  }
}
</script>

<style scoped>
.map-container {
  position: relative;
  max-width: 100%;
  margin: 0 auto;
}

.image-wrapper {
  position: relative;
  display: inline-block;
}

.image-wrapper img {
  display: block;
  max-width: 100%;
  height: auto;
}

.pools-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.pool-highlight {
  position: absolute;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 50%;
  transform: scaleX(1.4);
  transform-origin: center;
}

.pool-highlight:hover {
  background-color: rgba(255, 0, 0, 0.4) !important;
}

.pool-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4444;
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  min-width: 180px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 100;
}

.pool-tooltip h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.pool-tooltip p {
  margin: 0;
  font-size: 14px;
}

.pool-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: #ff4444 transparent transparent transparent;
}

.pool-highlight {
  border-radius: 50% !important;
}

.pools-layer {
  pointer-events: none;
}

.pool-highlight:hover {
  pointer-events: auto;
}
</style>