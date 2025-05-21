import Camera from '~/server/models/camera';

export default defineEventHandler(async () => {
  try {
    const cameras = await Camera.find({})
      .select('name camera_IP camera_type zone_id createdAt updatedAt _id')
      .populate({ path: 'zone_id', select: 'name _id' })
      .populate({ path: 'camera_type', select: 'name' });
    return {
      success: true,
      cameras: cameras
    };
  } catch (error) {
    console.error('Error fetching cameras:', error);
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al obtener las cámaras.'
    });
  }
});
