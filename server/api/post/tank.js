import Tank from "../../models/tank.js";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    // Validar campos requeridos
    if (!body.nombre || !body.capacidad || !body.tipo || !body.material) {
      return createError({
        statusCode: 400,
        statusMessage: "Faltan campos requeridos para crear el estanque",
      });
    }

    if (!body.ubicación || !body.ubicación.latitud || !body.ubicación.longitud || !body.ubicación.dirección) {
      return createError({
        statusCode: 400,
        statusMessage: "La información de ubicación es requerida",
      });
    }

    if (!body.zone_id) {
      return createError({
        statusCode: 400,
        statusMessage: "Se requiere una zona asociada al estanque",
      });
    }

    // Asegurarse de que la fecha de creación esté presente
    if (!body.fecha_creación) {
      body.fecha_creación = new Date();
    }

    // Crear el nuevo estanque
    const newTank = new Tank(body);
    await newTank.save();

    // Retornar el estanque creado
    return newTank;
  } catch (error) {
    console.error("Error al crear estanque:", error);
    return createError({
      statusCode: 500,
      statusMessage: `Error al crear estanque: ${error.message}`,
    });
  }
});
