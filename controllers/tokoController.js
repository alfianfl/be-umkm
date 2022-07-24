const Toko = require('../models/Toko');
const Produk = require('../models/Produk');

const cloudinary = require('../services/cloudinary');

const index = async (req, res) => {
  let size = req.query.dataSize;
  Toko.find()
    .limit(size)
    .then((data) => {
      res.json({
        data
      });
    })
    .catch((error) => {
      res.json({
        message: error
      });
    });

  // Toko.find()
  // .limit(size)
  // .then((data) => {
  //   res.json({
  //     data
  //   });
  // })
  // .catch((error) => {
  //   res.json({
  //     message: error
  //   });
  // });
};

//Get Toko By Id
const getTokoById = async (req, res) => {
  let dataID = req.params.id;
  try {
    const response = await Toko.findById(dataID);
    res.status(200).json({ data: response });
  } catch (error) {
    res.json({
      message: error
    });
  }
};

//Add Data
const addToko = async (req, res) => {
  user = req.decoded;
  let dataLogo = '';

  if (req.files) {
    var imageUrlListGallery = [];
    for (var i = 0; i < req.files['gallery'].length; i++) {
      var locaFilePath = req.files['gallery'][i].path;

      var resultGallery = await cloudinary.uploadToCloudinary(locaFilePath);
      const dataGallery = { url: resultGallery.url };
      imageUrlListGallery.push(dataGallery);
    }

    var resultLogo = await cloudinary.uploadToCloudinary(
      req.files['logo'][0].path
    );
    dataLogo = resultLogo.url;
  }

  cloudinary.deleteLocal();
  var SosialMediaList = [];

  const lengthSosmed =
    req.body.sosial_media.length > 6 ? 1 : req.body.sosial_media.length;

  for (var i = 0; i < lengthSosmed; i++) {
    SosialMediaList.push(
      JSON.parse(
        lengthSosmed === 1 ? req.body.sosial_media : req.body.sosial_media[i]
      )
    );
  }

  const geolocation = [
    parseFloat(req.body.longitude),
    parseFloat(req.body.latitude)
  ];

  let dataToko = new Toko({
    nama_toko: req.body.nama_toko,
    sektor_usaha: req.body.sektor_usaha,
    deskripsi_toko: req.body.deskripsi_toko,
    telp_toko: req.body.telp_toko,
    email_toko: req.body.email_toko,
    logo: dataLogo,
    galeri: imageUrlListGallery,
    sosial_media: SosialMediaList,
    lokasi: {
      coordinates: geolocation
    },
    kecamatan: req.body.kecamatan,
    kode_pos: req.body.kode_pos,
    alamat: req.body.alamat,
    id_user: user.id
  });

  try {
    const response = await dataToko.save();
    return res
      .status(200)
      .json({ message: 'Berhasil mendaftarkan toko', response });
  } catch (error) {
    res.json({
      message: error
    });
  }
};

const deleteToko = async (req, res) => {
  let dataID = req.params.id;

  try {
    await Produk.deleteMany({
      id_toko: dataID
    })
      .then(function () {
        console.log('Data deleted'); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });

    await Toko.findByIdAndDelete(dataID);
    res.status(200).json({ message: 'Berhasil menghapus data toko' });
  } catch (error) {
    res.json({
      message: error
    });
  }
};

const filterLokasi = async (req, res) => {
  let dataSearch = req.query.lks;
  let dataToko = await Toko.find({
    kecamatan: dataSearch
  });
  res.json({
    data: dataToko
  });
};

const filterSearch = async (req, res) => {
  let dataSearch = req.query.q;
  let dataToko = await Toko.find({
    nama_toko: {
      $regex: dataSearch,
      $options: 'i'
    }
  });
  res.json({
    data: dataToko
  });
};

const editProfilToko = async (req, res) => {
  let dataID = req.params.id;

  if (req.files) {
    var imageUrlListGallery = [];
    for (var i = 0; i < req.files['gallery'].length; i++) {
      var locaFilePath = req.files['gallery'][i].path;

      var resultGallery = await cloudinary.uploadToCloudinary(locaFilePath);
      const dataGallery = { url: resultGallery.url };
      imageUrlListGallery.push(dataGallery);
    }

    var resultLogo = await cloudinary.uploadToCloudinary(
      req.files['logo'][0].path
    );
    var dataLogo = resultLogo.url;
  }

  let dataUpdate = {
    nama_toko: req.body.nama_toko,
    sektor_usaha: req.body.sektor_usaha,
    deskripsi_toko: req.body.deskripsi_toko,
    telp_toko: req.body.telp_toko,
    email_toko: req.body.email_toko,
    logo: dataLogo,
    galeri: imageUrlListGallery
  };

  cloudinary.deleteLocal();

  try {
    await Toko.findByIdAndUpdate(dataID, {
      $set: dataUpdate
    });
    res.status(200).json({ message: 'Berhasil menrubah data' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const editPromoToko = async (req, res) => {
  let dataID = req.params.id;

  var promoList = [];

  // const lengthSosmed =
  //   req.body.sosial_media.length > 6 ? !1 : req.body.sosial_media.length;

  for (var i = 0; i < req.body.promos.length; i++) {
    promoList.push(req.body.promos[i]);
  }

  let dataUpdate = {
    promos: promoList
  };

  try {
    await Toko.findByIdAndUpdate(dataID, {
      $set: dataUpdate
    });
    res.status(200).json({ message: 'Berhasil menrubah data' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const editSosmedToko = async (req, res) => {
  let dataID = req.params.id;

  var SosialMediaList = [];

  // const lengthSosmed =
  //   req.body.sosial_media.length > 6 ? !1 : req.body.sosial_media.length;

  for (var i = 0; i < req.body.sosial_media.length; i++) {
    SosialMediaList.push(req.body.sosial_media[i]);
  }

  let dataUpdate = {
    sosial_media: SosialMediaList
  };

  try {
    await Toko.findByIdAndUpdate(dataID, {
      $set: dataUpdate
    });
    res.status(200).json({ message: 'Berhasil menrubah data' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const editAlamatToko = async (req, res) => {
  let dataID = req.params.id;
  const geolocation = [
    parseFloat(req.body.longitude),
    parseFloat(req.body.latitude)
  ];

  let dataUpdate = {
    lokasi: {
      coordinates: geolocation
    },
    kecamatan: req.body.kecamatan,
    kode_pos: req.body.kode_pos
  };

  try {
    await Toko.findByIdAndUpdate(dataID, {
      $set: dataUpdate
    });
    res.status(200).json({ message: 'Berhasil merubah data' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const editAdministrasiToko = async (req, res) => {
  let dataID = req.params.id;

  let dataUpdate = {
    tahun_toko: req.body.tahun_toko,
    aset: req.body.aset,
    omset: req.body.omset,
    tenaga_kerja: req.body.tenaga_kerja,
    produksi: req.body.produksi,
    wilayah_pemasaran: req.body.wilayah_pemasaran
  };

  try {
    await Toko.findByIdAndUpdate(dataID, {
      $set: dataUpdate
    });
    res.status(200).json({ message: 'Berhasil merubah data' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const editLegalitasToko = async (req, res) => {
  let dataID = req.params.id;

  if (req.file) {
    var result = await cloudinary.uploadToCloudinary(req.file.path);
    var foto_dokumen = result.url;
  }

  cloudinary.deleteLocal();

  let dataUpdate = {
    tipe_dokumen: req.body.tipe_dokumen,
    foto_dokumen: foto_dokumen
  };

  try {
    await Toko.findByIdAndUpdate(dataID, {
      $set: dataUpdate
    });
    res.status(200).json({ message: 'Berhasil merubah data' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const editPelatihanToko = async (req, res) => {
  let dataID = req.params.id;

  let dataUpdate = {
    daftar_pelatihan: req.body.daftar_pelatihan
  };

  try {
    await Toko.findByIdAndUpdate(dataID, {
      $set: dataUpdate
    });
    res.status(200).json({ message: 'Berhasil merubah data' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const filterCategory = async (req, res) => {
  let dataSearch = req.query.ctg;
  let dataProduk = await Toko.find({
    sektor_usaha: dataSearch
  });
  res.json({
    data: dataProduk
  });
};

module.exports = {
  index,
  addToko,
  deleteToko,
  filterLokasi,
  filterSearch,
  editAdministrasiToko,
  editAlamatToko,
  editPelatihanToko,
  editLegalitasToko,
  editProfilToko,
  editSosmedToko,
  getTokoById,
  filterCategory,
  editPromoToko
};
