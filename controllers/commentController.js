const Comment = require("../models/KomentarForum");

const index = async (req, res) => {
  Comment.find()
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

const addComment = async (req, res) => {
  let dataID = req.params.id;
  user = req.decoded;

  let dataComment = new Comment({
    komentar: req.body.komentar,
    id_forum: dataID,
    nama_user: user.name,
  });

  try {
    const response = await dataComment.save();
    return res
      .status(200)
      .json({ message: "Berhasil menambahkan komentar", response });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const getCommentByForum = async (req, res) => {
  let dataID = req.params.id;

  try {
    const response = await Comment.find({ id_forum: dataID }).sort({
      createdAt: -1,
    });

    res.status(200).json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports = {
  index,
  addComment,
  getCommentByForum,
};
