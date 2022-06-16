const Forum = require("../models/Forum");
const userRouter = require("../routes/API/UserRoutes");

const index = async (req, res) => {
  Forum.find()
    .sort({ createdAt: -1 })
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

const addForum = async (req, res) => {
  user = req.decoded;

  let dataForum = new Forum({
    judul_forum: req.body.judul_forum,
    isi_forum: req.body.isi_forum,
    nama_user: user.name,
  });

  try {
    const response = await dataForum.save();
    return res
      .status(200)
      .json({ message: "Berhasil membuat forum", response });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const getDetailForum = async (req, res) => {
  let dataID = req.params.id;

  try {
    const response = await Forum.findById(dataID);

    res.status(200).json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports = {
  index,
  addForum,
  getDetailForum,
};
