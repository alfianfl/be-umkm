const express = require("express");
const adminRouter = express.Router();
const userController = require("../../controllers/userController");

adminRouter.get("/getuser", userController.getAllUser);

// userRouter.post("/logout", userController.logout);

//userRouter.get("/getuser", userController.getuser);

module.exports = adminRouter;
