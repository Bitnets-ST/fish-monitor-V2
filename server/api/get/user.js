import User from '~/server/models/user'; // Adjust if your User model is named differently or located elsewhere

export default defineEventHandler(async () => {
  try {
    // Fetching users, selecting name and _id. Adjust 'name' if your User model uses a different field for display name (e.g., username, fullName).
    const users = await User.find({}).select('name _id').sort({ name: 1 }); 
    return {
      success: true,
      users: users
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return createError({
      statusCode: 500,
      message: 'Error interno del servidor al obtener los usuarios.'
    });
  }
});
