import Sensor from '~/server/models/sensor';

export default defineEventHandler(async (event) => {
  try {
    const query = {};
    const zoneId = getQuery(event).zone_id;
    if (zoneId) {
      query.zone_id = zoneId;
    }
    const sensors = await Sensor.find(query)
      .select('name zone_id sensor_type createdAt updatedAt _id')
      .populate({ path: 'zone_id', select: 'name _id' })
      .sort({ name: 1 });
    return {
      success: true,
      sensors: sensors
    };
  } catch (error) {
    console.error('Error fetching sensors:', error);
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al obtener los sensores.'
    });
  }
});
