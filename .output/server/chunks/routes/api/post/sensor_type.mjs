import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
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
    const { name, sensor_type_description } = await readBody(event);
    if (!name) {
      return createError({
        statusCode: 400,
        message: "El nombre del tipo de sensor es obligatorio."
      });
    }
    const existingSensorType = await SensorType.findOne({ name });
    if (existingSensorType) {
      return createError({
        statusCode: 409,
        // Conflict
        message: "Ya existe un tipo de sensor con este nombre."
      });
    }
    const newSensorType = new SensorType({
      name,
      sensor_type_description
    });
    await newSensorType.save();
    event.node.res.statusCode = 201;
    return {
      message: "Tipo de sensor creado exitosamente.",
      sensorType: newSensorType
    };
  } catch (error) {
    console.error("Error en POST /api/sensor_type:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return createError({
        statusCode: 400,
        message: messages.join(", ")
      });
    }
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al crear el tipo de sensor."
    });
  }
});

export { sensor_type as default };
//# sourceMappingURL=sensor_type.mjs.map
