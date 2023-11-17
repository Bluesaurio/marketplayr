const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model.js");

router.get("/", async (req, res, next) => {
  try {
    const allVideogames = await Product.find()
      .select({
        title: 1,
        productPic: 1,
        seller: 1,
        onSale: 1,
      })
      .populate("seller");
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

const adminRouter = require("./admin.routes.js");
router.use("/admin", adminRouter);

const orderRouter = require("./order.routes.js");
router.use("/order", orderRouter);

const platformRouter = require("./platform.routes.js");
router.use("/platform", platformRouter);

const searchRouter = require("./search.routes.js");
router.use("/search", searchRouter);

module.exports = router;
