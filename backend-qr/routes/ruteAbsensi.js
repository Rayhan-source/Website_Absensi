const express = require('express');
const router = express.Router();
const { absenMasuk } = require('../controllers/absensiController');

router.post('/masuk', absenMasuk);

module.exports = router;
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak ada' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.pegawai = verified; // Menyimpan informasi pegawai dalam request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token tidak valid' });
  }
};

module.exports = verifyToken;

// Controller untuk menampilkan data absensi
const getAbsensi = async (req, res) => {
    try {
      const absensi = await Absensi.find().populate('pegawaiId', 'nama email'); // Populate untuk mendapatkan nama pegawai
      res.status(200).json({ message: 'Data absensi berhasil diambil', data: absensi });
    } catch (err) {
      res.status(500).json({ message: 'Gagal mengambil data absensi', error: err.message });
    }
  };
  
  // Tambahkan rute untuk GET absensi
  router.get('/', getAbsensi);  // Route untuk mendapatkan semua data absensi
  
