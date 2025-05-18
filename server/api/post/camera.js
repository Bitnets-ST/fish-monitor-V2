import Camera from '~/server/models/camera';

export default defineEventHandler(async (event) => {
  // Protección de ruta API (ejemplo básico)
  // En una app real, tendrías un middleware que adjunta el usuario al evento
  // o un sistema de permisos más robusto.
  // const user = event.context.user; 
  // if (!user || user.role !== 'administrador') { 
  //   throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  // }

  try {
    const { name, camera_IP, zone_id, camera_type } = await readBody(event);

    if (!name || !camera_IP || !camera_type || !zone_id) {
      return createError({
        statusCode: 400,
        message: 'Nombre, IP de cámara, tipo de cámara y zona asociada son obligatorios.'
      });
    }

    const existingCamera = await Camera.findOne({ camera_IP });
    if (existingCamera) {
      return createError({
        statusCode: 409, // Conflict
        message: 'Ya existe una camara con esta IP.'
      });
    }

    const newCamera = new Camera({
      name,
      camera_IP,
      zone_id,
      camera_type,
    });

    await newCamera.save();

    // Devolver una respuesta explícita con 201 Created
    event.node.res.statusCode = 201;
    return {
      message: 'Camara creada exitosamente.',
      camera: newCamera
    };

  } catch (error) {
    console.error('Error en POST /api/camera:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return createError({
          statusCode: 400,
          message: messages.join(', ')
      });
    }
    // Para otros errores, un error genérico de servidor
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al crear la camara.'
    });
  }
});
