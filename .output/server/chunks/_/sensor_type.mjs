import mongoose from 'mongoose';

const sensorTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    sensor_type_description: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);
const SensorType = mongoose.model("SensorType", sensorTypeSchema, "sensor_type");

export { SensorType as S };
//# sourceMappingURL=sensor_type.mjs.map
