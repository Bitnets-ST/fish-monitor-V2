import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    zone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
    },
    sensor_type: {
      type: String,
      trim: true,
      required: [true, "Sensor type is required"],
    },
    
  },
  { timestamps: true }
);

// El tercer argumento para mongoose.model es el nombre de la colección que quieres usar.
const Sensor = mongoose.model("Sensor", sensorSchema, "sensor");

export default Sensor;