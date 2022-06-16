const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const cookies = req.cookies.token;

  jwt.verify(cookies, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: "Token not valid",
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

module.exports = {
  verify,
};
