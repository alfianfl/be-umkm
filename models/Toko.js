const mongoose = require("mongoose");

const tokoSchema = new mongoose.Schema(
  {
    nama_toko: {
      type: String,
      default: null,
    },
    sektor_usaha: {
      type: String,
      default: null,
    },
    deskripsi_toko: {
      type: String,
      default: null,
    },
    telp_toko: {
      type: String,
      default: null,
    },
    email_toko: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    galeri: [
      {
        url: {
          type: String,
          default: null,
        },
      },
    ],
    alamat: {
      type: String,
      default: null,
    },
    kode_pos: {
      type: String,
      default: null,
    },
    kecamatan: {
      type: String,
      default: null,
    },
    lokasi: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: { type: [Number] },
    },

    tahun_toko: {
      type: String,
      default: null,
    },
    modal: {
      type: String,
      default: null,
    },
    aset: {
      type: String,
      default: null,
    },
    omset: {
      type: String,
      default: null,
    },
    tenaga_kerja: {
      type: String,
      default: null,
    },
    produksi: {
      type: String,
      default: null,
    },
    wilayah_pemasaran: {
      type: String,
      default: null,
    },
    tipe_dokumen: {
      type: String,
      default: null,
    },
    foto_dokumen: {
      type: String,
      default: null,
    },
    daftar_pelatihan: {
      type: String,
      default: null,
    },
    promos: [
      {
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
    ],
    sosial_media: [
      {
        platform_sosmed: {
          type: String,
          default: null,
        },
        nama_sosmed: {
          type: String,
          default: null,
        },
        link_sosmed: {
          type: String,
          default: null,
        },
      },
    ],
    id_user: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Toko = mongoose.model("Toko", tokoSchema);
module.exports = Toko;
