const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema(
  {
    judul_forum: {
      type: String,
    },
    isi_forum: {
      type: String,
    },
    nama_user: {
      type: String,
    },
  },
  { timestamps: true }
);

const Forum = mongoose.model("Forum", forumSchema);
module.exports = Forum;
