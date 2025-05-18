import User from '~/server/models/user';
import { generateAccessToken, verifyRefreshToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  try {
    // Obtener el token de refresco de la cookie
    const refreshToken = getCookie(event, 'refreshToken');
    
    if (!refreshToken) {
      return createError({
        statusCode: 401,
        message: 'Token de refresco no proporcionado'
      });
    }

    // Verificar el token de refresco
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      // Eliminar cookies inválidas
      setCookie(event, 'accessToken', '', { maxAge: 0, path: '/' });
      setCookie(event, 'refreshToken', '', { maxAge: 0, path: '/' });
      
      return createError({
        statusCode: 401,
        message: 'Token de refresco inválido o expirado'
      });
    }

    // Buscar el usuario por ID y verificar que el refreshToken coincida
    const user = await User.findById(decoded.id);
    
    if (!user || user.refreshToken !== refreshToken || !user.isActive) {
      // Eliminar cookies inválidas
      setCookie(event, 'accessToken', '', { maxAge: 0, path: '/' });
      setCookie(event, 'refreshToken', '', { maxAge: 0, path: '/' });
      
      return createError({
        statusCode: 401,
        message: 'Usuario no encontrado o token inválido'
      });
    }

    // Generar nuevo token de acceso
    const accessToken = generateAccessToken(user);

    // Configurar nueva cookie para el token de acceso
    setCookie(event, 'accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hora
      path: '/'
    });

    // Devolver información del usuario
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      },
      message: 'Token actualizado exitosamente'
    };
  } catch (error) {
    console.error('Error en refresh:', error);
    return createError({
      statusCode: 500,
      message: 'Error en el servidor'
    });
  }
});
