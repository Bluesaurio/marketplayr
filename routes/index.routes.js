const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const profileRouter = require("./profile.routes.js");
router.use("/profile", profileRouter);

const productRouter = require("./product.routes.js");
router.use("/product", productRouter);

module.exports = router;
