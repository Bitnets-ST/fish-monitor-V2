import cameraType from "~/server/models/camera_type";

export default defineEventHandler(async (event) => {
  // Protección de ruta API (ejemplo básico)
  // En una app real, tendrías un middleware que adjunta el usuario al evento
  // o un sistema de permisos más robusto.
  // const user = event.context.user;
  // if (!user || user.role !== 'administrador') {
  //   throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  // }

  try {
    const { name, camera_type_description } = await readBody(event);

    if (!name) {
      return createError({
        statusCode: 400,
        message: "El nombre del tipo de cámara es obligatorio.",
      });
    }

    const existingCameraType = await cameraType.findOne({ name });
    if (existingCameraType) {
      return createError({
        statusCode: 409, // Conflict
        message: "Ya existe un tipo de cámara con este nombre.",
      });
    }

    const newCameraType = new cameraType({
      name,
      camera_type_description,
    });

    await newCameraType.save();

    // Devolver una respuesta explícita con 201 Created
    event.node.res.statusCode = 201;
    return {
      message: "Tipo de cámara creado exitosamente.",
      cameraType: newCameraType,
    };
  } catch (error) {
    console.error("Error en POST /api/camera_type:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return createError({
        statusCode: 400,
        message: messages.join(", "),
      });
    }
    // Para otros errores, un error genérico de servidor
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al crear el tipo de cámara.",
    });
  }
});
