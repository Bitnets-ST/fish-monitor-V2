// User model import removed since authentication system was removed

export default defineEventHandler(async () => {
  try {
    // Placeholder response since authentication system was removed
    return {
      success: true,
      users: []
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al obtener los usuarios.'
    });
  }
});
