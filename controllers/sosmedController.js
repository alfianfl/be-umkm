const SocialMedia = require("../models/SocialMedia");

const index = async (req, res) => {
  SocialMedia.find()
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

module.exports = {
  index,
};
