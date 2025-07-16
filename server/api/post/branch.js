import Branch from '~/server/models/branch';

export default defineEventHandler(async (event) => {
  // Authentication checks removed

  try {
    const { name, location, description } = await readBody(event);

    if (!name) {
      return createError({
        statusCode: 400,
        message: 'El nombre de la sucursal es obligatorio.'
      });
    }

    const existingBranch = await Branch.findOne({ name });
    if (existingBranch) {
      return createError({
        statusCode: 409, // Conflict
        message: 'Ya existe una sucursal con este nombre.'
      });
    }

    const newBranch = new Branch({
      name,
      location: location || '',
      description: description || ''
    });

    await newBranch.save();

    // Devolver una respuesta explícita con 201 Created
    event.node.res.statusCode = 201;
    return {
      message: 'Sucursal creada exitosamente.',
      branch: newBranch
    };

  } catch (error) {
    console.error('Error en POST /api/branch:', error);
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
      message: 'Error interno del servidor al crear la sucursal.'
    });
  }
});
