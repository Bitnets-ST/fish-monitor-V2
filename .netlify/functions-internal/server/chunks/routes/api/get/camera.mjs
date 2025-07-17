import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
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
