const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model.js");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");

// GET /admin para renderizar el perfil de admin

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find().select({ username: 1, _id: 1 });
    console.log();
    res.render("admin/admin.hbs", { allUsers });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// GET "/admin/:userId/details" renderizar detalles del usuario seleccionado en la lista

router.get("/:userId/details", isAdmin, async (req, res, next) => {
  try {
    const userDetails = await User.findById(req.params.userId);
    const gameList = await Product.find({ seller: req.params.userId });
    console.log(gameList);
    res.render("admin/user-details.hbs", { userDetails, gameList });
  } catch (error) {
    next(error);
  }
});

// POST "/admin/:productId/delete-product" borrar un producto de la lista y renderizar a la misma url del perfil de usuario

router.post("/:productId/delete-product", isAdmin, async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.productId);
    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
});
