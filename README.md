# Fish Monitor - Sistema de Monitoreo de Peces

Sistema moderno de monitoreo y gestión de pisciculturas con interfaz web interactiva.

## 🚀 Características

- **Dashboard Interactivo** con estadísticas en tiempo real
- **Sistema de Cámaras** para monitoreo visual
- **Gestión de Sucursales y Zonas**
- **Interfaz Moderna** con animaciones y efectos visuales
- **Diseño Responsivo** para todos los dispositivos

## 🛠️ Tecnologías

- **Nuxt 3** - Framework Vue.js
- **Tailwind CSS** - Framework de estilos
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **Pinia** - Gestión de estado

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🌐 Despliegue en Netlify

### Opción 1: Despliegue Automático desde GitHub

1. **Conectar repositorio** en Netlify
2. **Configuración automática**:
   - Build command: `npm run build`
   - Publish directory: `.output/public`
3. **Variables de entorno** (opcional):
   - `MONGODB_URI`: URL de conexión a MongoDB
   - `API_BASE`: URL base de la API

### Opción 2: Despliegue Manual

```bash
# Construir la aplicación
npm run build

# Subir la carpeta .output/public a Netlify
```

## 🔧 Configuración

### Variables de Entorno

```env
MONGODB_URI=mongodb://localhost:27017/fish-monitor
API_BASE=http://localhost:3000
```

## 📱 Uso

1. **Dashboard Principal**: Vista general del sistema
2. **Cámaras**: Monitoreo de cámaras de seguridad
3. **Configuración**: Gestión de sucursales y zonas
4. **Panel de Control**: Administración avanzada

## 🎨 Diseño

- **Tema Oscuro** moderno y profesional
- **Animaciones suaves** y efectos interactivos
- **Gradientes** y efectos de cristal
- **Iconografía** Material Symbols

## 📄 Licencia

Proyecto privado para sistema de monitoreo de pisciculturas.
