const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model.js");
const {
  isLoggedIn,
  updateLocals,
  isAdmin,
} = require("../middlewares/auth.middlewares.js");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get("/", updateLocals, async (req, res, next) => {
  try {
    const allVideogames = await Product.find().select({ title: 1 });
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

const adminRouter = require("./admin.routes.js");
router.use("/admin", adminRouter);

module.exports = router;
