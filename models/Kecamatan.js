const mongoose = require("mongoose");

const kecamatanSchema = new mongoose.Schema(
  {
    id_kecamatan: {
      type: String,
      unique: true,
    },
    nama_kecamatan: {
      type: String,
    },
  },
  { timestamps: true }
);

const Kecamatan = mongoose.model("Kecamatan", kecamatanSchema);
module.exports = Kecamatan;
