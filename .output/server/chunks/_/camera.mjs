import mongoose from 'mongoose';

const cameraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    camera_IP: {
      type: String,
      trim: true,
      required: [true, "Camera IP is required"]
    },
    zone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone"
    },
    camera_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CameraType",
      trim: true,
      required: [true, "Camera type is required"]
    }
  },
  { timestamps: true }
);
const Camera = mongoose.model("Camera", cameraSchema, "camera");

export { Camera as C };
//# sourceMappingURL=camera.mjs.map
