const Produk = require("../models/Produk");
const Toko = require("../models/Toko");
const dotenv = require("dotenv");
const cloudinary = require("../services/cloudinary");
const fs = require("fs");
const { json } = require("body-parser");

dotenv.config();

const index = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 9;
  Produk.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });

    // Produk.find()
    // .limit(limit * 1)
    // .skip((page - 1) * limit)
    // .sort({ createdAt: -1 })
    // .then((response) => {
    //   res.json({
    //     response,
    //   });
    // })
    // .catch((error) => {
    //   res.json({
    //     message: error,
    //   });
    // });
};

//Get Toko User
const getTokoUser = async (req, res) => {
  user = req.decoded;

  try {
    const toko = await Toko.find({
      id_user: user.id,
    });

    res.json({
      toko,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const getProdukUser = async (req, res) => {
  user = req.decoded;
  const toko = await Toko.find({
    id_user: user.id,
  })

  const id_toko = toko.map(function (item) {
    return item._id;
  });

  try {
    const produk = await Produk.find({
      id_toko: id_toko,
    });

    res.json({response:produk});
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const getProdukToko = async (req, res) => {
  let dataID = req.params.id;

  const toko = await Toko.findById(dataID);
  try {
    const produk = await Produk.find({
      id_toko: toko._id,
    });

    res.json({data:produk});
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

//Add Data
const addProduk = async (req, res) => {
  const dataToko = await Toko.findOne({ id_toko: req.body.id_toko });

  if (dataToko) {
    try {
      var ListPhotoProduct = [];

      for (var i = 0; i < req.files.length; i++) {
        var locaFilePath = req.files[i].path;

        var result = await cloudinary.uploadToCloudinary(locaFilePath);
        const foto_produk = { url: result.url };
        ListPhotoProduct.push(foto_produk);
      }

      let dataProduk = new Produk({
        nama_produk: req.body.nama_produk,
        kategori_produk: req.body.kategori_produk,
        harga_produk: req.body.harga_produk,
        id_toko: req.body.id_toko,
        deskripsi: req.body.deskripsi_produk,
        foto_produk: ListPhotoProduct,
      });

      const response = await dataProduk.save();
      return res.status(200).json({ message: "Berhasil menambahkan produk" });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  } else {
    res.status(200).json({ message: "Toko tidak ada" });
  }
};

const editProduk = async (req, res) => {
  let dataID = req.params.id;

  let dataUpdate = {
    nama_produk: req.body.nama_produk,
    kategori_produk: req.body.kategori_produk,
    id_toko: req.body.id_toko,
    harga_produk: req.body.harga_produk,
    deskripsi: req.body.deskripsi,
  };

  if (req.files) {
    var ListPhotoProduct = [];

    for (var i = 0; i < req.files.length; i++) {
      var result = await cloudinary.uploadToCloudinary(req.files[i].path);
      const foto_produk = { url: result.url };
      ListPhotoProduct.push(foto_produk);
    }

    dataUpdate.foto_produk = ListPhotoProduct;
  }
  cloudinary.deleteLocal();

  try {
    await Produk.findByIdAndUpdate(dataID, {
      $set: dataUpdate,
    });
    res.status(200).json({ message: "Berhasil update produk" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getDetailProduk = async (req, res) => {
  let dataID = req.params.id;

  try {
    const response = await Produk.findById(dataID);

    res.status(201).json({data: response});
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const deleteProduk = async (req, res) => {
  let dataID = req.params.id;
  try {
    await Produk.findByIdAndDelete(dataID);
    res.status(200).json({ message: "Berhasil menghapus data" });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const filterCategory = async (req, res) => {
  let dataSearch = req.query.ctg;
  let dataProduk = await Produk.find({
    kategori_produk: dataSearch,
  });
  res.json({response:dataProduk});
};

const filterSearch = async (req, res) => {
  let dataSearch = req.query.q;
  let dataProduk = await Produk.find({
    nama_produk: {
      $regex: dataSearch,
      $options: "i",
    },
  });
  res.json({response:dataProduk});
};

module.exports = {
  index,
  addProduk,
  editProduk,
  getTokoUser,
  getDetailProduk,
  deleteProduk,
  filterCategory,
  filterSearch,
  getProdukUser,
  getProdukToko,
};
