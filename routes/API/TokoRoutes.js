const express = require("express");
const tokoRouter = express.Router();
const tokoController = require("../../controllers/tokoController");
const upload = require("../../services/multer");
const auth = require("../../services/auth");

//Get All Toko
tokoRouter.get("/", tokoController.index);

//Get Toko By Id
tokoRouter.get("/profiletoko/:id", auth.verify, tokoController.getTokoById);

//Add Toko
tokoRouter.post(
  "/addToko",
  upload.fields([
    { name: "gallery" },
    {
      name: "logo",
      maxCount: 1,
    },
  ]),
  auth.verify,
  tokoController.addToko
);

//Filter Lokasi
tokoRouter.get("/lokasi", tokoController.filterLokasi);

//Filter Search
tokoRouter.get("/search", tokoController.filterSearch);

//Filter Category
tokoRouter.get("/kategori", tokoController.filterCategory);

//Delete Toko
tokoRouter.post("/deleteToko/:id", auth.verify, tokoController.deleteToko);

//Edit Profile Toko
tokoRouter.patch(
  "/editProfil/:id",
  upload.fields([
    { name: "gallery" },
    {
      name: "logo",
      maxCount: 1,
    },
  ]),
  auth.verify,
  tokoController.editProfilToko
);

//Edit Sosial Media Toko
tokoRouter.patch(
  "/editSosialMedia/:id",
  auth.verify,
  tokoController.editSosmedToko
);

//Edit Promo toko
tokoRouter.patch(
  "/editPromo/:id",
  auth.verify,
  tokoController.editPromoToko
);

//Edit Alamat Toko
tokoRouter.patch("/editAlamat/:id", auth.verify, tokoController.editAlamatToko);

//Edit Administrator Toko
tokoRouter.patch(
  "/editAdministrasi/:id",
  auth.verify,
  tokoController.editAdministrasiToko
);

//Edit Legalitas Toko
tokoRouter.patch(
  "/editLegalitas/:id",
  upload.single("foto_dokumen"),
  auth.verify,
  tokoController.editLegalitasToko
);

//Edit Pelatihan Toko
tokoRouter.patch(
  "/editPelatihan/:id",
  auth.verify,
  tokoController.editPelatihanToko
);

module.exports = tokoRouter;
