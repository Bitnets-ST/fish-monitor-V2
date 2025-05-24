import { c as defineEventHandler, i as getCookie, h as setCookie, e as createError } from '../../../_/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refreshToken");
    if (refreshToken) {
      await User.findOneAndUpdate(
        { refreshToken },
        { refreshToken: null }
      );
    }
    setCookie(event, "accessToken", "", { maxAge: 0, path: "/" });
    setCookie(event, "refreshToken", "", { maxAge: 0, path: "/" });
    return {
      message: "Sesi\xF3n cerrada exitosamente"
    };
  } catch (error) {
    console.error("Error en logout:", error);
    return createError({
      statusCode: 500,
      message: "Error en el servidor"
    });
  }
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
