import { c as defineEventHandler, k as getQuery, e as createError } from '../../../_/nitro.mjs';
import { S as Sensor } from '../../../_/sensor.mjs';
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

const sensor = defineEventHandler(async (event) => {
  try {
    const query = {};
    const zoneId = getQuery(event).zone_id;
    if (zoneId) {
      query.zone_id = zoneId;
    }
    const sensors = await Sensor.find(query).select("name zone_id sensor_type createdAt updatedAt _id").populate({ path: "zone_id", select: "name _id" }).sort({ name: 1 });
    return {
      success: true,
      sensors
    };
  } catch (error) {
    console.error("Error fetching sensors:", error);
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al obtener los sensores."
    });
  }
});

export { sensor as default };
//# sourceMappingURL=sensor.mjs.map
