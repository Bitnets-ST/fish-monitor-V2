import User from '~/server/models/user';

export default defineEventHandler(async (event) => {
  try {
    // Obtener el token de refresco de la cookie
    const refreshToken = getCookie(event, 'refreshToken');
    
    if (refreshToken) {
      // Buscar usuario con este refreshToken y limpiarlo
      await User.findOneAndUpdate(
        { refreshToken },
        { refreshToken: null }
      );
    }

    // Eliminar cookies independientemente de si encontramos el usuario o no
    setCookie(event, 'accessToken', '', { maxAge: 0, path: '/' });
    setCookie(event, 'refreshToken', '', { maxAge: 0, path: '/' });
    
    return {
      message: 'Sesión cerrada exitosamente'
    };
  } catch (error) {
    console.error('Error en logout:', error);
    return createError({
      statusCode: 500,
      message: 'Error en el servidor'
    });
  }
});
