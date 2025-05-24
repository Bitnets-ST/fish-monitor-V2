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
import Chart from 'chart.js/auto';


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

const downloadPDF = async (tank) => {
  const doc = new jsPDF();
  
  // Configuración de colores
  const primaryColor = [31, 97, 141];
  const secondaryColor = [99, 102, 241];
  const accentColor = [245, 158, 66];
  const lightGray = [248, 249, 250];
  const darkGray = [55, 65, 81];
  
  // HEADER CON DISEÑO MODERNO
  // Fondo del header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Logo (intenta cargar la imagen, si no usa texto)
  try {
    doc.addImage('/bitnets.jpg', 'JPEG', 15, 10, 25, 25);
  } catch (error) {
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text("BITNETS", 20, 25);
  }
  
  // Título principal
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('REPORTE DE ESTANQUE', 105, 22, { align: 'center' });
  
  // Nombre del estanque
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(`${tank.nombre || 'SIN NOMBRE'}`, 105, 32, { align: 'center' });
  
  // Fecha en el header
  const today = new Date();
  doc.setFontSize(10);
  doc.text(`Generado: ${today.toLocaleDateString()} ${today.toLocaleTimeString()}`, 105, 42, { align: 'center' });
  
  // SECCIÓN DE INFORMACIÓN GENERAL
  let currentY = 70;
  
  // Función para crear secciones con estilo
  const createSection = (title, startY) => {
    // Línea decorativa
    doc.setDrawColor(...secondaryColor);
    doc.setLineWidth(3);
    doc.line(20, startY, 35, startY);
    
    // Título de sección
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 40, startY + 2);
    
    return startY + 12;
  };
  
  // Función mejorada para agregar información
  const addStyledInfo = (label, value, yPos) => {
    if (value !== null && value !== undefined && value !== '' && value !== 'N/A') {
      // Fondo alternado para mejor legibilidad
      if (Math.floor((yPos - 82) / 8) % 2 === 0) {
        doc.setFillColor(...lightGray);
        doc.rect(25, yPos - 3, 160, 7, 'F');
      }
      
      // Label
      doc.setFontSize(11);
      doc.setTextColor(...darkGray);
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 30, yPos);
      
      // Value
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`${value}`, 85, yPos, { maxWidth: 100 });
      
      return yPos + 8;
    }
    return yPos;
  };
  
  // INFORMACIÓN BÁSICA
  currentY = createSection('INFORMACIÓN BÁSICA', currentY);
  currentY = addStyledInfo('Estado', tank.estado || 'N/A', currentY);
  currentY = addStyledInfo('Ubicación', tank.ubicación?.dirección || 'N/A', currentY);
  currentY = addStyledInfo('Capacidad', tank.capacidad ? `${tank.capacidad} litros` : 'N/A', currentY);
  currentY = addStyledInfo('Tipo', tank.tipo || 'N/A', currentY);
  currentY = addStyledInfo('Material', tank.material || 'N/A', currentY);
  
  // FECHAS IMPORTANTES
  currentY += 8;
  currentY = createSection('FECHAS IMPORTANTES', currentY);
  currentY = addStyledInfo('Fecha de Creación', 
    tank.fecha_creación ? new Date(tank.fecha_creación).toLocaleDateString() : 'N/A', currentY);
  currentY = addStyledInfo('Última Inspección', 
    tank.última_inspección ? new Date(tank.última_inspección).toLocaleDateString() : 'N/A', currentY);
  
  // POBLACIÓN - SECCIÓN DESTACADA
  if (tank.población) {
    currentY += 8;
    currentY = createSection('POBLACIÓN', currentY);
    
    // Crear un recuadro destacado para la población
    doc.setFillColor(240, 248, 255);
    doc.setDrawColor(...secondaryColor);
    doc.setLineWidth(1);
    doc.rect(25, currentY - 5, 160, 20, 'FD');
    
    currentY = addStyledInfo('Cantidad de Peces', tank.población.total_peces || 'N/A', currentY);
    currentY = addStyledInfo('Biomasa Total', 
      tank.población.biomasa_kg ? `${tank.población.biomasa_kg} kg` : 'N/A', currentY);
  }
  
  // ESPECIES
  if (tank.especies && tank.especies.length > 0) {
    currentY += 8;
    currentY = createSection('ESPECIES', currentY);
    currentY = addStyledInfo('Especies Presentes', tank.especies.join(', '), currentY);
  }
  
  // CONDICIONES AMBIENTALES
  if (tank.condiciones) {
    currentY += 8;
    currentY = createSection('CONDICIONES AMBIENTALES', currentY);
    currentY = addStyledInfo('Temperatura', 
      tank.condiciones.temperatura_c ? `${tank.condiciones.temperatura_c} °C` : 'N/A', currentY);
    currentY = addStyledInfo('pH', tank.condiciones.pH || 'N/A', currentY);
    currentY = addStyledInfo('Nivel de Agua', 
      tank.condiciones.nivel_agua_cm ? `${tank.condiciones.nivel_agua_cm} cm` : 'N/A', currentY);
  }
  
  // SISTEMAS Y TECNOLOGÍA
  currentY += 8;
  currentY = createSection('SISTEMAS Y TECNOLOGÍA', currentY);
  currentY = addStyledInfo('Sensores Instalados', 
    tank.sensores ? tank.sensores.join(', ') : 'N/A', currentY);
  currentY = addStyledInfo('Sistema de Alimentación', 
    tank.alimentación ? `${tank.alimentación.tipo || 'N/A'} (${tank.alimentación.frecuencia_diaria || 'N/A'} veces/día)` : 'N/A', 
    currentY);
  
  // UBICACIÓN ORGANIZACIONAL
  currentY += 8;
  currentY = createSection('UBICACIÓN ORGANIZACIONAL', currentY);
  currentY = addStyledInfo('Sucursal', tank.branch_id?.name || tank.branch_id || 'N/A', currentY);
  currentY = addStyledInfo('Zona', tank.zone_id?.name || tank.zone_id || 'N/A', currentY);
  
  // FOOTER SIMPLE Y LIMPIO
  const footerY = 280;
  
  // Texto del footer limpio y simple
  doc.setFontSize(10);
  doc.setTextColor(...darkGray);
  doc.setFont('helvetica', 'bold');
  doc.text('BITNETS', 105, footerY, { align: 'center' });
  
  // ===============================================
  // NUEVA PÁGINA CON GRÁFICOS 🚀
  // ===============================================
  doc.addPage();
  
  // Header de la segunda página
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('ANÁLISIS GRÁFICO', 105, 25, { align: 'center' });
  
  // Crear canvas temporal para el gráfico
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  
  // Datos para el gráfico - Información del estanque
  const chartData = {
    labels: ['Capacidad (L)', 'Biomasa (kg)', 'Temperatura (°C)', 'pH', 'Nivel Agua (cm)'],
    datasets: [{
      label: 'Métricas del Estanque',
      data: [
        tank.capacidad || 0,
        tank.población?.biomasa_kg || 0,
        tank.condiciones?.temperatura_c || 0,
        tank.condiciones?.pH || 0,
        tank.condiciones?.nivel_agua_cm || 0
      ],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(245, 158, 66, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(168, 85, 247, 0.8)'
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(245, 158, 66, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(168, 85, 247, 1)'
      ],
      borderWidth: 2
    }]
  };
  
  // Configuración del gráfico
  const config = {
    type: 'bar',
    data: chartData,
    options: {
      responsive: false,
      animation: false,
      plugins: {
        title: {
          display: true,
          text: `Métricas del Estanque: ${tank.nombre || 'Sin Nombre'}`,
          font: {
            size: 18,
            weight: 'bold'
          },
          color: '#1f618d'
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              size: 12
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0,0,0,0.1)'
          },
          ticks: {
            font: {
              size: 11
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: 10
            },
            maxRotation: 45
          }
        }
      }
    }
  };
  
  // Crear el gráfico
  const chart = new Chart(ctx, config);
  
  // Esperar a que el gráfico se renderice y luego agregarlo al PDF
  await new Promise((resolve) => {
    setTimeout(() => {
      try {
        // Convertir canvas a imagen y agregarla al PDF
        const chartImage = canvas.toDataURL('image/png', 1.0);
        doc.addImage(chartImage, 'PNG', 20, 60, 170, 113);
        
        // Agregar información adicional debajo del gráfico
        let infoY = 185;
        
        // Sección de resumen
        doc.setFontSize(14);
        doc.setTextColor(...primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('RESUMEN EJECUTIVO', 20, infoY);
        
        infoY += 10;
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        
        // Análisis automático basado en los datos
        const analysis = [];
        
        if (tank.capacidad && tank.población?.biomasa_kg) {
          const density = (tank.población.biomasa_kg / tank.capacidad * 1000).toFixed(2);
          analysis.push(`• Densidad de población: ${density} kg/m³`);
        }
        
        if (tank.condiciones?.temperatura_c) {
          const temp = tank.condiciones.temperatura_c;
          if (temp >= 18 && temp <= 25) {
            analysis.push(`• Temperatura óptima: ${temp}°C (Rango ideal)`);
          } else {
            analysis.push(`• Temperatura: ${temp}°C (Fuera del rango óptimo 18-25°C)`);
          }
        }
        
        if (tank.condiciones?.pH) {
          const ph = tank.condiciones.pH;
          if (ph >= 6.5 && ph <= 8.5) {
            analysis.push(`• pH balanceado: ${ph} (Rango saludable)`);
          } else {
            analysis.push(`• pH: ${ph} (Requiere atención - Óptimo: 6.5-8.5)`);
          }
        }
        
        if (tank.estado) {
          analysis.push(`• Estado general: ${tank.estado}`);
        }
        
        // Agregar el análisis al PDF
        analysis.forEach(item => {
          if (infoY > 270) return; // Evitar overflow
          doc.text(item, 25, infoY, { maxWidth: 160 });
          infoY += 7;
        });
        
        // Recomendaciones
        if (infoY < 250) {
          infoY += 5;
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(...accentColor);
          doc.text('RECOMENDACIONES:', 20, infoY);
          
          infoY += 8;
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text('• Monitorear parámetros de agua semanalmente', 25, infoY);
          infoY += 6;
          doc.text('• Mantener registro de alimentación diaria', 25, infoY);
          infoY += 6;
          doc.text('• Realizar inspecciones visuales periódicas', 25, infoY);
        }
        
        // Limpiar el chart
        chart.destroy();
        canvas.remove();
        
        resolve();
      } catch (error) {
        console.error('Error generando gráfico:', error);
        // Si falla el gráfico, agregar texto alternativo
        doc.setFontSize(12);
        doc.setTextColor(...darkGray);
        doc.text('Gráfico no disponible - Datos insuficientes', 105, 120, { align: 'center' });
        resolve();
      }
    }, 500); // Dar tiempo al gráfico para renderizarse
  });
  
  // Guardar el PDF
  const fileName = `Reporte_${tank.nombre ? tank.nombre.replace(/[^a-zA-Z0-9]/g, '_') : 'Estanque'}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
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
