import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
import { S as SensorType } from '../../../_/sensor_type.mjs';
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

const sensor_type = defineEventHandler(async (event) => {
  try {
    const sensorTypes = await SensorType.find({}).select("name _id").sort({ name: 1 });
    return {
      success: true,
      sensorTypes
      // Pluralized for consistency
    };
  } catch (error) {
    console.error("Error fetching sensor types:", error);
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al obtener los tipos de sensor."
    });
  }
});

export { sensor_type as default };
//# sourceMappingURL=sensor_type.mjs.map
