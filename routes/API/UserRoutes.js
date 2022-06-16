const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/userController");
const produkController = require("../../controllers/produkController");
const auth = require("../../services/auth");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);

//Get Toko By User
userRouter.get("/listtoko", auth.verify, produkController.getTokoUser);

//Get User By Id
userRouter.get("/profile/:id", auth.verify, userController.getUserById);

//Edit Profile User
userRouter.patch("/editprofile/:id", auth.verify, userController.editProfile);

//Edit Password
userRouter.patch("/editpassword/:id", auth.verify, userController.editPassword);

//userRouter.get("/getuser", userController.getuser);

module.exports = userRouter;
