import { d as defineEventHandler, r as readBody, c as createError } from '../../../_/nitro.mjs';
import { T as Tank } from '../../../_/tank.mjs';
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

const tank = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.nombre || !body.capacidad || !body.tipo || !body.material) {
      return createError({
        statusCode: 400,
        statusMessage: "Faltan campos requeridos para crear el estanque"
      });
    }
    if (!body.ubicaci\u00F3n || !body.ubicaci\u00F3n.latitud || !body.ubicaci\u00F3n.longitud || !body.ubicaci\u00F3n.direcci\u00F3n) {
      return createError({
        statusCode: 400,
        statusMessage: "La informaci\xF3n de ubicaci\xF3n es requerida"
      });
    }
    if (!body.zone_id) {
      return createError({
        statusCode: 400,
        statusMessage: "Se requiere una zona asociada al estanque"
      });
    }
    if (!body.fecha_creaci\u00F3n) {
      body.fecha_creaci\u00F3n = /* @__PURE__ */ new Date();
    }
    const newTank = new Tank(body);
    await newTank.save();
    return newTank;
  } catch (error) {
    console.error("Error al crear estanque:", error);
    return createError({
      statusCode: 500,
      statusMessage: `Error al crear estanque: ${error.message}`
    });
  }
});

export { tank as default };
//# sourceMappingURL=tank.mjs.map
