import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
import { B as Branch } from '../../../_/branch.mjs';
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

const branch = defineEventHandler(async () => {
  try {
    const branches = await Branch.find({}).select("name _id location description isActive createdAt updatedAt").sort({ name: 1 });
    return {
      success: true,
      branches
    };
  } catch (error) {
    console.error("Error fetching branches:", error);
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al obtener las sucursales."
    });
  }
});

export { branch as default };
//# sourceMappingURL=branch.mjs.map
