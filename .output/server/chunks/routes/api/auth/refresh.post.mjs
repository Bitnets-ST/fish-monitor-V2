import { c as defineEventHandler, i as getCookie, e as createError, j as verifyRefreshToken, h as setCookie, g as generateAccessToken } from '../../../_/nitro.mjs';
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

const refresh_post = defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refreshToken");
    if (!refreshToken) {
      return createError({
        statusCode: 401,
        message: "Token de refresco no proporcionado"
      });
    }
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      setCookie(event, "accessToken", "", { maxAge: 0, path: "/" });
      setCookie(event, "refreshToken", "", { maxAge: 0, path: "/" });
      return createError({
        statusCode: 401,
        message: "Token de refresco inv\xE1lido o expirado"
      });
    }
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken || !user.isActive) {
      setCookie(event, "accessToken", "", { maxAge: 0, path: "/" });
      setCookie(event, "refreshToken", "", { maxAge: 0, path: "/" });
      return createError({
        statusCode: 401,
        message: "Usuario no encontrado o token inv\xE1lido"
      });
    }
    const accessToken = generateAccessToken(user);
    setCookie(event, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60,
      // 1 hora
      path: "/"
    });
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      },
      message: "Token actualizado exitosamente"
    };
  } catch (error) {
    console.error("Error en refresh:", error);
    return createError({
      statusCode: 500,
      message: "Error en el servidor"
    });
  }
});

export { refresh_post as default };
//# sourceMappingURL=refresh.post.mjs.map
