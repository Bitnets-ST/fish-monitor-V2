import { c as defineEventHandler, r as readBody, e as createError, g as generateAccessToken, f as generateRefreshToken, h as setCookie } from '../../../_/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);
    if (!email || !password) {
      return createError({
        statusCode: 400,
        message: "Email y contrase\xF1a son requeridos"
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.isActive) {
      return createError({
        statusCode: 401,
        message: "Credenciales inv\xE1lidas o usuario inactivo"
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return createError({
        statusCode: 401,
        message: "Credenciales inv\xE1lidas"
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    user.lastLogin = /* @__PURE__ */ new Date();
    await user.save();
    setCookie(event, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60,
      // 1 hora
      path: "/"
    });
    setCookie(event, "refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      // 7 días
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
      message: "Inicio de sesi\xF3n exitoso"
    };
  } catch (error) {
    console.error("Error en login:", error);
    return createError({
      statusCode: 500,
      message: "Error en el servidor"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
