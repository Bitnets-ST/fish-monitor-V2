import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
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

const user = defineEventHandler(async () => {
  try {
    const users = await User.find({}).select("name email user_description avatar isActive lastLogin role createdAt updatedAt _id").sort({ name: 1 });
    return {
      success: true,
      users
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
