import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'mongoose';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:module';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';

const user = defineEventHandler(async () => {
  try {
    return {
      success: true,
      users: []
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al obtener los usuarios."
    });
  }
});

export { user as default };
//# sourceMappingURL=user.mjs.map
