const Absensi = require('../models/absensiModel');

const absenMasuk = async (req, res) => {
  const { pegawaiId, lokasi } = req.body; // Ambil lokasi dari req.body

  if (!pegawaiId) {
    return res.status(400).json({ message: 'ID Pegawai wajib diisi' });
  }

  // Validasi lokasi
  const lokasiValid = ['Kantor A', 'Kantor B', 'Luar Kota'];
  if (!lokasiValid.includes(lokasi)) {
    return res.status(400).json({ message: 'Lokasi tidak valid' });
  }

  try {
    const absen = new Absensi({
      pegawaiId,
      lokasi
    });

    await absen.save();
    res.status(201).json({ message: 'Absensi masuk berhasil', data: absen });
  } catch (err) {
    res.status(500).json({ message: 'Gagal melakukan absensi', error: err.message });
  }
};

module.exports = { absenMasuk };
const absenKeluar = async (req, res) => {
  const { pegawaiId } = req.body;

  if (!pegawaiId) {
    return res.status(400).json({ message: 'ID Pegawai wajib diisi' });
  }

  try {
    const absen = await Absensi.findOne({ pegawaiId, waktuKeluar: null }); // Cari absensi yang belum keluar
    if (!absen) {
      return res.status(404).json({ message: 'Absensi masuk tidak ditemukan' });
    }

    absen.waktuKeluar = Date.now(); // Set waktu keluar
    await absen.save();

    res.status(200).json({ message: 'Absensi keluar berhasil', data: absen });
  } catch (err) {
    res.status(500).json({ message: 'Gagal melakukan absensi keluar', error: err.message });
  }
};

