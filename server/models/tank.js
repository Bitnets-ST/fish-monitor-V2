import mongoose from "mongoose";

const tankSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    ubicación: {
      latitud: {
        type: Number,
        required: true,
      },
      longitud: {
        type: Number,
        required: true,
      },
      dirección: {
        type: String,
        required: true,
      },
    },
    capacidad: {
      type: Number,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    sensores: [
      {
        type: String,
      },
    ],
    estado: {
      type: String,
      enum: ["activo", "inactivo", "mantenimiento"],
      default: "activo",
    },
    fecha_creación: {
      type: Date,
      required: true,
    },
    última_inspección: {
      type: Date,
    },
    especies: [
      {
        type: String,
      },
    ],
    población: {
      total_peces: {
        type: Number,
        default: 0,
      },
      biomasa_kg: {
        type: Number,
        default: 0,
      },
    },
    condiciones: {
      temperatura_c: {
        type: Number,
      },
      pH: {
        type: Number,
      },
      nivel_agua_cm: {
        type: Number,
      },
    },
    alimentación: {
      tipo: {
        type: String,
      },
      frecuencia_diaria: {
        type: Number,
      },
    },
    // Campos de referencia adicionales según tu esquema original
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    zone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

const Tank = mongoose.model("Tank", tankSchema, "tank");

export default Tank;
