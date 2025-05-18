import Zone from '~/server/models/zone';

export default defineEventHandler(async (event) => {
  try {
    const zones = await Zone.find({}).select('name _id').sort({ name: 1 });
    return {
      success: true,
      zones: zones
    };
  } catch (error) {
    console.error('Error fetching zones:', error);
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al obtener las zonas.'
    });
  }
});
