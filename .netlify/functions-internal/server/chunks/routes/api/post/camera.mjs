import { d as defineEventHandler, r as readBody, c as createError } from '../../../_/nitro.mjs';
import { C as Camera } from '../../../_/camera.mjs';
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

const camera = defineEventHandler(async (event) => {
  try {
    const { name, camera_IP, zone_id, camera_type } = await readBody(event);
    if (!name || !camera_IP || !camera_type || !zone_id) {
      return createError({
        statusCode: 400,
        message: "Nombre, IP de c\xE1mara, tipo de c\xE1mara y zona asociada son obligatorios."
      });
    }
    const existingCamera = await Camera.findOne({ camera_IP });
    if (existingCamera) {
      return createError({
        statusCode: 409,
        // Conflict
        message: "Ya existe una camara con esta IP."
      });
    }
    const newCamera = new Camera({
      name,
      camera_IP,
      zone_id,
      camera_type
    });
    await newCamera.save();
    event.node.res.statusCode = 201;
    return {
      message: "Camara creada exitosamente.",
      camera: newCamera
    };
  } catch (error) {
    console.error("Error en POST /api/camera:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return createError({
        statusCode: 400,
        message: messages.join(", ")
      });
    }
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al crear la camara."
    });
  }
});

export { camera as default };
//# sourceMappingURL=camera.mjs.map
