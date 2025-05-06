const Pegawai = require('../models/pegawaiModel'); // PERBAIKI PAKAI huruf besar
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Tambahkan untuk JWT

// REGISTER
const registerpegawai = async (req, res) => {
  const { email, password, nama } = req.body;

  if (!email || !password || !nama) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  try {
    const existing = await Pegawai.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPegawai = new Pegawai({ email, password: hashedPassword, nama });
    await newPegawai.save();

    res.status(201).json({ message: 'Registrasi berhasil', data: newPegawai });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
};

// LOGIN
const loginpegawai = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pegawai = await Pegawai.findOne({ email });
    if (!pegawai) {
      return res.status(404).json({ message: 'Email tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, pegawai.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign({ id: pegawai._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login berhasil',
      data: pegawai,
      token: token, // Kirim token di response
    });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
};

module.exports = { registerpegawai, loginpegawai };
