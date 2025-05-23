import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
import { C as Camera } from '../../../_/camera.mjs';
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

const camera = defineEventHandler(async () => {
  try {
    const cameras = await Camera.find({}).select("name camera_IP camera_type zone_id createdAt updatedAt _id").populate({ path: "zone_id", select: "name _id" }).populate({ path: "camera_type", select: "name" });
    return {
      success: true,
      cameras
    };
  } catch (error) {
    console.error("Error fetching cameras:", error);
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al obtener las c\xE1maras."
    });
  }
});

export { camera as default };
//# sourceMappingURL=camera.mjs.map
