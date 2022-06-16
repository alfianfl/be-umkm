const express = require("express");
const pelatihanRouter = express.Router();
const pelatihanController = require("../../controllers/pelatihanController");
const auth = require("../../services/auth");
const upload = require("../../services/multer");

//add Pelatihan
pelatihanRouter.post(
  "/addPelatihan",
  upload.single("gambar_pelatihan"),
  auth.verify,
  pelatihanController.addPelatihan
);

//get all pelatihan
pelatihanRouter.get("/", pelatihanController.index);

module.exports = pelatihanRouter;
