<template>
  <q-page class="flex flex-center">
    <!-- Agregar la imagen GIF de fondo -->
    <img src="/source.gif" class="background-gif" alt="Peces nadando de fondo">

    <div class="w-full flex flex-col items-center">
      <button class="back-btn" @click="goBack">
        <span class="material-icons"> Volver a Zonas
      </span></button>
      <h2 class="text-lg font-bold mb-6">Estanques de la zona</h2>
      <div class="flex flex-wrap gap-6 mb-6 justify-center">
        <div v-for="tank in tanks" :key="tank._id" class="tank-card">
          <div class="tank-title">{{ tank.nombre }}</div>
          <div class="tank-info"><b>Capacidad:</b> {{ tank.capacidad || 'N/A' }}</div>
          <div class="tank-info"><b>Tipo:</b> {{ tank.tipo || 'N/A' }}</div>
          <div class="tank-info"><b>Material:</b> {{ tank.material || 'N/A' }}</div>
          <div class="tank-info"><b>Estado:</b> {{ tank.estado || 'N/A' }}</div>
          <button class="pdf-btn" @click="downloadPDF(tank)">PDF</button>
        </div>
      </div>
      <div v-if="tanks.length === 0" class="text-gray-500">No hay estanques registrados en esta zona.</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import jsPDF from 'jspdf';

const router = useRouter();
const route = useRoute();
const tanks = ref([]);

const fetchTanks = async () => {
  try {
    const zoneId = route.query.id;
    const response = await $fetch(`/api/get/tank`);
    if (response.success && response.tanks) {
      // Filtrar los estanques por zone_id (soporte para string u objeto)
      tanks.value = response.tanks.filter(t => {
        if (!t.zone_id) return false;
        if (typeof t.zone_id === 'string') return t.zone_id === zoneId;
        if (typeof t.zone_id === 'object') return t.zone_id._id === zoneId;
        return false;
      });
    }
  } catch (error) {
    // Manejo de error opcional
  }
};

const goBack = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  window.history.length > 1 ? router.back() : router.push('/dashboard/sucursal');
};

const downloadPDF = (tank) => {
  // Crear el documento PDF
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
  const lineHeight = 10;
  
  // Agregamos una versión simplificada de tabla
  // Columna de propiedades
  doc.setFont('helvetica', 'bold');
  doc.text('Nombre:', 30, startY);
  doc.text('Capacidad:', 30, startY + lineHeight);
  doc.text('Tipo:', 30, startY + lineHeight * 2);
  doc.text('Material:', 30, startY + lineHeight * 3);
  doc.text('Estado:', 30, startY + lineHeight * 4);
  
  // Columna de valores
  doc.setFont('helvetica', 'normal');
  doc.text(`${tank.nombre || 'N/A'}`, 80, startY);
  doc.text(`${tank.capacidad || 'N/A'}`, 80, startY + lineHeight);
  doc.text(`${tank.tipo || 'N/A'}`, 80, startY + lineHeight * 2);
  doc.text(`${tank.material || 'N/A'}`, 80, startY + lineHeight * 3);
  doc.text(`${tank.estado || 'N/A'}`, 80, startY + lineHeight * 4);
  
  // Rectángulo para enmarcar la tabla
  doc.setDrawColor(31, 97, 141);
  doc.rect(25, startY - 7, 160, lineHeight * 5 + 10);
  
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
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
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
  box-shadow: 0 4px 24px rgba(99,102,241,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
.tank-title {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #a5b4fc;
}
.tank-info {
  font-size: 1.05rem;
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
  /* Ajustar posición y tamaño para encajar visualmente en el círculo del diseño */
  top: 50%; /* Empezar en el centro vertical */
  left: 50%; /* Empezar en el centro horizontal */
  transform: translate(-50%, -50%); /* Centrar la imagen en ese punto */
  width: 50%; /* Ajusta este valor para cambiar el tamaño del GIF y que encaje en el círculo */
  height: 50%; /* Ajusta este valor */
  object-fit: contain; /* Usar contain para mostrar el GIF completo */
  z-index: 0; /* Coloca la imagen detrás del contenido principal */
  /* Eliminar object-position ya que contain con centrado debería ser suficiente */
  object-position: center;
}

/* Asegurar que el contenido principal esté por encima de la imagen y posicionado correctamente */
.w-full.flex.flex-col.items-center {
  /* Posicionamiento absoluto para alinear con el fondo circular */
  position: absolute;
  top: 50%; /* Alinear con el centro vertical del fondo */
  left: 50%; /* Alinear con el centro horizontal del fondo */
  transform: translate(-50%, -50%); /* Centrar el contenido en ese punto */
  width: 100%; /* Permitir que ocupe el ancho necesario dentro de su contexto */
  max-width: 800px; /* Limitar el ancho máximo del contenido si es necesario para el diseño */
  z-index: 1; /* Asegurar que esté por encima de la imagen */
  /* Añadir padding superior para bajar el contenido dentro de este contenedor centrado */
  padding-top: 8rem; /* Ajusta este valor para mover el contenido hacia abajo dentro de este contenedor */
  box-sizing: border-box; /* Incluir padding en el ancho */
}
</style>