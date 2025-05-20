import Zone from '~/server/models/zone';

export default defineEventHandler(async (event) => {
  try {
    const query = {};
    const branchId = getQuery(event).branch_id;
    if (branchId) {
      query.branch_id = branchId;
    }
    const zones = await Zone.find(query).select('name _id branch_id').sort({ name: 1 });
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
