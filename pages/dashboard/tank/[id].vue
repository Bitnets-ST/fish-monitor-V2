<template>
  <div class="estanques-page">
    <!-- Fondo animado mejorado -->
    <div class="animated-background">
      <div class="floating-bubbles">
        <div v-for="i in 8" :key="i" class="bubble" :style="getBubbleStyle(i)"></div>
      </div>
      <div class="wave-animation">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" fill="rgba(99, 102, 241, 0.05)"/>
        </svg>
      </div>
    </div>

    <!-- Header mejorado -->
    <div class="page-header">
      <button class="back-btn-new" @click="goBack">
        <div class="btn-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </div>
        <span>Volver a Zonas</span>
      </button>
      
      <div class="header-content">
        
        <h1 class="page-title">Estanques de la Zona</h1>
        <p class="page-subtitle">Gestión y monitoreo de estanques acuícolas</p>
      </div>
    </div>

    <!-- Grid de estanques mejorado -->
    <div class="tanks-container">
      <div class="tanks-grid">
        <div 
          v-for="(tank, index) in tanks" 
          :key="tank._id" 
          class="tank-card-new"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Header de la tarjeta -->
          <div class="card-header">
            <div class="tank-status" :class="getStatusClass(tank.estado)">
              <div class="status-indicator"></div>
              <span>{{ tank.estado || 'Sin estado' }}</span>
            </div>
            <div class="card-actions">
              <button class="action-btn info-btn" @click="showTankDetails(tank)" title="Ver detalles">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </button>
              <button class="action-btn pdf-btn-new" @click="downloadPDF(tank)" title="Generar PDF">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Nombre del estanque -->
          <div class="tank-name">
            <div class="tank-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12z"/>
              </svg>
            </div>
            <h3>{{ tank.nombre || 'Estanque sin nombre' }}</h3>
          </div>

          <!-- Métricas principales -->
          <div class="metrics-grid">
            <div class="metric-item">
              <div class="metric-icon capacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div class="metric-content">
                <span class="metric-label">Capacidad</span>
                <span class="metric-value">{{ formatCapacity(tank.capacidad) }}</span>
              </div>
            </div>

            <div class="metric-item">
              <div class="metric-icon biomass">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6.5 12c.94-3.46 4.94-6 8.5-6s7.56 2.54 8.5 6c-.94 3.46-4.94 6-8.5 6s-7.56-2.54-8.5-6z"/>
                  <circle cx="12" cy="14" r="3"/>
                </svg>
              </div>
              <div class="metric-content">
                <span class="metric-label">Biomasa</span>
                <span class="metric-value">{{ formatBiomass(tank.población?.biomasa_kg) }}</span>
              </div>
            </div>

            <div class="metric-item">
              <div class="metric-icon type">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </div>
              <div class="metric-content">
                <span class="metric-label">Tipo</span>
                <span class="metric-value">{{ tank.tipo || 'N/A' }}</span>
              </div>
            </div>

            <div class="metric-item">
              <div class="metric-icon material">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div class="metric-content">
                <span class="metric-label">Material</span>
                <span class="metric-value">{{ tank.material || 'N/A' }}</span>
              </div>
            </div>
          </div>

          <!-- Barra de progreso para biomasa -->
          <div class="progress-section" v-if="tank.capacidad && tank.población?.biomasa_kg">
            <div class="progress-label">
              <span>Ocupación</span>
              <span class="progress-percentage">{{ getOccupancyPercentage(tank) }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: getOccupancyPercentage(tank) + '%' }"
                :class="getProgressClass(getOccupancyPercentage(tank))"
              ></div>
            </div>
          </div>

          <!-- Footer de la tarjeta -->
          <div class="card-footer">
            <div class="last-update">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span>Última actualización: {{ formatDate(tank.última_inspección) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado vacío mejorado -->
      <div v-if="tanks.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8M12 8v8"/>
          </svg>
        </div>
        <h3>No hay estanques registrados</h3>
        <p>Esta zona aún no tiene estanques configurados. Contacta al administrador para agregar estanques.</p>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Cargando estanques...</p>
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
const isLoading = ref(true);

// Funciones de utilidad para formateo
const formatCapacity = (capacity) => {
  if (!capacity) return 'N/A';
  return capacity >= 1000 ? `${(capacity / 1000).toFixed(1)}K L` : `${capacity} L`;
};

const formatBiomass = (biomass) => {
  if (!biomass) return 'N/A';
  return `${biomass} kg`;
};

const formatDate = (date) => {
  if (!date) return 'No disponible';
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getStatusClass = (status) => {
  const statusMap = {
    'activo': 'status-active',
    'inactivo': 'status-inactive',
    'mantenimiento': 'status-maintenance',
    'operativo': 'status-active'
  };
  return statusMap[status?.toLowerCase()] || 'status-unknown';
};

const getOccupancyPercentage = (tank) => {
  if (!tank.capacidad || !tank.población?.biomasa_kg) return 0;
  // Asumiendo 1kg por cada 10L como densidad ideal
  const idealDensity = tank.capacidad / 10;
  return Math.min(Math.round((tank.población.biomasa_kg / idealDensity) * 100), 100);
};

const getProgressClass = (percentage) => {
  if (percentage <= 50) return 'progress-low';
  if (percentage <= 80) return 'progress-medium';
  return 'progress-high';
};

const getBubbleStyle = (index) => {
  const size = Math.random() * 60 + 20;
  const left = Math.random() * 100;
  const animationDelay = Math.random() * 5;
  const animationDuration = Math.random() * 3 + 2;
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`
  };
};

const fetchTanks = async () => {
  try {
    isLoading.value = true;
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
    console.error('Error fetching tanks:', error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
};

const goBack = () => {
  window.history.length > 1
    ? router.back()
    : router.push("/dashboard/sucursal");
};

const showTankDetails = (tank) => {
  // Implementar modal o navegación a detalles
  console.log('Showing details for tank:', tank);
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
/* Variables CSS para consistencia */
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #f59e42;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --dark-bg: #0f172a;
  --card-bg: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --border-color: #334155;
}

.estanques-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  overflow-x: hidden;
  padding: 2rem 1rem;
}

/* Fondo animado mejorado */
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.floating-bubbles {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(100vh) scale(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) scale(1); opacity: 0; }
}

.wave-animation {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120px;
  animation: wave 8s linear infinite;
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100px); }
}

/* Header mejorado */
.page-header {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 3rem;
}

.back-btn-new {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.3);
}

.back-btn-new:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px 0 rgba(99, 102, 241, 0.4);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
}



.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Grid de estanques */
.tanks-container {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
}

.tanks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Tarjetas de estanque mejoradas */
.tank-card-new {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 1.5rem;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.6s ease-out both;
  position: relative;
  overflow: hidden;
}

.tank-card-new::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 1.5rem 1.5rem 0 0;
}

.tank-card-new:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: var(--primary-color);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header de tarjeta */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.tank-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-active {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.status-active .status-indicator {
  background: var(--success-color);
}

.status-inactive {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.status-inactive .status-indicator {
  background: var(--danger-color);
}

.status-maintenance {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.status-maintenance .status-indicator {
  background: var(--warning-color);
}

.status-unknown {
  background: rgba(148, 163, 184, 0.1);
  color: var(--text-secondary);
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.status-unknown .status-indicator {
  background: var(--text-secondary);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Acciones de tarjeta */
.card-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.info-btn {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.info-btn:hover {
  background: var(--primary-color);
  color: white;
  transform: scale(1.1);
}

.pdf-btn-new {
  background: rgba(245, 158, 66, 0.1);
  color: var(--accent-color);
  border: 1px solid rgba(245, 158, 66, 0.3);
}

.pdf-btn-new:hover {
  background: var(--accent-color);
  color: white;
  transform: scale(1.1);
}

/* Nombre del estanque */
.tank-name {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tank-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.tank-name h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

/* Grid de métricas */
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.metric-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--primary-color);
}

.metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.metric-icon.capacity {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.metric-icon.biomass {
  background: linear-gradient(135deg, #10b981, #059669);
}

.metric-icon.type {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.metric-icon.material {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.metric-content {
  flex: 1;
  min-width: 0;
}

.metric-label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.metric-value {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Barra de progreso */
.progress-section {
  margin-bottom: 1.5rem;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.progress-percentage {
  font-weight: 600;
  color: var(--text-primary);
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 1rem;
  transition: width 1s ease-out;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 2s infinite;
}

.progress-low {
  background: linear-gradient(90deg, var(--success-color), #34d399);
}

.progress-medium {
  background: linear-gradient(90deg, var(--warning-color), #fbbf24);
}

.progress-high {
  background: linear-gradient(90deg, var(--danger-color), #f87171);
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Footer de tarjeta */
.card-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}

.last-update {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* Estado vacío */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: var(--primary-color);
  border: 2px dashed rgba(99, 102, 241, 0.3);
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  text-align: center;
  color: var(--text-primary);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(99, 102, 241, 0.2);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner p {
  margin: 0;
  font-size: 1rem;
  color: var(--text-secondary);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .tanks-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .estanques-page {
    padding: 1rem 0.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .tanks-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .tank-card-new {
    padding: 1.5rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .card-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .card-actions {
    align-self: flex-end;
  }
  
  .tank-name {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    margin-bottom: 2rem;
  }
 
  
  .page-title {
    font-size: 1.75rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .back-btn-new {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
  
  .tank-card-new {
    padding: 1.25rem;
  }
  
  .tank-name h3 {
    font-size: 1.125rem;
  }
  
  .metric-item {
    padding: 0.75rem;
  }
  
  .metric-icon {
    width: 36px;
    height: 36px;
  }
}

/* Animaciones adicionales */
.tank-card-new:nth-child(odd) {
  animation-delay: 0.1s;
}

.tank-card-new:nth-child(even) {
  animation-delay: 0.2s;
}

/* Efectos de hover mejorados */
.metric-item:hover .metric-icon {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.tank-card-new:hover .tank-icon {
  transform: rotate(5deg) scale(1.05);
  transition: transform 0.3s ease;
}

/* Tooltips para acciones */
.action-btn[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--dark-bg);
  color: var(--text-primary);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 1000;
  border: 1px solid var(--border-color);
}

.action-btn {
  position: relative;
}

/* Efectos de glass morphism */
.tank-card-new {
  backdrop-filter: blur(10px);
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.metric-item {
  backdrop-filter: blur(5px);
}

/* Animaciones de entrada escalonada */
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.tank-card-new {
  animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
}

/* Estados de hover para toda la tarjeta */
.tank-card-new:hover .progress-fill {
  animation: shimmer 1.5s infinite;
}

.tank-card-new:hover .status-indicator {
  animation-duration: 1s;
}

/* Mejoras en la accesibilidad */
.action-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.back-btn-new:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .tank-card-new {
    background: rgba(30, 41, 59, 0.9);
  }
}

/* Print styles */
@media print {
  .back-btn-new,
  .card-actions,
  .animated-background {
    display: none;
  }
  
  .estanques-page {
    background: white;
    color: black;
  }
  
  .tank-card-new {
    background: white;
    border: 1px solid #ccc;
    color: black;
    break-inside: avoid;
    margin-bottom: 1rem;
  }
}
</style>