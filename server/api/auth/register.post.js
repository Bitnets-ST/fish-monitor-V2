import User from '~/server/models/user';
import { generateAccessToken, generateRefreshToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  try {
    const { name, email, password, user_description } = await readBody(event);

    // Validaciones básicas
    if (!name || !email || !password) {
      return createError({
        statusCode: 400,
        message: 'Nombre, email y contraseña son obligatorios.'
      });
    }
    
    if (password.length < 6) { // Ejemplo de validación de contraseña
        return createError({
            statusCode: 400,
            message: 'La contraseña debe tener al menos 6 caracteres.'
        });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return createError({
        statusCode: 409, // Conflict
        message: 'Un usuario con este email ya existe.'
      });
    }

    // Crear nuevo usuario (la contraseña se hashea automáticamente por el middleware del schema)
    const newUser = new User({
      name,
      email,
      password, // Se pasará al pre-save hook para hashear
      user_description: user_description || '',
      // El rol por defecto es 'supervisor' según el schema
      // isActive por defecto es true
    });

    await newUser.save();

    // Opcional: Iniciar sesión automáticamente al usuario después del registro
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // Actualizar refreshToken en la base de datos
    newUser.refreshToken = refreshToken;
    newUser.lastLogin = new Date(); // Opcional, o dejarlo para el primer login real
    await newUser.save(); // Guardar de nuevo con el refreshToken

    setCookie(event, 'accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hora
      path: '/'
    });
    
    setCookie(event, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/'
    });

    return {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      },
      message: 'Usuario registrado e iniciado sesión exitosamente.'
    };

  } catch (error) {
    console.error('Error en el endpoint de registro:', error);
    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
        let messages = Object.values(error.errors).map(val => val.message);
        return createError({
            statusCode: 400,
            message: messages.join(', ')
        });
    }
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al registrar el usuario.'
    });
  }
});
