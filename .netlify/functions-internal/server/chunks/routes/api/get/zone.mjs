import { d as defineEventHandler, a as getQuery, c as createError } from '../../../_/nitro.mjs';
import { Z as Zone } from '../../../_/zone.mjs';
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

const zone = defineEventHandler(async (event) => {
  try {
    const query = {};
    const branchId = getQuery(event).branch_id;
    if (branchId) {
      query.branch_id = branchId;
    }
    const zones = await Zone.find(query).select("name zone_description zone_manager zone_direction branch_id createdAt updatedAt _id").populate({ path: "branch_id", select: "name _id" }).sort({ name: 1 });
    return {
      success: true,
      zones
    };
  } catch (error) {
    console.error("Error fetching zones:", error);
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al obtener las zonas."
    });
  }
});

export { zone as default };
//# sourceMappingURL=zone.mjs.map
