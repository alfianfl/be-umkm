const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(locaFilePath) {
  var mainFolderName = "main";
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;

  return cloudinary.uploader
    .upload(locaFilePath, {
      public_id: filePathOnCloudinary,
      folder: "gallery",
    })
    .then((result) => {
      return {
        message: "Success",
        url: result.secure_url,
      };
    })
    .catch((error) => {
      return { message: "Fail" };
    });
}

function deleteLocal() {
  const directory = "./uploads";

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}

module.exports = { uploadToCloudinary, deleteLocal };
