const express = require("express");
const promoRouter = express.Router();
const promoController = require("../../controllers/promoController");
const auth = require("../../services/auth");

//Get All Promo
promoRouter.get("/", promoController.index);

//Add Promo Toko
promoRouter.post("/addPromo/:id", auth.verify, promoController.addPromo);

//Delete Promo
promoRouter.post("/deletePromo/:id", auth.verify, promoController.deletePromo);

//Get Promo By Toko
promoRouter.get("/:id", auth.verify, promoController.getPromoByToko);

module.exports = promoRouter;
