import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
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

const branch = defineEventHandler(async (event) => {
  try {
    const { name, location, description } = await readBody(event);
    if (!name) {
      return createError({
        statusCode: 400,
        message: "El nombre de la sucursal es obligatorio."
      });
    }
    const existingBranch = await Branch.findOne({ name });
    if (existingBranch) {
      return createError({
        statusCode: 409,
        // Conflict
        message: "Ya existe una sucursal con este nombre."
      });
    }
    const newBranch = new Branch({
      name,
      location: location || "",
      description: description || ""
    });
    await newBranch.save();
    event.node.res.statusCode = 201;
    return {
      message: "Sucursal creada exitosamente.",
      branch: newBranch
    };
  } catch (error) {
    console.error("Error en POST /api/branch:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return createError({
        statusCode: 400,
        message: messages.join(", ")
      });
    }
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al crear la sucursal."
    });
  }
});

export { branch as default };
//# sourceMappingURL=branch.mjs.map
