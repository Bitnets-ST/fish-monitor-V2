import mongoose from 'mongoose';

const cameraTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    camera_type_description: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);
const CameraType = mongoose.model("CameraType", cameraTypeSchema, "camera_type");

export { CameraType as C };
//# sourceMappingURL=camera_type.mjs.map
