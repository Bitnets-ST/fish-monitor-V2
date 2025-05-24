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

const register_post = defineEventHandler(async (event) => {
  try {
    const { name, email, password, user_description } = await readBody(event);
    if (!name || !email || !password) {
      return createError({
        statusCode: 400,
        message: "Nombre, email y contrase\xF1a son obligatorios."
      });
    }
    if (password.length < 6) {
      return createError({
        statusCode: 400,
        message: "La contrase\xF1a debe tener al menos 6 caracteres."
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return createError({
        statusCode: 409,
        // Conflict
        message: "Un usuario con este email ya existe."
      });
    }
    const newUser = new User({
      name,
      email,
      password,
      // Se pasará al pre-save hook para hashear
      user_description: user_description || ""
      // El rol por defecto es 'supervisor' según el schema
      // isActive por defecto es true
    });
    await newUser.save();
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    newUser.refreshToken = refreshToken;
    newUser.lastLogin = /* @__PURE__ */ new Date();
    await newUser.save();
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
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      },
      message: "Usuario registrado e iniciado sesi\xF3n exitosamente."
    };
  } catch (error) {
    console.error("Error en el endpoint de registro:", error);
    if (error.name === "ValidationError") {
      let messages = Object.values(error.errors).map((val) => val.message);
      return createError({
        statusCode: 400,
        message: messages.join(", ")
      });
    }
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al registrar el usuario."
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
