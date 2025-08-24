const mongoose = require('mongoose');

const centroSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  departamento: { type: String, required: true },
  ciudad: { type: String, required: true },
  direccion: String,
  telefono: String,
  email: String,
  activo: { type: Boolean, default: true },
  fechaCreacion: { type: Date, default: Date.now }
}, {
  timestamps: true,
  collection: 'centros'
});

// Índices para optimizar consultas
centroSchema.index({ departamento: 1 });
centroSchema.index({ activo: 1 });
centroSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model('Centro', centroSchema);