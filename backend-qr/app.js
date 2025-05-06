const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rutepegawai = require('./routes/rutePegawai')
const ruteAbsensi = require('./routes/ruteAbsensi');

require('dotenv').config(); // baca file .env

const app = express();

app.use(cors()); // izinkan semua origin
app.use(express.json()); // supaya bisa baca data JSON dari frontend
app.use('/pegawai', rutepegawai);
app.use('/absensi', ruteAbsensi);
// koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB terkoneksi'))
  .catch(err => console.error('❌ Gagal konek MongoDB:', err));
    
module.exports = app;
