const app = require('./app'); // ambil konfigurasi dari app.js

const PORT = process.env.PORT || 5000; // port tempat backend berjalan
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
