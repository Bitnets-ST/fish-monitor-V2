import CameraType from '~/server/models/camera_type'; // Ensure model name matches

export default defineEventHandler(async () => {
  try {
    const cameraTypes = await CameraType.find({}).select('name _id').sort({ name: 1 });
    return {
      success: true,
      cameraTypes: cameraTypes // Pluralized for consistency
    };
  } catch (error) {
    console.error('Error fetching camera types:', error);
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al obtener los tipos de cámara.'
    });
  }
});
