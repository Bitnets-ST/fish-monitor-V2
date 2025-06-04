<template>
  <div class="map-container">
    <div class="image-wrapper">
      <img src= "/public/mapa.png" alt="Piscicultura Mowi" ref="mapImage" @load="initMap" @click="logClickPosition">

      <!-- Capa de estanques interactivos -->
      <div class="pools-layer">
        <div v-for="(pool, index) in pools" :key="pool.id" class="pool-highlight" :style="getPoolStyle(pool, index)"
          @mouseenter="setActivePool(index)" @mouseleave="activePool = null">
          <div v-if="activePool === index" class="pool-tooltip"
               :style="pool.shape === 'circle' ? { backgroundColor: '#FFA500', borderTopColor: '#FFA500' } : {}">
            <h4>{{ pool.title }}</h4>
            <p>{{ pool.tooltip }}</p>
            <p>Biomasa: {{ pool.biomass }}</p>
            <p>pH: {{ pool.ph }}</p>
            <p>Temperatura: {{ pool.temperature }}</p>
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
        { id: 1, shape: "oval", coords: { cx: 342, cy: 622, r: 20 }, title: "Estanque 301", tooltip: "Capacidad: 10,000 peces", biomass: "500 kg", ph: "7.2", temperature: "15°C" },
        { id: 2, shape: "oval", coords: { cx: 340, cy: 500, r: 20 }, title: "Estanque 302", tooltip: "Capacidad: 9,500 peces", biomass: "480 kg", ph: "7.1", temperature: "15.5°C" },
        { id: 3, shape: "oval", coords: { cx: 382, cy: 619, r: 20 }, title: "Estanque 303", tooltip: "Capacidad: 11,000 peces", biomass: "550 kg", ph: "7.3", temperature: "14.8°C" },
        { id: 4, shape: "oval", coords: { cx: 379, cy: 498, r: 20 }, title: "Estanque 304", tooltip: "Capacidad: 8,500 peces", biomass: "400 kg", ph: "7.0", temperature: "15.2°C" },
        { id: 5, shape: "oval", coords: { cx: 421, cy: 617, r: 20 }, title: "Estanque 305", tooltip: "Capacidad: 12,000 peces", biomass: "600 kg", ph: "7.4", temperature: "16°C" },
        { id: 6, shape: "oval", coords: { cx: 424, cy: 495, r: 20 }, title: "Estanque 306", tooltip: "Capacidad: 10,500 peces", biomass: "520 kg", ph: "7.2", temperature: "15.8°C" },
        { id: 7, shape: "oval", coords: { cx: 464, cy: 614, r: 20 }, title: "Estanque 307", tooltip: "Capacidad: 9,000 peces", biomass: "450 kg", ph: "7.1", temperature: "15.1°C" },
        { id: 8, shape: "oval", coords: { cx: 466, cy: 489, r: 20 }, title: "Estanque 308", tooltip: "Capacidad: 11,500 peces", biomass: "580 kg", ph: "7.3", temperature: "15.6°C" },
        { id: 601, shape: "circle", coords: { cx: 936, cy: 382, r: 25 }, title: "Estanque 601", tooltip: "Capacidad: Desconocida", biomass: "300 kg", ph: "7.5", temperature: "17°C" },
        { id: 602, shape: "circle", coords: { cx: 1000, cy: 348, r: 25 }, title: "Estanque 602", tooltip: "Capacidad: Desconocida", biomass: "320 kg", ph: "7.4", temperature: "16.8°C" },
        { id: 603, shape: "circle", coords: { cx: 944, cy: 473, r: 25 }, title: "Estanque 603", tooltip: "Capacidad: Desconocida", biomass: "280 kg", ph: "7.6", temperature: "17.1°C" },
        { id: 604, shape: "circle", coords: { cx: 1006, cy: 438, r: 25 }, title: "Estanque 604", tooltip: "Capacidad: Desconocida", biomass: "350 kg", ph: "7.3", temperature: "16.5°C" },
        { id: 605, shape: "circle", coords: { cx: 939, cy: 549, r: 25 }, title: "Estanque 605", tooltip: "Capacidad: Desconocida", biomass: "310 kg", ph: "7.5", temperature: "17.2°C" },
        { id: 606, shape: "circle", coords: { cx: 1005, cy: 532, r: 25 }, title: "Estanque 606", tooltip: "Capacidad: Desconocida", biomass: "330 kg", ph: "7.4", temperature: "16.9°C" }
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
        // Styles for circle shape (white pools)
        const highlightColor = this.activePool === index ? 'rgba(255, 165, 0, 0.4)' : 'transparent'; // Orange color
        const borderColor = this.activePool === index ? '2px solid rgba(255, 165, 0, 0.8)' : 'none'; // Orange border

        return {
          left: `${pool.coords.cx - pool.coords.r}px`,
          top: `${pool.coords.cy - pool.coords.r}px`,
          width: `${pool.coords.r * 2}px`,
          height: `${pool.coords.r * 2}px`,
          borderRadius: '50%',
          backgroundColor: highlightColor,
          border: borderColor,
          pointerEvents: 'auto'
        };
      } else if (pool.shape === "oval") {
        // Styles for oval shape (black pools)
        const highlightColor = this.activePool === index ? 'rgba(0, 255, 0, 0.4)' : 'transparent'; // Green color for black pools
        const borderColor = this.activePool === index ? '2px solid rgba(0, 255, 0, 0.8)' : 'none'; // Green border for black pools
        const verticalScale = 1.3; // Adjust this value to make the oval taller or shorter

        return {
          left: `${pool.coords.cx - pool.coords.r}px`,
          top: `${pool.coords.cy - pool.coords.r * verticalScale}px`, // Adjust top based on scale
          width: `${pool.coords.r * 2}px`,
          height: `${pool.coords.r * 2 * verticalScale}px`, // Adjust height based on scale
          borderRadius: '50%', // Still use 50% for oval base shape
          backgroundColor: highlightColor,
          border: borderColor,
          pointerEvents: 'auto'
        };
      }
      return {}; // Return empty style for unknown shapes
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
  pointer-events: auto;
}

.pool-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
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
  border-color: #4CAF50 transparent transparent transparent;
}

.pool-highlight {
  position: absolute;
  transition: all 0.3s ease;
  cursor: pointer;
  pointer-events: auto;
}

.pools-layer {
  pointer-events: none;
}
</style>