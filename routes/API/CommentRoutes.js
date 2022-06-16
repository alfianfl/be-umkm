const express = require("express");
const commentRouter = express.Router();
const commentController = require("../../controllers/commentController");
const auth = require("../../services/auth");

//Get All Data Comment
commentRouter.get("/", commentController.index);

//Add Data Comment
commentRouter.post(
  "/addComment/:id",
  auth.verify,
  commentController.addComment
);

//Get Comment By Forum
commentRouter.get("/:id", auth.verify, commentController.getCommentByForum);

module.exports = commentRouter;
