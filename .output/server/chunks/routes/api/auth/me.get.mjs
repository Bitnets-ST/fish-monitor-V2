import { c as defineEventHandler, i as getCookie, e as createError, v as verifyToken } from '../../../_/nitro.mjs';
import { U as User } from '../../../_/user.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'mongoose';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';
import 'node:path';
import 'bcryptjs';

const me_get = defineEventHandler(async (event) => {
  try {
    const accessToken = getCookie(event, "accessToken");
    if (!accessToken) {
      return createError({
        statusCode: 401,
        message: "No autenticado"
      });
    }
    const decoded = verifyToken(accessToken);
    if (!decoded) {
      return createError({
        statusCode: 401,
        message: "Token inv\xE1lido o expirado"
      });
    }
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return createError({
        statusCode: 401,
        message: "Usuario no encontrado o inactivo"
      });
    }
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
    console.error("Error en me:", error);
    return createError({
      statusCode: 500,
      message: "Error en el servidor"
    });
  }
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
