const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userUMKMSchema = new mongoose.Schema(
  {
    nama_lengkap: {
      type: String,
    },
    nik: {
      type: String,
    },
    tanggal_lahir: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    no_telp: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
    },
    jenis_kelamin: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserUMKM = mongoose.model("UserUMKM", userUMKMSchema);
module.exports = UserUMKM;
