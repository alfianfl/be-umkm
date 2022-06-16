const jwt = require("jsonwebtoken");
const UserUMKM = require("../models/UserUMKM");
var CryptoJS = require("crypto-js");

exports.register = async (req, res) => {
  const cekemail = await UserUMKM.findOne({ email: req.body.email });
  if (!cekemail) {
    let newUser = new UserUMKM({
      username: req.body.username,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      nama_lengkap: req.body.nama_lengkap,
      nik: req.body.nik,
      no_telp: req.body.no_telp,
      email: req.body.email,
      alamat: req.body.alamat,
      tanggal_lahir: req.body.tanggal_lahir,
    });

    try {
      const savedUser = await newUser.save();
      // const user = await User.findOne({ username: newUser.username });

      res.status(200).json({ message: "Akun berhasil dibuat" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(200).json({
      message: "Email telah digunakan",
    });
  }
};

exports.login = async (req, res) => {
  const user = await UserUMKM.findOne({ email: req.body.email });

  if (user) {
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword === req.body.password) {
      try {
        const accessToken = jwt.sign(
          { email: user.email, id: user._id, name: user.nama_lengkap },
          process.env.SECRET_KEY,
          { expiresIn: "2h" }
        );

        res.cookie("token", accessToken, {
          httpOnly: true,
          // secure: true,
          // sameSite: "none",
        });

        res.status(200).json({
          accessToken,
          id:user._id,
          status: "success",
          message: "Anda berhasil login",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.json({ status: "error", message: "Password anda salah" });
    }
  } else {
    return res.json({ status: "error", message: "Data anda tidak ada" });
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({
    success: true,
    message: "Logout Success",
  });
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await UserUMKM.find();
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserUMKM.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
};

exports.editPassword = async (req, res) => {
  let dataID = req.params.id;

  const user = await UserUMKM.findById(req.params.id);

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.SECRET_KEY
  );
  const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  const password_confirm =  req.body.password
;

  if ( OriginalPassword === password_confirm) {
    const password = CryptoJS.AES.encrypt(
      req.body.password_baru,
      process.env.SECRET_KEY
    ).toString();
    let dataUpdate = {
      password: password,
    };

    try {
      await UserUMKM.findByIdAndUpdate(dataID, {
        $set: dataUpdate,
      });
      res.status(200).json({ message: "Berhasil merubah password" });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  } else {
    res.status(200).json({ message: "Password tidak sama" });
  }
};

exports.editProfile = async (req, res) => {
  let dataID = req.params.id;
  let dataUpdate = {
    nama_lengkap: req.body.nama_lengkap,
    nik: req.body.nik,
    no_telp: req.body.no_telp,
    email: req.body.email,
    alamat: req.body.alamat,
    tanggal_lahir: req.body.tanggal_lahir,
    jenis_kelamin: req.body.jenis_kelamin,
  };

  try {
    await UserUMKM.findByIdAndUpdate(dataID, {
      $set: dataUpdate,
    });
    res.status(200).json({ message: "Berhasil menrubah data" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
