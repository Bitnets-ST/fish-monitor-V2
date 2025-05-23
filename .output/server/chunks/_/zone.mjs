import mongoose from 'mongoose';

const zoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    zone_description: {
      type: String,
      trim: true
    },
    zone_manager: {
      type: String,
      trim: true
    },
    zone_direction: {
      type: String,
      trim: true
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch"
    }
  },
  { timestamps: true }
);
const Zone = mongoose.model("Zone", zoneSchema, "zone");

export { Zone as Z };
//# sourceMappingURL=zone.mjs.map
