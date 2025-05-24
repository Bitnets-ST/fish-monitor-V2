import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio."],
    trim: true
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio."],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Por favor, introduce un email v\xE1lido."]
  },
  password: {
    type: String,
    required: [true, "La contrase\xF1a es obligatoria."],
    minlength: [6, "La contrase\xF1a debe tener al menos 6 caracteres."],
    select: false
    // Evita que la contraseña se devuelva por defecto en las consultas
  },
  user_description: {
    type: String,
    trim: true,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true
  },
  refreshToken: {
    type: String,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null
  },
  role: {
    type: String,
    enum: ["administrador", "supervisor"],
    default: "supervisor"
  }
}, {
  timestamps: true
});
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("User", userSchema, "user");

export { User as U };
//# sourceMappingURL=user.mjs.map
