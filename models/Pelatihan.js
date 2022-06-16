const mongoose = require("mongoose");

const pelatihanSchema = new mongoose.Schema(
  {
    judul_pelatihan: {
      type: String,
    },
    gambar_pelatihan: {
      type: String,
    },
    deskripsi: {
      type: String,
    },
    link_pelatihan: {
      type: String,
    },
  },
  { timestamps: true }
);

const Pelatihan = mongoose.model("Pelatihan", pelatihanSchema);
module.exports = Pelatihan;
