import mongoose from "mongoose";

export default async () => {
  const runtimeConfig = useRuntimeConfig();

  if (!runtimeConfig.MONGODB_URI) {
    console.error("FATAL: MONGODB_URI is not defined in runtime config.");
    // En un entorno de producción, podrías querer que la aplicación falle si no puede conectarse a la BD.
    // process.exit(1);
    return;
  }

  try {
    // Evitar múltiples conexiones si ya existe una
    if (
      mongoose.connection.readyState !== 1 &&
      mongoose.connection.readyState !== 2
    ) {
      await mongoose.connect(runtimeConfig.MONGODB_URI);
      console.log("MongoDB connected successfully via mongoose plugin.");
    } else {
      console.log("MongoDB connection already established or connecting.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB via mongoose plugin:", error);
  }
};
