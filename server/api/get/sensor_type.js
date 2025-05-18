import SensorType from '~/server/models/sensor_type'; // Ensure model name matches

export default defineEventHandler(async (event) => {
  try {
    const sensorTypes = await SensorType.find({}).select('name _id').sort({ name: 1 });
    return {
      success: true,
      sensorTypes: sensorTypes // Pluralized for consistency
    };
  } catch (error) {
    console.error('Error fetching sensor types:', error);
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al obtener los tipos de sensor.'
    });
  }
});
