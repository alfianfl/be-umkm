const Promo = require("../models/Promo");

const index = async (req, res) => {
  Promo.find()
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

const addPromo = async (req, res) => {
  let dataID = req.params.id;

  let dataPromo = new Promo({
    id_toko: dataID,
    nama_promo: req.body.nama_promo,
    platform: req.body.platform,
    link: req.body.link,
    masa_berlaku: req.body.masa_berlaku,
  });

  try {
    const response = await Promo.insertMany(dataPromo);
    res.status(200).json({ message: "Berhasil menambah voucher", response });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deletePromo = async (req, res) => {
  let dataID = req.params.id;
  try {
    await Promo.findByIdAndDelete(dataID);
    res.status(200).json({ message: "Berhasil menghapus promo" });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const getPromoByToko = async (req, res) => {
  let dataID = req.params.id;
  try {
    const response = await Promo.find({ id_toko: dataID });

    res.status(200).json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports = {
  index,
  addPromo,
  deletePromo,
  getPromoByToko,
};
