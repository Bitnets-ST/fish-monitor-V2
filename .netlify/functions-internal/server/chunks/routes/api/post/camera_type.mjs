import { d as defineEventHandler, r as readBody, c as createError } from '../../../_/nitro.mjs';
import { C as CameraType } from '../../../_/camera_type.mjs';
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

const camera_type = defineEventHandler(async (event) => {
  try {
    const { name, camera_type_description } = await readBody(event);
    if (!name) {
      return createError({
        statusCode: 400,
        message: "El nombre del tipo de c\xE1mara es obligatorio."
      });
    }
    const existingCameraType = await CameraType.findOne({ name });
    if (existingCameraType) {
      return createError({
        statusCode: 409,
        // Conflict
        message: "Ya existe un tipo de c\xE1mara con este nombre."
      });
    }
    const newCameraType = new CameraType({
      name,
      camera_type_description
    });
    await newCameraType.save();
    event.node.res.statusCode = 201;
    return {
      message: "Tipo de c\xE1mara creado exitosamente.",
      cameraType: newCameraType
    };
  } catch (error) {
    console.error("Error en POST /api/camera_type:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return createError({
        statusCode: 400,
        message: messages.join(", ")
      });
    }
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al crear el tipo de c\xE1mara."
    });
  }
});

export { camera_type as default };
//# sourceMappingURL=camera_type.mjs.map
