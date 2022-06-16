const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nama_produk: {
      type: String,
    },
    kategori_produk: {
      type: String,
    },
    id_toko: {
      type: String,
    },
    harga_produk: {
      type: String,
    },
    deskripsi: {
      type: String,
    },
    berat_produk: {
      type: String,
    },
    foto_produk: [
      {
        url: {
          type: String,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

const Produk = mongoose.model("Produk", productSchema);
module.exports = Produk;
