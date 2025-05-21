import Tank from '~/server/models/tank';

export default defineEventHandler(async () => {
  try {
    const allTanks = await Tank.find({}); // Fetch all tanks first for aggregate calculations

    // Calculate Summary Statistics
    const totalTanks = allTanks.length;
    let totalFish = 0;
    let totalBiomassKg = 0;
    let sumOfTemperatures = 0;
    let tanksWithTemperature = 0;

    allTanks.forEach(tank => {
      if (tank.población) {
        totalFish += tank.población.total_peces || 0;
        totalBiomassKg += tank.población.biomasa_kg || 0;
      }
      if (tank.condiciones && typeof tank.condiciones.temperatura_c === 'number') {
        sumOfTemperatures += tank.condiciones.temperatura_c;
        tanksWithTemperature++;
      }
    });

    const averageTemperature = tanksWithTemperature > 0 ? (sumOfTemperatures / tanksWithTemperature) : null;

    const summary = {
      totalTanks,
      totalFish,
      averageTemperature: averageTemperature !== null ? parseFloat(averageTemperature.toFixed(1)) : null, // Format to one decimal place
      totalBiomassKg
    };

    // Fetch tanks again for pagination/sorting or specific list view if needed in the future.
    // For now, assuming the main request might just be for summary or a full list for other views.
    // The previous query for a sorted list with populated fields:
    const listedTanks = await Tank.find({})
      .select('_id nombre ubicación capacidad tipo material sensores estado fecha_creación última_inspección especies población condiciones createdAt updatedAt branch_id zone_id')
      .populate({ path: 'branch_id', select: 'name _id' })
      .populate({ path: 'zone_id', select: 'name _id' })
      .sort({ nombre: 1 });

    return {
      success: true,
      summary: summary,
      tanks: listedTanks // Ahora retorna todos los campos relevantes
    };

  } catch (error) {
    console.error('Error fetching tanks and summary:', error);
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al obtener los estanques y el resumen.',
      statusMessage: 'Internal Server Error'
    });
  }
});