import jwt from 'jsonwebtoken';

// Función para generar un token de acceso
export const generateAccessToken = (user) => {
  const config = useRuntimeConfig();
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      role: user.role 
    },
    config.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Función para generar un token de refresco
export const generateRefreshToken = (user) => {
  const config = useRuntimeConfig();
  return jwt.sign(
    { id: user._id },
    config.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

// Función para verificar un token
export const verifyToken = (token, secret) => {
  try {
    const config = useRuntimeConfig();
    return jwt.verify(token, secret || config.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Función para verificar un token de refresco
export const verifyRefreshToken = (token) => {
  const config = useRuntimeConfig();
  return verifyToken(token, config.JWT_REFRESH_SECRET);
};
