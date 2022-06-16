const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    komentar: {
      type: String,
    },
    id_forum: {
      type: String,
    },
    nama_user: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
