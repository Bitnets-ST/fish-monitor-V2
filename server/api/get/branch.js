import Branch from "~/server/models/branch";

export default defineEventHandler(async () => {
  // Authentication checks removed

  try {
    const branches = await Branch.find({})
      .select("name _id location description isActive createdAt updatedAt")
      .sort({ name: 1 }); // Ahora incluye todos los campos relevantes
    return {
      success: true,
      branches: branches,
    };
  } catch (error) {
    console.error("Error fetching branches:", error);
    return createError({
      statusCode: 500,
      message: "Error interno del servidor al obtener las sucursales.",
    });
  }
});
