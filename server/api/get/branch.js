import Branch from '~/server/models/branch';

export default defineEventHandler(async (event) => {
  // Optional: Add any access control or error handling if needed
  // For example, check user roles if this information should be restricted.

  try {
    const branches = await Branch.find({}).select('name _id').sort({ name: 1 }); // Fetches only name and _id, sorts by name
    return {
      success: true,
      branches: branches
    };
  } catch (error) {
    console.error('Error fetching branches:', error);
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al obtener las sucursales.'
    });
  }
});
