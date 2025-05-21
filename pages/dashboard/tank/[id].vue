<template>
  <div class="estanques-page flex flex-center">
    <!-- Agregar la imagen GIF de fondo -->
    <img
      src="/source.gif"
      class="background-gif"
      alt="Peces nadando de fondo"
    />
    []
    <div class="w-full flex flex-col items-center">
      <button class="back-btn" @click="goBack">
        <span class="material-icons"> Volver a Zonas </span>
      </button>
      <h2 class="text-lg font-bold mb-6">Estanques de la zona</h2>
      <div class="flex flex-wrap gap-6 mb-6 justify-center">
        <div v-for="tank in tanks" :key="tank._id" class="tank-card">
          <div class="tank-title">{{ tank.nombre }}</div>
          <div class="tank-info">
            <b>Capacidad:</b> {{ tank.capacidad || "N/A" }}
          </div>
          <div class="tank-info"><b>Tipo:</b> {{ tank.tipo || "N/A" }}</div>
          <div class="tank-info">
            <b>Material:</b> {{ tank.material || "N/A" }}
          </div>
          <div class="tank-info">
            <b>Biomasa:</b> {{ tank.población?.biomasa_kg || "N/A" }} kg
          </div>
          <div class="tank-info"><b>Estado:</b> {{ tank.estado || "N/A" }}</div>
          <button class="pdf-btn" @click="downloadPDF(tank)">PDF</button>
        </div>
      </div>
      <div v-if="tanks.length === 0" class="text-gray-500">
        No hay estanques registrados en esta zona.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import jsPDF from "jspdf";

const router = useRouter();
const route = useRoute();
const tanks = ref([]);

const fetchTanks = async () => {
  try {
    const zoneId = route.params.id;
    const response = await $fetch(`/api/get/tank`);
    if (response.success && response.tanks) {
      tanks.value = response.tanks.filter((t) => {
        if (!t.zone_id) return false;
        if (typeof t.zone_id === "string") return t.zone_id === zoneId;
        if (typeof t.zone_id === "object") return t.zone_id._id === zoneId;
        return false;
      });
    }
  } catch (error) {
    // Manejo de error opcional
  }
};

const goBack = () => {
  window.history.length > 1
    ? router.back()
    : router.push("/dashboard/sucursal");
};

const downloadPDF = (tank) => {
  const doc = new jsPDF();
  
  // Añadir el logo al PDF (posición x, y, ancho, alto) usando la imagen real
  try {
    // La imagen en la carpeta public es accesible directamente por su ruta relativa a la raíz
    doc.addImage('/bitnets.jpg', 'JPEG', 10, 10, 30, 30);
  } catch (error) {
    // Si hay error al añadir la imagen, usamos un texto como alternativa
    doc.setFontSize(16);
    doc.setTextColor(52, 152, 219);
    doc.text("BITNETS", 20, 20);
  }
  
  // Título y encabezado profesionales
  doc.setFontSize(18);
  doc.setTextColor(31, 97, 141);
  doc.text('REPORTE DEL ESTANQUE', 105, 25, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`${tank.nombre || 'SIN NOMBRE'}`, 105, 35, { align: 'center' });
  
  // Fecha
  const today = new Date();
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Fecha: ${today.toLocaleDateString()}`, 105, 42, { align: 'center' });
  
  // Línea divisoria
  doc.setDrawColor(31, 97, 141);
  doc.setLineWidth(0.5);
  doc.line(20, 45, 190, 45);
  
  // Información del estanque - versión mejorada con formato de tabla simple
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  const startY = 55;
  const lineHeight = 8; // Reduced line height for more data
  let currentY = startY;
  
  const addInfo = (label, value) => {
    if (value !== null && value !== undefined && value !== '') {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 30, currentY);
      doc.setFont('helvetica', 'normal');
      // Handle long text wrapping if necessary, though for this data it might not be crucial.
      // A more robust solution would use autoTable or manual text splitting.
      doc.text(`${value}`, 80, currentY, { maxWidth: 110 }); // Added maxWidth
      currentY += lineHeight;
    }
  };
  
  addInfo('Estado', tank.estado || 'N/A');
  addInfo('Capacidad', `${tank.capacidad || 'N/A'} litros`);
  addInfo('Tipo', tank.tipo || 'N/A');
  addInfo('Material', tank.material || 'N/A');
  addInfo('Ubicación', tank.ubicación?.dirección || 'N/A');
  addInfo('Fecha Creación', tank.fecha_creación ? new Date(tank.fecha_creación).toLocaleDateString() : 'N/A');
  addInfo('Última Inspección', tank.última_inspección ? new Date(tank.última_inspección).toLocaleDateString() : 'N/A');
  addInfo('Especies', tank.especies?.join(', ') || 'N/A');
  addInfo('Población', tank.población ? `${tank.población.total_peces || 'N/A'} peces / ${tank.población.biomasa_kg || 'N/A'} kg` : 'N/A');
  addInfo('Condiciones - Temp', tank.condiciones?.temperatura_c ? `${tank.condiciones.temperatura_c} °C` : 'N/A');
  addInfo('Condiciones - pH', tank.condiciones?.pH || 'N/A');
  addInfo('Condiciones - Nivel Agua', tank.condiciones?.nivel_agua_cm ? `${tank.condiciones.nivel_agua_cm} cm` : 'N/A');
  addInfo('Sensores', tank.sensores?.join(', ') || 'N/A');
  addInfo('Alimentación', tank.alimentación ? `${tank.alimentación.tipo || 'N/A'} (${tank.alimentación.frecuencia_diaria || 'N/A'} veces/día)` : 'N/A');
  addInfo('Sucursal', tank.branch_id?.name || tank.branch_id || 'N/A');
  addInfo('Zona', tank.zone_id.name || tank.zone_id || 'N/A');

  // Rectángulo para enmarcar la tabla
  doc.setDrawColor(31, 97, 141);
  // Calculate rectangle height based on currentY
  doc.rect(25, startY - 7, 160, currentY - startY + 10);

  // Pie de página con el logo de Bitnets
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('© Bitnets - Todos los derechos reservados', 105, 270, { align: 'center' });
  
  // Guardar el PDF con un nombre profesional
  doc.save(`Reporte_Estanque_${tank.nombre || 'sin_nombre'}.pdf`);
};

onMounted(() => {
  fetchTanks();
});
</script>

<style scoped>
.estanques-page {
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background: #f4f6fb;
}
.back-btn {
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 1.5rem;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
  transition: background 0.18s, transform 0.18s;
}
.back-btn:hover {
  background: #4338ca;
  transform: translateY(-2px) scale(1.03);
}
.material-icons {
  font-size: 1.4rem;
}
.tank-card {
  background: #232946;
  color: #fff;
  border-radius: 1.5rem;
  padding: 1.5rem 2.5rem;
  min-width: 260px;
  min-height: 160px;
  box-shadow: 0 4px 24px rgba(99, 102, 241, 0.1),
    0 1.5px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  max-width: none;
  overflow-y: visible;
  max-height: none;
}
.tank-title {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #a5b4fc;
  width: auto;
  text-align: left;
  padding-bottom: 0;
  border-bottom: none;
}
.tank-info {
  font-size: 1.05rem;
  line-height: normal;
}
.pdf-btn {
  background: #f59e42;
  color: #fff;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.18s, transform 0.18s;
}
.pdf-btn:hover {
  background: #d97706;
  transform: translateY(-2px) scale(1.03);
}

/* Estilos para la imagen GIF de fondo */
.background-gif {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  object-fit: contain;
  z-index: 0;
  object-position: center;
}

.w-full.flex.flex-col.items-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  z-index: 1;
  
  box-sizing: border-box;
}
</style>
