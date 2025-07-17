import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
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

const camera_type = defineEventHandler(async () => {
  try {
    const cameraTypes = await CameraType.find({}).select("name _id").sort({ name: 1 });
    return {
      success: true,
      cameraTypes
      // Pluralized for consistency
    };
  } catch (error) {
    console.error("Error fetching camera types:", error);
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al obtener los tipos de c\xE1mara."
    });
  }
});

export { camera_type as default };
//# sourceMappingURL=camera_type.mjs.map
