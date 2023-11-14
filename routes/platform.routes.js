const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model.js");
const Product = require("../models/Product.model.js");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");

router.get("/nintendo-switch", async (req, res, next) => {
  try {
    const platformGames = await Product.find({ platform: "Nintendo Switch" });
    res.render("platforms/nintendoSwitch.hbs", { platformGames });
  } catch (error) {
    next(error);
  }
});

router.get("/playstation-5", async (req, res, next) => {
  try {
    const platformGames = await Product.find({ platform: "Playstation 5" });
    res.render("platforms/playstation5.hbs", { platformGames });
  } catch (error) {
    next(error);
  }
});

router.get("/playstation-4", async (req, res, next) => {
  try {
    const platformGames = await Product.find({ platform: "Playstation 4" });
    res.render("platforms/playstation4.hbs", { platformGames });
  } catch (error) {
    next(error);
  }
});

router.get("/xbox-series-x", async (req, res, next) => {
  try {
    const platformGames = await Product.find({ platform: "Xbox Series X" });
    res.render("platforms/xboxSeriesX.hbs", { platformGames });
  } catch (error) {
    next(error);
  }
});

router.get("/xbox-one", async (req, res, next) => {
  try {
    const platformGames = await Product.find({ platform: "Xbox One" });
    res.render("platforms/xboxOne.hbs", { platformGames });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
