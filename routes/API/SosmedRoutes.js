const express = require("express");
const sosmedRouter = express.Router();
const sosmedController = require("../../controllers/sosmedController");
const upload = require("../../services/multer");
const auth = require("../../services/auth");

//Get All Data Produk
sosmedRouter.get("/", sosmedController.index);

module.exports = sosmedRouter;
