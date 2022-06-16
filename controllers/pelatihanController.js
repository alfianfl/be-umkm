const Pelatihan = require("../models/Pelatihan");
const cloudinary = require("../services/cloudinary");

const index = async (req, res) => {
  Pelatihan.find()
    .sort({ createdAt: -1 })
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
};

//Add Data
const addPelatihan = async (req, res) => {
  if (req.file) {
    var resultLogo = await cloudinary.uploadToCloudinary(req.file.path);
    var gambarPelatihan = resultLogo.url;
  }

  cloudinary.deleteLocal();

  let dataPelatihan = new Pelatihan({
    judul_pelatihan: req.body.judul_pelatihan,
    gambar_pelatihan: gambarPelatihan,
    deskripsi: req.body.deskripsi,
    link_pelatihan: req.body.link_pelatihan,
  });

  try {
    const response = await dataPelatihan.save();
    return res
      .status(200)
      .json({ message: "Berhasil membuat pelatihan", response });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports = {
  index,
  addPelatihan,
};
