const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model.js");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get("/", async (req, res, next) => {
  try {
    const allVideogames = await Product.find()
      .select({ title: 1 })
      .populate("seller");
    console.log("Qué es esto:", allVideogames);
    res.render("index", {
      allVideogames,
    });
  } catch (error) {
    next(error);
  }
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const profileRouter = require("./profile.routes.js");
router.use("/profile", profileRouter);

const productRouter = require("./product.routes.js");
router.use("/product", productRouter);

module.exports = router;
