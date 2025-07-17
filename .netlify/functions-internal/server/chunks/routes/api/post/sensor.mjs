import { d as defineEventHandler, r as readBody, c as createError } from '../../../_/nitro.mjs';
import { S as Sensor } from '../../../_/sensor.mjs';
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

const sensor = defineEventHandler(async (event) => {
  try {
    const { name, sensor_IP, zone_id, sensor_type } = await readBody(event);
    if (!name || !sensor_IP || !sensor_type || !zone_id) {
      return createError({
        statusCode: 400,
        message: "Nombre, IP del sensor, tipo de sensor y zona asociada son obligatorios."
      });
    }
    const existingSensor = await Sensor.findOne({ name });
    if (existingSensor) {
      return createError({
        statusCode: 409,
        // Conflict
        message: "Ya existe un sensor con este nombre"
      });
    }
    const newSensor = new Sensor({
      name,
      zone_id,
      sensor_IP,
      sensor_type
    });
    await newSensor.save();
    event.node.res.statusCode = 201;
    return {
      message: "Sensor creado exitosamente.",
      sensor: newSensor
    };
  } catch (error) {
    console.error("Error en POST /api/sensor:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return createError({
        statusCode: 400,
        message: messages.join(", ")
      });
    }
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al crear el sensor."
    });
  }
});

export { sensor as default };
//# sourceMappingURL=sensor.mjs.map
