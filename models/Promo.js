const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema(
  {
    id_toko: {
      type: String,
    },
    nama_promo: {
      type: String,
    },
    platform: {
      type: String,
    },
    link: {
      type: String,
    },
    masa_berlaku: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Promo = mongoose.model("Promo", promoSchema);
module.exports = Promo;
