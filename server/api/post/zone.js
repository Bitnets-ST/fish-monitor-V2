import Zone from "~/server/models/zone";

export default defineEventHandler(async (event) => {
  // Authentication checks removed

  try {
    const { name, zone_description, zone_manager, zone_direction, branch_id } = await readBody(event);

    if (!name || !branch_id || !zone_manager) { 
      return createError({
        statusCode: 400,
        message: "El nombre de la zona, la sucursal asociada y el encargado son obligatorios."
      });
    }

    const existingZone = await Zone.findOne({ name });
    if (existingZone) {
      return createError({
        statusCode: 409, // Conflict
        message: "Ya existe una zona con ese nombre",
      });
    }

    const newZone = new Zone({
      name,
      zone_description,
      zone_manager,
      zone_direction,
      branch_id,
    });

    await newZone.save();

    // Devolver una respuesta explícita con 201 Created
    event.node.res.statusCode = 201;
    return {
      message: "Zona creada exitosamente.",
      zone: newZone,
    };
  } catch (error) {
    console.error("Error en POST /api/zone:", error);
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
      message: "Error interno del servidor al crear la zona.",
    });
  }
});
