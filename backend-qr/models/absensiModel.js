const mongoose = require('mongoose');

const absensiSchema = new mongoose.Schema({
  pegawaiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pegawai',
    required: true,
  },
  waktuMasuk: {
    type: Date,
    required: true,
    default: Date.now
  },
  lokasi: {
    type: String, // nanti untuk validasi lokasi
    default: '-'
  }
});

module.exports = mongoose.model('Absensi', absensiSchema);
