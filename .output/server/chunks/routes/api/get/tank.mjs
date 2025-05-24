import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
import { T as Tank } from '../../../_/tank.mjs';
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

const tank = defineEventHandler(async () => {
  try {
    const allTanks = await Tank.find({});
    const totalTanks = allTanks.length;
    let totalFish = 0;
    let totalBiomassKg = 0;
    let sumOfTemperatures = 0;
    let tanksWithTemperature = 0;
    allTanks.forEach((tank) => {
      if (tank.poblaci\u00F3n) {
        totalFish += tank.poblaci\u00F3n.total_peces || 0;
        totalBiomassKg += tank.poblaci\u00F3n.biomasa_kg || 0;
      }
      if (tank.condiciones && typeof tank.condiciones.temperatura_c === "number") {
        sumOfTemperatures += tank.condiciones.temperatura_c;
        tanksWithTemperature++;
      }
    });
    const averageTemperature = tanksWithTemperature > 0 ? sumOfTemperatures / tanksWithTemperature : null;
    const summary = {
      totalTanks,
      totalFish,
      averageTemperature: averageTemperature !== null ? parseFloat(averageTemperature.toFixed(1)) : null,
      // Format to one decimal place
      totalBiomassKg
    };
    const listedTanks = await Tank.find({}).select("_id nombre ubicaci\xF3n capacidad tipo material sensores estado fecha_creaci\xF3n \xFAltima_inspecci\xF3n especies poblaci\xF3n condiciones createdAt updatedAt branch_id zone_id").populate({ path: "branch_id", select: "name _id" }).populate({ path: "zone_id", select: "name _id" }).sort({ nombre: 1 });
    return {
      success: true,
      summary,
      tanks: listedTanks
      // Ahora retorna todos los campos relevantes
    };
  } catch (error) {
    console.error("Error fetching tanks and summary:", error);
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al obtener los estanques y el resumen.",
      statusMessage: "Internal Server Error"
    });
  }
});

export { tank as default };
//# sourceMappingURL=tank.mjs.map
