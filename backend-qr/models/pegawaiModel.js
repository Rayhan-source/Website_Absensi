const mongoose = require('mongoose');

// Buat struktur data pegawai
const pegawaiSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Pegawai', pegawaiSchema); // PAKAI huruf besar
