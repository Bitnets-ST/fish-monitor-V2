import User from '~/server/models/user';
import { generateAccessToken, generateRefreshToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);
    
    // Validar datos de entrada
    if (!email || !password) {
      return createError({
        statusCode: 400,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Buscar usuario con contraseña (por defecto no se incluye)
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !user.isActive) {
      return createError({
        statusCode: 401,
        message: 'Credenciales inválidas o usuario inactivo'
      });
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return createError({
        statusCode: 401,
        message: 'Credenciales inválidas'
      });
    }

    // Generar tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Actualizar refreshToken en la base de datos
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    // Configurar cookies
    const config = useRuntimeConfig();
    
    // Cookie para el token de acceso
    setCookie(event, 'accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hora
      path: '/'
    });
    
    // Cookie para el token de refresco
    setCookie(event, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/'
    });

    // Devolver información del usuario (sin datos sensibles)
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      },
      message: 'Inicio de sesión exitoso'
    };
  } catch (error) {
    console.error('Error en login:', error);
    return createError({
      statusCode: 500,
      message: 'Error en el servidor'
    });
  }
});
