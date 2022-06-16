const express = require("express");
const produkRouter = express.Router();
const produkController = require("../../controllers/produkController");
const upload = require("../../services/multer");
const auth = require("../../services/auth");

//Get All Data Produk
produkRouter.get("/", produkController.index);

//Get Produk User
produkRouter.get("/user", auth.verify, produkController.getProdukUser);

//Get Detail Produk
produkRouter.get(
  "/detailProduk/:id",
  auth.verify,
  produkController.getDetailProduk
);

//Get Produk Toko
produkRouter.get("/toko/:id", auth.verify, produkController.getProdukToko);

//Add Data Produk
produkRouter.post(
  "/addProduk",
  upload.array("foto_produk"),
  auth.verify,
  produkController.addProduk
);

//Edit Data Produk
produkRouter.patch(
  "/editProduk/:id",
  upload.array("foto_produk"),
  auth.verify,
  produkController.editProduk
);

produkRouter.post(
  "/deleteProduk/:id",
  auth.verify,
  produkController.deleteProduk
);

//Filter Category
produkRouter.get("/category", produkController.filterCategory);

//Filter Search
produkRouter.get("/search", produkController.filterSearch);

module.exports = produkRouter;
