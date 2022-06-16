const express = require("express");
const apiRouter = express.Router();
const userRoutes = require("./API/UserRoutes");
const tokoRoutes = require("./API/TokoRoutes");
const produkRoutes = require("./API/ProdukRoutes");
const adminRoutes = require("./API/AdminRoutes");
const socialmediaRoutes = require("./API/SosmedRoutes");
const forumRoutes = require("./API/ForumRoutes");
const commentRoutes = require("./API/CommentRoutes");
const pelatihanRoutes = require("./API/PelatihanRoutes");
const promoRoutes = require("./API/PromoRoutes");

apiRouter.use("/user", userRoutes);
apiRouter.use("/toko", tokoRoutes);
apiRouter.use("/produk", produkRoutes);
apiRouter.use("/admin", adminRoutes);
apiRouter.use("/socialmedia", socialmediaRoutes);
apiRouter.use("/forum", forumRoutes);
apiRouter.use("/comment", commentRoutes);
apiRouter.use("/pelatihan", pelatihanRoutes);
apiRouter.use("/promo", promoRoutes);

module.exports = apiRouter;
