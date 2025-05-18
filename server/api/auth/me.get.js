import User from '~/server/models/user';
import { verifyToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  try {
    // Obtener el token de acceso de la cookie
    const accessToken = getCookie(event, 'accessToken');
    
    if (!accessToken) {
      return createError({
        statusCode: 401,
        message: 'No autenticado'
      });
    }

    // Verificar el token
    const decoded = verifyToken(accessToken);
    if (!decoded) {
      return createError({
        statusCode: 401,
        message: 'Token inválido o expirado'
      });
    }

    // Buscar el usuario por ID
    const user = await User.findById(decoded.id);
    
    if (!user || !user.isActive) {
      return createError({
        statusCode: 401,
        message: 'Usuario no encontrado o inactivo'
      });
    }

    // Devolver información del usuario
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        user_description: user.user_description
      }
    };
  } catch (error) {
    console.error('Error en me:', error);
    return createError({
      statusCode: 500,
      message: 'Error en el servidor'
    });
  }
});
