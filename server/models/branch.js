import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la sucursal es obligatorio.'],
    trim: true,
    unique: true
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
  // Aquí podrías añadir más campos como 'manager' (ObjectID referenciando a User),
  // 'contactInfo', 'openingHours', etc.
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

// Evitar la pluralización automática si quieres que la colección se llame 'branch'
const Branch = mongoose.model('Branch', branchSchema, 'branch');

export default Branch;
