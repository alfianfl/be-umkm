const express = require("express");
const forumRouter = express.Router();
const forumController = require("../../controllers/forumController");
const auth = require("../../services/auth");

//Get All Data Forum
forumRouter.get("/", forumController.index);

//Add Data Forum
forumRouter.post("/addForum", auth.verify, forumController.addForum);

//Get Detail Forum
forumRouter.get(
  "/detailForum/:id",
  auth.verify,
  forumController.getDetailForum
);

module.exports = forumRouter;
