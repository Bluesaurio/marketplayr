const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model.js");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");

const uploader = require("../middlewares/cloudinary.middleware");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get("/", async (req, res, next) => {
  try {
    const allVideogames = await Product.find()
      .select({
        title: 1,
        productPic: 1,
        seller: 1,
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

module.exports = router;
