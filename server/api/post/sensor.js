import Sensor from '~/server/models/sensor';

export default defineEventHandler(async (event) => {
  // Authentication checks removed

  try {
    const { name, sensor_IP, zone_id, sensor_type } = await readBody(event);

    if (!name || !sensor_IP || !sensor_type || !zone_id) {
      return createError({
        statusCode: 400,
        message: 'Nombre, IP del sensor, tipo de sensor y zona asociada son obligatorios.'
      });
    }

    const existingSensor = await Sensor.findOne({ name });
    if (existingSensor) {
      return createError({
        statusCode: 409, // Conflict
        message: 'Ya existe un sensor con este nombre'
      });
    }

    const newSensor = new Sensor({
      name,
      zone_id,
      sensor_IP,
      sensor_type,
    });

    await newSensor.save();

    // Devolver una respuesta explícita con 201 Created
    event.node.res.statusCode = 201;
    return {
      message: 'Sensor creado exitosamente.',
      sensor: newSensor
    };

  } catch (error) {
    console.error('Error en POST /api/sensor:', error);
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
      message: 'Error interno del servidor al crear el sensor.'
    });
  }
});
