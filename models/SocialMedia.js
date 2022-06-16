const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema(
  {
    id_sosmed: {
      type: Number,
      unique: true,
    },
    platform_sosmed: {
      type: String,
    },
  },
  { timestamps: true }
);

const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
module.exports = SocialMedia;
